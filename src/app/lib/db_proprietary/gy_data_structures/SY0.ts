import mysql from 'mysql2/promise';
import { errors } from '../../Errors';

export interface SY0ComponentData {
  id: number;
  href: string;
}

export async function SY0ComponentDataRequester(id: number, conn: mysql.Connection): Promise<SY0ComponentData> {
  return await conn.query<mysql.RowDataPacket[]>(
    mysql.format(
      `
      SELECT href
      FROM sy0_component_data
      WHERE id=?
      `, id
    )).then(async (result): Promise<SY0ComponentData> => {
      if (!result)
        throw new Error(errors.result_null);
      if (result[0].length != 1)
        throw new Error(errors.result_empty);

      return {
        id: id,
        href: result[0][0].href
      };
    })!;
}