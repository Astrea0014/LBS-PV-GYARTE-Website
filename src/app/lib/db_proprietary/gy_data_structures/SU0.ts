import mysql from 'mysql2/promise';

export interface SU0ComponentData {
  id: number;
  video_ref: string;
}

export async function SU0ComponentDataRequester(id: number, conn: mysql.Connection): Promise<SU0ComponentData> {
  return await conn.query<mysql.RowDataPacket[]>(
    mysql.format(
      `
      SELECT video_ref
      FROM esv_component_data
      WHERE id=?
      `, id
    )).then(async (result): Promise<SU0ComponentData> => {
      if (!result)
        throw new Error('');
      if (result[0].length != 1)
        throw new Error('');

      return {
        id: id,
        video_ref: result[0][0].video_ref
      };
    })!;
}