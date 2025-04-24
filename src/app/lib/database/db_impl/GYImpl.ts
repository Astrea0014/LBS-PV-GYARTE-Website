import mysql from "mysql2/promise";

import { SQL_EXCEPTIONS, RESULT_EXCEPTIONS, SqlException, ResultException } from "@/app/lib/Errors";

import { Database } from "@/app/lib/database/Database";
import { Thesis } from "@/app/lib/Types";

export class DatabaseGYImpl {
  private master: Database;
  private dataRequesters: Map<string, (id: number, connection: mysql.Connection) => Promise<any>>;

  constructor(master: Database) {
    this.master = master;
    this.dataRequesters = new Map();
  }

  public SetDataRequester(layout_reference: string, callback: (id: number, connection: mysql.Connection) => Promise<any>) {
    if (!this.dataRequesters.has(layout_reference))
      this.dataRequesters.set(layout_reference, callback);
  }

  public async GetPresentYears() {
    try {
      const [years] = await this.master.GetConnection().execute<mysql.RowDataPacket[]>(
        "SELECT publication_year FROM theses GROUP BY publication_year"
      );

      return years.map((value) => value.year as number);
    }
    catch (e: any) {
      if ("message" in e)
        throw new SqlException(e.message);
      else
        throw new SqlException("Unknown error occured.");
    }
  }

  public async GetThesesByYearAndCourse(year: number, course: string): Promise<Thesis[]> {
    try {
      const [theses] = await this.master.GetConnection().execute<mysql.RowDataPacket[]>(
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
    catch (e: any) {
      if ("message" in e)
        throw new SqlException(e.message);
      else
        throw new SqlException("Unknown error occured.");
    }
  }

  public async GetThesisById(id: number): Promise<Thesis> {
    try {
      const [rows] = await this.master.GetConnection().execute<mysql.RowDataPacket[]>(
        "SELECT * FROM theses WHERE id=?",
        [id]
      );

      if (rows.length == 0)
        throw RESULT_EXCEPTIONS.result_empty;

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

      if (!this.dataRequesters.has(thesis.component_id))
        throw SQL_EXCEPTIONS.data_requester_not_exists(thesis.component_id);

      thesis.component_data = await (this.dataRequesters.get(thesis.component_id)!)(thesis.id, this.master.GetConnection());

      return thesis;
    }
    catch (e: any) {
      if (e instanceof ResultException)
        throw e;
      if (e instanceof SqlException)
        throw e;

      if ("message" in e)
        throw new SqlException(e.message);
      else
        throw new SqlException("Unknown error occured.");
    }
  }
}