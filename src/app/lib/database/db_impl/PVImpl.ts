import mysql from "mysql2/promise";

import { SQL_EXCEPTIONS, RESULT_EXCEPTIONS } from "@/app/lib/Errors";

import { Database } from "@/app/lib/database/Database";
import { Collaboration, FullCollaboration, ProjectGroup, GroupMember } from "@/app/lib/Types";

export class DatabasePVImpl {
  private master: Database;
  private dataRequesters: Map<string, (id: number, connection: mysql.Connection) => Promise<any>>;

  constructor(master: Database) {
    this.master = master;
    this.dataRequesters = new Map();
  }

  private async GetCollaborationsFromQueryString(query: string, data: number): Promise<Collaboration[]> {
    const [collaborations] = await this.master.GetConnection().execute<mysql.RowDataPacket[]>(
      "SELECT * FROM collaborations WHERE " + query + "=?",
      data
    );

    const ret: Collaboration[] = [];

    for (let i = 0; i < collaborations.length; i++) {
      const [collaborators] = await this.master.GetConnection().execute<mysql.RowDataPacket[]>(
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

  private async GetGroupMembersFromProjectId(project_id: number): Promise<GroupMember[]> {
    const [group_members] = await this.master.GetConnection().execute<mysql.RowDataPacket[]>(
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

  public SetDataRequester(layout_reference: string, callback: (id: number, connection: mysql.Connection) => Promise<any>) {
    if (!this.dataRequesters.has(layout_reference))
      this.dataRequesters.set(layout_reference, callback);
  }

  public async GetPresentYears() {
    const [years] = await this.master.GetConnection().execute<mysql.RowDataPacket[]>(
      "SELECT year FROM collaborations GROUP BY year"
    );

    return years.map((value) => value.year as number);
  }

  public async GetCollaborationsFromYear(year: number): Promise<Collaboration[]> {
    return this.GetCollaborationsFromQueryString(
      "year",
      year
    );
  }

  public async GetCollaborationFromId(collaboration_id: number): Promise<FullCollaboration> {
    const collaborations = await this.GetCollaborationsFromQueryString(
      "collaboration_id",
      collaboration_id
    );

    if (collaborations.length == 0)
      throw RESULT_EXCEPTIONS.result_empty;

    return {
      ...collaborations[0],
      project_groups: await this.master.GetConnection().execute<mysql.RowDataPacket[]>(
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
            group_members: await this.GetGroupMembersFromProjectId(result[i].project_id)
          });
        }

        return ret;
      })
    };
  }

  public async GetProjectFromId(project_id: number): Promise<ProjectGroup> {
    const [projects] = await this.master.GetConnection().execute<mysql.RowDataPacket[]>(
      "SELECT * FROM project_groups WHERE project_id=?",
      project_id
    );

    if (projects.length == 0)
      throw RESULT_EXCEPTIONS.result_empty;

    const ret: ProjectGroup = {
      project_id: projects[0].project_id,
      project_name: projects[0].project_name,
      group_name: projects[0].group_name,
      poster_ref: projects[0].poster_ref,
      description: projects[0].description,
      project_type: projects[0].project_type,
      project_data: null,
      group_members: await this.GetGroupMembersFromProjectId(projects[0].project_id)
    };

    if (!this.dataRequesters.has(ret.project_type))
      throw SQL_EXCEPTIONS.data_requester_not_exists(ret.project_type);
    ret.project_data = (this.dataRequesters.get(ret.project_type)!)(ret.project_id, this.master.GetConnection());

    return ret;
  }
}