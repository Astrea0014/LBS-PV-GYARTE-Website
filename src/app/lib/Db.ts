import mysql from 'mysql2/promise';

import { Collaboration, FullCollaboration, GroupMember, ProjectGroup } from './DbTypes';

export abstract class Db {
  protected dbConnection: mysql.Connection | undefined;
  private dbName: string;

  public constructor(dbName: string) {
    this.dbName = dbName;
  }

  public async Connect() {
    if (this.dbConnection)
      throw new Error('Cannot connect; already connected.');

    this.dbConnection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',               // ENV
      database: this.dbName,
      password: 'password'        // ENV
    });

    await this.dbConnection.connect();
  }

  public Disconnect() {
    if (!this.dbConnection)
      throw new Error('Cannot disconnect; already disconnected.');

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
    return await
      this.dbConnection?.query<mysql.RowDataPacket[]>(
        `
        SELECT year
        FROM collaborations
        GROUP BY year
        `
      ).then(([result, _]) => {
        if (!result)
          throw new Error('Failed to fetch years from collaborations database');

        return result.map((value: mysql.RowDataPacket) => value.year as number);
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
        throw new Error(`Failed to fetch collaborations where '${query}' had the value '${data}'.`);

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
          throw new Error(`Failed to fetch collaborators from collaboration id ${values[i].collaboration_id}`);

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
          throw new Error('Fetching project groups from collaboration id failed; no entries with matching id exists.');

        const values = result[0];

        for (let i: number = 0; i < values.length; i++) {
          if (!this.dataRequesters.has(values[i].project_type))
            throw new Error(`Data requester for type ${values[i].project_type} could not be found; no matching data requester registered.`);

          project_groups.push({
            project_id: values[i].project_id,
            group_name: values[i].group_name,
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
                throw new Error('Failed to fetch group members.');

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
    }
  }
}

// GYARTE
export class ThesisDb extends Db {
  public constructor() {
    super('gymnasial_theses');
  }

  public async GetDbPresentYears(): Promise<number[]> {
    let values = await this.dbConnection?.query<mysql.RowDataPacket[]>('SELECT publication_year FROM gymnasial_theses GROUP BY publication_year');
    if (values)
      return values[0].map((obj: mysql.RowDataPacket) => obj.year as number);
    throw new Error('Fetching years failed.');
  }
}