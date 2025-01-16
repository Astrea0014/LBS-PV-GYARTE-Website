import mysql from 'mysql2/promise';

export interface SUSG01ProjectData {
    project_id: number;
    itch_href: string;
    video_ref: string;
    poster_ref: string;
    moodboard_ref: string;
    asset_refs: string[];
}

export async function SUSG01ProjectDataRequester(project_id: number, conn: mysql.Connection): Promise<SUSG01ProjectData> {
    return await conn.execute<mysql.RowDataPacket[]>(
        'SELECT * FROM susg01_project_data WHERE project_id=?',
        project_id
    ).then(async (result): Promise<SUSG01ProjectData> => {
        if (!result)
            throw new Error('SUSG01 project data requester: failed to fetch data.');
        if (result[0].length != 1)
            throw new Error('SUSG01 project data requester: failed to obtain data. Invalid number of copies fetched.');

        const value = result[0][0];

        return {
            project_id: value.project_id,
            itch_href: value.itch_href,
            video_ref: value.video_ref,
            poster_ref: value.poster_ref,
            moodboard_ref: value.moodboard_ref,
            asset_refs: value.asset_refs
        };
    })!;
}