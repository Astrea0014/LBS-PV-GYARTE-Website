import mysql from 'mysql2/promise';

import { Collaboration, FullCollaboration, GroupMember, ProjectGroup, Thesis } from './DbTypes';
import { errors } from './Errors';

export abstract class Db {
  protected dbConnection: mysql.Connection | undefined;
  private dbName: string;

  public constructor(dbName: string) {
    this.dbName = dbName;
  }

  public async Connect() {
    if (this.dbConnection)
      throw new Error(errors.already_connected);

    this.dbConnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      database: this.dbName,
      password: process.env.MYSQL_PASSWORD
    });

    await this.dbConnection.connect();
  }

  public Disconnect() {
    if (!this.dbConnection)
      throw new Error(errors.not_connected);

    this.dbConnection.destroy();
  }

  public abstract GetDbPresentYears(): Promise<number[]>;
}

// PV
export class CollaborationDb extends Db {
  private dataRequesters: Map<string, (project_id: number, conn: mysql.Connection) => Promise<any>>;

  public constructor() {
    super('program_weeks');
    this.dataRequesters = new Map();
  }

  public SetProjectTypeDataRequester(project_type: string, func: (project_id: number, conn: mysql.Connection) => NonNullable<any>) {
    if (!this.dataRequesters.has(project_type))
      this.dataRequesters.set(project_type, func);
  }

  public async GetDbPresentYears(): Promise<number[]> {
    return await this.dbConnection?.query<mysql.RowDataPacket[]>(
        `
        SELECT year
        FROM collaborations
        GROUP BY year
        `
      ).then((result) => {
        if (!result)
          throw new Error(errors.result_null);
        return result[0].map((value: mysql.RowDataPacket): number => value.year as number);
      })!;
  }

  private async _GetCollaborationsFromQueryString(query: string, data: number): Promise<Collaboration[]> {
    return await this.dbConnection?.query<mysql.RowDataPacket[]>(
      mysql.format(
        `
        SELECT *
        FROM collaborations
        WHERE ${query}=?
        `, data
      )
    ).then(async (result): Promise<Collaboration[]> => {
      if (!result)
        throw new Error(errors.result_null);

      const values = result[0];
      let collaborations: Collaboration[] = [];

      for (let i: number = 0; i < values.length; i++) {
        let collaborators_result = await this.dbConnection?.query<mysql.RowDataPacket[]>(
          mysql.format(
            `
            SELECT collaborator
            FROM collaborators
            WHERE collaboration_id=?
            `, values[i].collaboration_id
          )
        );

        if (!collaborators_result)
          throw new Error(errors.result_null);

        let collaboration: Collaboration = {
          collaboration_id: values[i].collaboration_id,
          year: values[i].year,
          theme: values[i].theme,
          description: values[i].description,
          poster_ref: values[i].poster_ref,
          collaborators: []
        };

        collaborators_result[0].forEach(value => collaboration.collaborators.push(value.collaborator as string));
        collaborations.push(collaboration);
      }

      return collaborations;
    })!;
  }

  public async GetCollaborationsFromYear(year: number): Promise<Collaboration[]> {
    return await this._GetCollaborationsFromQueryString('year', year);
  }

  public async GetCollaborationFromId(id: number): Promise<FullCollaboration> {
    let collaborations = await this._GetCollaborationsFromQueryString('collaboration_id', id);
    if (collaborations.length == 0)
      throw new Error('Fetching collaboration from id failed; collaboration with specified id does not exist.');

    return {                  // Whacky syntax, I know.
      ...collaborations[0],   // Expands so that all collaboration data fetched above is part of
                              // the derived interface type's data.
      project_groups: await this.dbConnection?.query<mysql.RowDataPacket[]>(
        mysql.format(
          `
          SELECT *
          FROM project_groups
          WHERE collaboration_id=?
          `, id
        )
      ).then(async (result) => {
        let project_groups: ProjectGroup[] = [];

        if (!result)
          throw new Error(errors.result_null);

        const values = result[0];

        for (let i: number = 0; i < values.length; i++) {
          if (!this.dataRequesters.has(values[i].project_type))
            throw new Error(errors.data_requester_not_exists(values[i].project_type));

          project_groups.push({
            project_id: values[i].project_id,
            project_name: values[i].project_name,
            group_name: values[i].group_name,
            poster_ref: values[i].poster_ref,
            project_type: values[i].project_type,
            project_data: await (this.dataRequesters.get(values[i].project_type)!)(values[i].project_id, this.dbConnection!),
            group_members: await this.dbConnection?.query<mysql.RowDataPacket[]>(
              mysql.format(
                `
                SELECT name, class
                FROM project_groups_people
                INNER JOIN people
                  ON project_groups_people.person_id=people.person_id
                WHERE project_id=?
                `, values[i].project_id
              )
            ).then(result => {
              if (!result)
                throw new Error(errors.result_null);

              return result[0].map((value): GroupMember => {
                return {
                  name: value.name,
                  class: value.class
                };
              });
            })!
          });
        }

        return project_groups;
      })!
    };
  }

