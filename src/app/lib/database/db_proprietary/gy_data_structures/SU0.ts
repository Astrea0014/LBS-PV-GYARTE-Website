import mysql from 'mysql2/promise';
import { RESULT_EXCEPTIONS } from "@/app/lib/Errors";

export interface SU0ComponentData {
  id: number;
  video_ref: string;
}

export async function SU0ComponentDataRequester(id: number, connection: mysql.Connection): Promise<SU0ComponentData> {
  const [rows] = await connection.execute<mysql.RowDataPacket[]>(
    "SELECT video_ref FROM esv_component_data WHERE id=?",
    id
  );

  if (rows.length == 0)
    throw RESULT_EXCEPTIONS.result_empty;

  return {
    id: id,
    video_ref: rows[0].video_ref
  };
}