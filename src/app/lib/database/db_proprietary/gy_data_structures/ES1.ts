import mysql from 'mysql2/promise';
import { Image } from './Image';
import { errors } from '../../Errors';

export interface ES1ComponentData {
  id: number;
  images: Image[];
}

export async function ES1ComponentDataRequester(id: number, conn: mysql.Connection): Promise<ES1ComponentData> {
  return await conn.query<mysql.RowDataPacket[]>(
    mysql.format(
      `
      SELECT image_header, image_ref, image_format
      FROM esx_component_data
      WHERE id=?
      `, id
    )).then(async (result): Promise<ES1ComponentData> => {
      if (!result)
        throw new Error(errors.result_null);

      return {
        id: id,
        images: result[0].map((value: mysql.RowDataPacket): Image => {
          return {
            image_header: value.image_header,
            image_ref: value.image_ref,
            image_format: value.image_format
          };
        })
      };
    })!;
}