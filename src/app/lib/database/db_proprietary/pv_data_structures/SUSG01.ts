import mysql from "mysql2/promise";
import { SQL_ERRORS } from "@/app/lib/Errors";

export interface SUSG01ProjectData {
  project_id: number;
  itch_href: string;
  video_ref: string;
  moodboard_ref: string;
  asset_refs: string[];
}

export async function SUSG01ProjectDataRequester(id: number, connection: mysql.Connection): Promise<SUSG01ProjectData> {
  const [projects] = await connection.execute<mysql.RowDataPacket[]>(
    "SELECT itch_href, video_ref, moodboard_ref FROM susg01_project_data WHERE project_id=?",
    id
  );

  if (projects.length == 0)
    throw new Error(SQL_ERRORS.result_empty);

  const project: SUSG01ProjectData = {
    project_id: id,
    itch_href: projects[0].itch_href,
    video_ref: projects[0].video_ref,
    moodboard_ref: projects[0].moodboard_ref,
    asset_refs: []
  };

  // ADD ASSET REFS QUERY HERE.

  return project;
}