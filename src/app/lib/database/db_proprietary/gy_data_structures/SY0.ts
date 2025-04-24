import mysql from 'mysql2/promise';
import { RESULT_EXCEPTIONS } from "@/app/lib/Errors";

export interface SY0ComponentData {
  id: number;
  href: string;
}

export async function SY0ComponentDataRequester(id: number, connection: mysql.Connection): Promise<SY0ComponentData> {
  const [rows] = await connection.execute<mysql.RowDataPacket[]>(
    "SELECT href FROM sy0_component_data WHERE id=?",
    id
  );

  if (rows.length == 0)
    throw RESULT_EXCEPTIONS.result_empty;

  return {
    id: id,
    href: rows[0].href
  };
}