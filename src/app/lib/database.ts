import mysql from 'mysql2/promise';

enum ComponentId {
    SY0,
    SU0,
    ES1,
    ES2
}

interface GyEntry {
    id: number;
    theory: string;
    name: string | null;
    class: string;
    publicationYear: number;
    componentId: ComponentId;
}

class DbInterface {
    dbConnection: mysql.Connection | undefined;
    dbName: string;

    public constructor(dbName: string) {
        this.dbName = dbName;
    }

    public async connect(): Promise<void> {
        if (this.dbConnection)
            throw new Error('Cannot connect; already connected.');

        this.dbConnection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: this.dbName,
            password: 'password'
        });

        await this.dbConnection.connect();
    }

    public disconnect(): void {
        if (!this.dbConnection)
            throw new Error('Cannot disconnect; already disconnected.');

        this.dbConnection.destroy();
    }
}