import mysql from 'mysql2/promise';
import { Image } from './Image';
import { RESULT_EXCEPTIONS } from "@/app/lib/Errors";

export interface ES2ComponentData {
  id: number;
  video_ref: string;
  images: Image[];
}

export async function ES2ComponentDataRequester(id: number, connection: mysql.Connection): Promise<ES2ComponentData> {
  const [videos] = await connection.execute<mysql.RowDataPacket[]>(
    "SELECT video_ref FROM esv_component_data WHERE id=?",
    [id]
  );

  if (videos.length == 0)
    throw RESULT_EXCEPTIONS.result_empty;

  const data: ES2ComponentData = {
    id: id,
    video_ref: videos[0].video_ref,
    images: []
  };

  const [images] = await connection.execute<mysql.RowDataPacket[]>(
    "SELECT image_header, image_ref, image_format FROM esx_component_data WHERE id=?",
    id
  );

  data.images = images.map((value): Image => {
    return {
      image_header: value.image_header,
      image_ref: value.image_ref,
      image_format: value.image_format
    };
  });

  return data;
}