import mysql from "mysql2/promise";

import { SQL_ERRORS } from "@/app/lib/Errors";
import { Thesis, Entity, Access } from "../Types";
import { DatabasePVImpl } from "@/app/lib/database/db_impl/PVImpl";

export class Database {
  private connection: mysql.Connection | undefined;
  
  private gyDataRequesters: Map<string, (id: number, connection: mysql.Connection) => Promise<any>>;
  
  public pv: DatabasePVImpl;

  private async GetPresentYears(query: string) {
    if (!this.connection)
      throw new Error(SQL_ERRORS.not_connected);

    const [years] = await this.connection.execute<mysql.RowDataPacket[]>(query);

    return years.map((value) => value.year as number);
  }

  public constructor() {
    this.connection = undefined;
    this.gyDataRequesters = new Map();

    this.pv = new DatabasePVImpl(this);
  }

  public async Connect(): Promise<void> {
    if (this.connection)
      throw new Error(SQL_ERRORS.already_connected);

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
      throw new Error(SQL_ERRORS.not_connected);

    this.connection.destroy();
    this.connection = undefined;
  }

  public IsConnected(): boolean {
    return this.connection != undefined;
  }

  public GetConnection(): mysql.Connection {
    if (!this.connection)
      throw new Error(SQL_ERRORS.not_connected);
    return this.connection;
  }

  public GYSetDataRequester(layout_reference: string, callback: (id: number, connection: mysql.Connection) => Promise<any>) {
    if (!this.gyDataRequesters.has(layout_reference))
      this.gyDataRequesters.set(layout_reference, callback);
  }

  public async GYGetPresentYears(): Promise<number[]> {
    return this.GetPresentYears("SELECT publication_year FROM theses GROUP BY publication_year");
  }

  public async GYGetThesesByYearAndCourse(year: number, course: string): Promise<Thesis[]> {
    if (!this.connection)
      throw new Error(SQL_ERRORS.not_connected);
    
    const [theses] = await this.connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM theses WHERE year=? AND course=?",
      [year, course]
    );

    return theses.map((value): Thesis => {
      return {
        id: value.id,
        thesis: value.thesis,
        course: value.course,
        author_name: value.author_name,
        author_class: value.author_class,
        publication_year: value.publication_year,
        component_id: value.component_id,
        component_data: null
      };
    });
  }

  public async GYGetThesisById(id: number): Promise<Thesis> {
    if (!this.connection)
      throw new Error(SQL_ERRORS.not_connected);

    const [rows] = await this.connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM theses WHERE id=?",
      id
    );

    if (rows.length == 0)
      throw new Error(SQL_ERRORS.result_empty);

    const raw = rows[0];

    const thesis: Thesis = {
      id: raw.id,
      thesis: raw.thesis,
      course: raw.course,
      author_name: raw.author_name,
      author_class: raw.author_class,
      publication_year: raw.publication_year,
      component_id: raw.component_id,
      component_data: null
    };

    if (!this.gyDataRequesters.has(thesis.component_id))
      throw new Error(SQL_ERRORS.data_requester_not_exists(thesis.component_id));

    thesis.component_data = await (this.gyDataRequesters.get(thesis.component_id)!)(thesis.id, this.connection);

    return thesis;
  }
}