  public async GetProjectFromId(id: number): Promise<ProjectGroup> {
    return await this.dbConnection?.query<mysql.RowDataPacket[]>(
      mysql.format(
        `
        SELECT *
        FROM project_groups
        WHERE project_id=?
        `, id
      )).then(async (result): Promise<ProjectGroup> => {
        if (!result)
          throw new Error(errors.result_null);
        if (result[0].length == 0)
          throw new Error(errors.result_empty);

        const value = result[0][0];
        return {
          project_id: value.project_id,
          project_name: value.project_name,
          group_name: value.group_name,
          poster_ref: value.poster_ref,
          project_type: value.project_type,
          project_data: await (this.dataRequesters.get(value.project_type)!)(value.project_id, this.dbConnection!),
          group_members: await this.dbConnection?.query<mysql.RowDataPacket[]>(
            mysql.format(
              `
              SELECT name, class
              FROM project_groups_people
              INNER JOIN people
                ON project_groups_people.person_id=people.person_id
              WHERE project_id=?
              `, value.project_id
            )).then(result => {
            if (!result)
              throw new Error(errors.result_null);

            return result[0].map((value): GroupMember => {
              return {
                name: value.name,
                class: value.class
              };
            });
          })!
        };
      })!;
  }
}

// GYARTE
export class ThesisDb extends Db {
  private dataRequesters: Map<string, (id: number, conn: mysql.Connection) => Promise<any>>;

  public constructor() {
    super('gymnasial_theses');
    this.dataRequesters = new Map();
  }

  public SetComponentDataRequester(component_id: string, func: (id: number, conn: mysql.Connection) => Promise<any>) {
    if (!this.dataRequesters.has(component_id))
      this.dataRequesters.set(component_id, func);
  }

  public async GetDbPresentYears(): Promise<number[]> {
    return await this.dbConnection?.query<mysql.RowDataPacket[]>(
        `
        SELECT publication_year
        FROM theses
        GROUP BY publication_year
        `
      ).then(async (result): Promise<number[]> => {
        if (!result)
          throw new Error(errors.result_null);
        return result[0].map((value: mysql.RowDataPacket): number => value.publication_year as number);
      })!;
  }

  public async GetThesesByYearAndCourse(year: number, course: string): Promise<Thesis[]> {
    return await this.dbConnection?.query<mysql.RowDataPacket[]>(
      mysql.format(
        `
        SELECT *
        FROM theses
        WHERE id=? AND course=?
        `, [year, course]
      )).then(async (result): Promise<Thesis[]> => {
        if (!result)
          throw new Error(errors.result_null);

        const values = result[0];
        let theses: Thesis[] = [];

        for (let i: number = 0; i < values.length; i++) {
          theses.push({
            id: values[i].id,
            thesis: values[i].thesis,
            course: values[i].course,
            author_name: values[i].author_name,
            author_class: values[i].author_class,
            publication_year: values[i].publication_year,
            component_id: values[i].component_id,
            component_data: null
          });
        }

        return theses;
      })!;
  }

  public async GetThesisById(id: number): Promise<Thesis> {
    return await this.dbConnection?.query<mysql.RowDataPacket[]>(
      mysql.format(
        `
        SELECT *
        FROM theses
        WHERE id=?
        `, id
      )).then(async (result): Promise<Thesis> => {
        if (!result)
          throw new Error(errors.result_null);

        const value = result[0][0];

        if (!this.dataRequesters.has(value.component_id))
          throw new Error(errors.data_requester_not_exists(value.component_id));

        return {
          id: value.id,
          thesis: value.thesis,
          course: value.course,
          author_name: value.author_name,
          author_class: value.author_class,
          publication_year: value.publication_year,
          component_id: value.component_id,
          component_data: await (this.dataRequesters.get(value.component_id)!)(value.id, this.dbConnection!)
        };
      })!;
  }
}