import mysql from "mysql2/promise";
import { errors } from "./Errors";
import { Collaboration, FullCollaboration, GroupMember, ProjectGroup, Thesis } from "./DbTypes";

export class Database {
  private connection: mysql.Connection | undefined;
  
  private pvDataRequesters: Map<string, (id: number, connection: mysql.Connection) => Promise<any>>;
  private gyDataRequesters: Map<string, (id: number, connection: mysql.Connection) => Promise<any>>;
  
  private async GetPresentYears(query: string) {
    if (!this.connection)
      throw new Error(errors.not_connected);

    const [years] = await this.connection.execute<mysql.RowDataPacket[]>(query);

    return years.map((value) => value.year as number);
  }

  private async PVGetCollaborationsFromQueryString(query: string, data: number): Promise<Collaboration[]> {
    if (!this.connection)
      throw new Error(errors.not_connected);
  
    const [collaborations] = await this.connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM collaborations WHERE " + query + "=?",
      data
      );
  
    const ret: Collaboration[] = [];
  
    for (let i = 0; i < collaborations.length; i++) {
      const [collaborators] = await this.connection.query<mysql.RowDataPacket[]>(
        "SELECT collaborator FROM collaborators WHERE collaboration_id=?",
        collaborations[i].collaboration_id
        );
  
        ret.push({
          collaboration_id: collaborations[i].collaboration_id,
          year: collaborations[i].year,
          theme: collaborations[i].theme,
          description: collaborations[i].description,
          poster_ref: collaborations[i].poster_ref,
          collaborators: collaborators.map((value) => value.collaborator as string)
        });
    }
  
    return ret;
  }

  private async PVGetGroupMembersFromProjectId(project_id: number): Promise<GroupMember[]> {
    if (!this.connection)
      throw new Error(errors.not_connected);

    const [group_members] = await this.connection.execute<mysql.RowDataPacket[]>(
      "SELECT name, class FROM project_groups_people INNER JOIN people ON project_groups_people.person_id=people.person_id WHERE project_id=?",
      project_id
    );

    return group_members.map((value): GroupMember => {
      return {
        name: value.name,
        class: value.class
      }
    });
  }

  public constructor() {
    this.connection = undefined;
    this.pvDataRequesters = new Map();
    this.gyDataRequesters = new Map();
  }

  public async Connect(): Promise<void> {
    if (this.connection)
      throw new Error(errors.already_connected);

    this.connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DB_NAME,
      password: process.env.MYSQL_PASSWORD
    });

    return this.connection.connect();
  }

  public Disconnect() {
    if (!this.connection)
      throw new Error(errors.not_connected);

    this.connection.destroy();
    this.connection = undefined;
  }

  public IsConnected(): boolean {
    return this.connection != undefined;
  }

  public GetConnection(): mysql.Connection {
    if (!this.connection)
      throw new Error(errors.not_connected);
    return this.connection;
  }

  public PVSetDataRequester(layout_reference: string, callback: (id: number, connection: mysql.Connection) => Promise<any>) {
    if (!this.pvDataRequesters.has(layout_reference))
      this.pvDataRequesters.set(layout_reference, callback);
  }

  public async PVGetPresentYears(): Promise<number[]> {
    return this.GetPresentYears("SELECT year FROM collaborations GROUP BY year")
  }

  public async PVGetCollaborationsFromYear(year: number): Promise<Collaboration[]> {
    return this.PVGetCollaborationsFromQueryString(
      "year",
      year
    );
  }

  public async PVGetCollaborationFromId(collaboration_id: number): Promise<FullCollaboration> {
    const collaborations = await this.PVGetCollaborationsFromQueryString(
      "collaboration_id",
      collaboration_id
    );

    if (collaborations.length == 0)
      throw new Error(errors.result_empty);

    return {
      ...collaborations[0],
      project_groups: await this.connection!.execute<mysql.RowDataPacket[]>(
        "SELECT * FROM project_groups WHERE collaboration_id=?",
        collaboration_id
      ).then(async ([result]): Promise<ProjectGroup[]> => {
        const ret: ProjectGroup[] = [];
        
        for (let i = 0; i < result.length; i++) {
          ret.push({
            project_id: result[i].project_id,
            project_name: result[i].project_name,
            group_name: result[i].group_name,
            poster_ref: result[i].poster_ref,
            description: result[i].description,
            project_type: result[i].project_type,
            project_data: null,
            group_members: await this.PVGetGroupMembersFromProjectId(result[i].project_id)
          });
        }

        return ret;
      })
    };
  }

  public async PVGetProjectFromId(project_id: number): Promise<ProjectGroup> {
    if (!this.connection)
      throw new Error(errors.not_connected);

    const [projects] = await this.connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM project_groups WHERE project_id=?",
      project_id
    );

    if (projects.length == 0)
      throw new Error(errors.result_empty);

    const ret: ProjectGroup = {
      project_id: projects[0].project_id,
      project_name: projects[0].project_name,
      group_name: projects[0].group_name,
      poster_ref: projects[0].poster_ref,
      description: projects[0].description,
      project_type: projects[0].project_type,
      project_data: null,
      group_members: await this.PVGetGroupMembersFromProjectId(projects[0][0].project_id)
    };

    if (!this.pvDataRequesters.has(ret.project_type))
      throw new Error(errors.data_requester_not_exists(ret.project_type));
    ret.project_data = (this.pvDataRequesters.get(ret.project_type)!)(ret.project_id, this.connection);

    return ret;
  }

  public GYSetDataRequester(layout_reference: string, callback: (id: number, connection: mysql.Connection) => Promise<any>) {
    if (!this.gyDataRequesters.has(layout_reference))
      this.gyDataRequesters.set(layout_reference, callback);
  }

  public async GYGetPresentYears(): Promise<number[]> {
    return this.GetPresentYears("SELECT publication_year FROM theses GROUP BY publication_year");
  }

  public async GYGetThesesByYearAndCourse(year: number, course: string): Promise<Thesis[]> {
    if (!this.connection)
      throw new Error(errors.not_connected);
    
    const [theses] = await this.connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM theses WHERE year=? AND course=?",
      [year, course]
    );

    return theses.map((value): Thesis => {
      return {
        id: value.id,
        thesis: value.thesis,
        course: value.course,
        author_name: value.author_name,
        author_class: value.author_class,
        publication_year: value.publication_year,
        component_id: value.component_id,
        component_data: null
      };
    });
  }

  public async GYGetThesisById(id: number): Promise<Thesis> {
    if (!this.connection)
      throw new Error(errors.not_connected);

    const [rows] = await this.connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM theses WHERE id=?",
      id
    );

    if (rows.length == 0)
      throw new Error(errors.result_empty);

    const raw = rows[0];

    const thesis: Thesis = {
      id: raw.id,
      thesis: raw.thesis,
      course: raw.course,
      author_name: raw.author_name,
      author_class: raw.author_class,
      publication_year: raw.publication_year,
      component_id: raw.component_id,
      component_data: null
    };

    if (!this.gyDataRequesters.has(thesis.component_id))
      throw new Error(errors.data_requester_not_exists(thesis.component_id));

    thesis.component_data = await (this.gyDataRequesters.get(thesis.component_id)!)(thesis.id, this.connection);

    return thesis;
  }
}