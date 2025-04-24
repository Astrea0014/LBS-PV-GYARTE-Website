import mysql from 'mysql2/promise';
import { Image } from './Image';
import { RESULT_EXCEPTIONS } from "@/app/lib/Errors";

export interface ES1ComponentData {
  id: number;
  images: Image[];
}

export async function ES1ComponentDataRequester(id: number, connection: mysql.Connection): Promise<ES1ComponentData> {
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT image_header, image_ref, image_format FROM esx_component_data WHERE id=?",
      [id]
    );

    if (rows.length == 0)
      throw RESULT_EXCEPTIONS.result_empty;

    return {
      id: id,
      images: rows.map((value): Image => {
        return {
          image_header: value.image_header,
          image_ref: value.image_ref,
          image_format: value.image_format
        };
      })
    };
}