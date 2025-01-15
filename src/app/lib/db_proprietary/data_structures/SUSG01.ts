import mysql from 'mysql2/promise';

export interface SUSG01ProjectData {
    project_id: number;
    itch_href: string;
    video_ref: string;
    poster_ref: string;
    moodboard_ref: string;
    asset_refs: string[];
}

export function SUSG01ProjectDataRequester(project_id: number, conn: mysql.Connection): SUSG01ProjectData {
    
}