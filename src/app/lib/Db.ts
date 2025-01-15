import mysql from 'mysql2/promise';

import { Collaboration, FullCollaboration, GroupMember, ProjectGroup } from './DbTypes';

export abstract class Db {
    protected dbConnection: mysql.Connection | undefined;
    private dbName: string;

    public constructor(dbName: string) {
        this.dbName = dbName;
    }

    public async Connect() {
        if (this.dbConnection)
            throw new Error('Cannot connect; already connected.');

        this.dbConnection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',               // ENV
            database: this.dbName,
            password: 'password'        // ENV
        });

        await this.dbConnection.connect();
    }

    public Disconnect() {
        if (!this.dbConnection)
            throw new Error('Cannot disconnect; already disconnected.');

        this.dbConnection.destroy();
    }

    public abstract GetDbPresentYears(): Promise<number[]>;
}

// PV
export class CollaborationDb extends Db {
    private dataRequesters: Map<string, (project_id: number, conn: mysql.Connection) => NonNullable<any>>;

    public constructor() {
        super('program_weeks');
        this.dataRequesters = new Map();
    }

    public SetProjectTypeDataRequester(project_type: string, func: (project_id: number, conn: mysql.Connection) => NonNullable<any>) {
        if (!this.dataRequesters.has(project_type))
            this.dataRequesters.set(project_type, func);
    }

    public async GetDbPresentYears(): Promise<number[]> {
        return await
            this.dbConnection?.query<mysql.RowDataPacket[]>(
                'SELECT year FROM collaborations GROUP BY year'
            ).then(([result, _]) => {
                if (!result)
                    throw new Error('Failed to fetch years from collaborations database');

                return result.map((value: mysql.RowDataPacket) => value.year as number);
            })!;
    }

    private async _GetCollaborationsFromQueryString(query: string, data: any): Promise<Collaboration[]> {
        return await this.dbConnection?.execute<mysql.RowDataPacket[]>(
            `SELECT * FROM collaborations WHERE ${query}=?`,
            data
        ).then(async ([result, _]): Promise<Collaboration[]> => {
            if (!result)
                throw new Error(`Failed to fetch collaborators where '${query}' had the value '${data}'.`);

            let collaborations: Collaboration[] = [];

            for (let i: number = 0; i < 10; i++) {
                let collaborators_result = await this.dbConnection?.execute<mysql.RowDataPacket[]>(
                    'SELECT collaborator FROM collaborators WHERE collaboration_id=?',
                    result[i].collaboration_id
                );

                if (!collaborators_result)
                    throw new Error("FUCK YOU THIS FUCKIONG LANGUAGE IT IS SO FUCKING MISERABLE AND DOGHIT TO WORK WITH I WILL END MYSELF THE SECOND I GWET THE CHANCE TO SO THIS ERROR MESSAGE IS MY FUCKING SUICIDE NOTE, // DOUGLAS");

                let collaboration = {
                    collaboration_id: result[i].collaboration_id,
                    year: result[i].year,
                    description: result[i].description,
                    collaborators: [] as string[]
                };

                collaborators_result[0].forEach(value => collaboration.collaborators.push(value.collaborator as string));
                collaborations.push();
            }

            return collaborations;
        })!;
    }

    public async GetCollaborationsFromYear(year: number): Promise<Collaboration[]> {
        return await this._GetCollaborationsFromQueryString("year", year);
    }

    public async GetCollaborationFromId(id: number): Promise<FullCollaboration> {
        let collaboration: FullCollaboration = (await this._GetCollaborationsFromQueryString("collection_id", id))[0] as FullCollaboration;
        let project_groups = await this.dbConnection?.execute<mysql.RowDataPacket[]>("SELECT * FROM project_groups WHERE collection_id=?", id);

        if (project_groups) {
            collaboration.project_groups = project_groups[0].map((obj: mysql.RowDataPacket) => {
                return {
                    project_id: obj.project_id,

                } as ProjectGroup;
            });
        }

        return collaboration;
    }
}

// GYARTE
export class ThesisDb extends Db {
    public constructor() {
        super('gymnasial_theses');
    }

    public async GetDbPresentYears(): Promise<number[]> {
        let values = await this.dbConnection?.query<mysql.RowDataPacket[]>("SELECT publication_year FROM gymnasial_theses GROUP BY publication_year");
        if (values)
            return values[0].map((obj: mysql.RowDataPacket) => obj.year as number);
        throw new Error("Fetching years failed.");
    }
}