import mysql from "mysql2/promise";

import { SQL_EXCEPTIONS } from "@/app/lib/Errors";

import { DatabasePVImpl } from "@/app/lib/database/db_impl/PVImpl";
import { DatabaseGYImpl } from "@/app/lib/database/db_impl/GYImpl";
import { DatabaseAuthImpl } from "@/app/lib/database/db_impl/AuthImpl";

export class Database {
  private connection: mysql.Connection | undefined;
  
  public pv: DatabasePVImpl;
  public gy: DatabaseGYImpl;
  public auth: DatabaseAuthImpl;

  public constructor() {
    this.connection = undefined;

    this.pv = new DatabasePVImpl(this);
    this.gy = new DatabaseGYImpl(this);
    this.auth = new DatabaseAuthImpl(this);
  }

  public async Connect(): Promise<void> {
    if (this.connection)
      throw SQL_EXCEPTIONS.already_connected;

    this.connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DB_NAME,
      password: process.env.MYSQL_PASSWORD
    });

    return this.connection.connect();
  }

  public Disconnect() {
    if (!this.connection)
      throw SQL_EXCEPTIONS.not_connected;

    this.connection.destroy();
    this.connection = undefined;
  }

  public IsConnected(): boolean {
    return this.connection != undefined;
  }

  public GetConnection(): mysql.Connection {
    if (!this.connection)
      throw SQL_EXCEPTIONS.not_connected;
    return this.connection;
  }
}