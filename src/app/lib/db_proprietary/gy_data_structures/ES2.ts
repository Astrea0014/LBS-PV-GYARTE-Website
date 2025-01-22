import mysql from 'mysql2/promise';
import { Image } from './Image';
import { errors } from '../../Errors';

export interface ES2ComponentData {
  id: number;
  video_ref: string;
  images: Image[];
}

export async function ES2ComponentDataRequester(id: number, conn: mysql.Connection): Promise<ES2ComponentData> {
  return await conn.query<mysql.RowDataPacket[]>(
    mysql.format(
      `
      SELECT video_ref
      FROM esv_component_data
      WHERE id=?
      `, id
    )).then(async (result): Promise<ES2ComponentData> => {
      if (!result)
        throw new Error(errors.result_null);
      if (result[0].length != 1)
        throw new Error(errors.result_empty);

      return {
        id: id,
        video_ref: result[0][0].video_ref,
        images: await conn.query<mysql.RowDataPacket[]>(
          `
          SELECT image_header, image_ref, image_format
          FROM esx_component_data
          WHERE id=?
          `
        ).then(async (result): Promise<Image[]> => {
          if (!result)
            throw new Error(errors.result_null);

          return result[0].map((value: mysql.RowDataPacket): Image => {
            return {
              image_header: value.image_header,
              image_ref: value.image_ref,
              image_format: value.image_format
            };
          });
        })
      }
    })!;
}