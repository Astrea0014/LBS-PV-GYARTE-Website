import mysql from "mysql2/promise";

import { SQL_EXCEPTIONS, RESULT_EXCEPTIONS, SqlException, ResultException } from "@/app/lib/Errors";

import { Database } from "@/app/lib/database/Database";
import { Entity, Access } from "@/app/lib/Types";

export class DatabaseAuthImpl {
  private master: Database;

  constructor(master: Database) {
    this.master = master;
  }

  public async IsUsernamePresent(username: string): Promise<boolean> {
    try {
      const [rows] = await this.master.GetConnection().execute<mysql.RowDataPacket[]>(
        "SELECT entity_id FROM entity WHERE username=?",
        [username]
      );

      return rows.length !== 0;
    }
    catch (e: any) {
      if ("message" in e)
        throw new SqlException(e.message);
      else
        throw new SqlException("Unknown error occured.");
    }
  }

  public async InsertEntity(username: string, password: string) {
    try {
      await this.master.GetConnection().execute(
        "INSERT INTO entity (username, password) VALUES (?, ?)",
        [username, password]
      );
    }
    catch (e: any) {
      if ("message" in e)
        throw new SqlException(e.message);
      else
        throw new SqlException("Unknown error occured.");
    }
  }

  public async RemovePartialEntityOnFailureByUsername(username: string) {
    try {
      await this.master.GetConnection().execute(
        "DELETE FROM entity WHERE username=?",
        [username]
      );
    }
    catch (e: any) {
      if ("message" in e)
        throw new SqlException(e.message);
      else
        throw new SqlException("Unknown error occured.");
    }
  }

  public async GetEntityByUsername(username: string): Promise<Entity> {
    try {
      const [rows] = await this.master.GetConnection().execute<mysql.RowDataPacket[]>(
        "SELECT * FROM entity WHERE username=?",
        [username]
      );

      if (rows.length === 0)
        throw RESULT_EXCEPTIONS.result_empty;

      return {
        entity_id: rows[0].entity_id,
        username: rows[0].username,
        password: rows[0].password
      };
    }
    catch (e: any) {
      if (e instanceof ResultException)
        throw e;

      if ("message" in e)
        throw new SqlException(e.message);
      else
        throw new SqlException("Unknown error occured.");
    }
  }

  public async UpdatePasswordForEntity(entity_id: number, password: string) {
    try {
      await this.master.GetConnection().execute(
        "UPDATE entity SET password=? WHERE entity_id=?",
        [password, entity_id]
      );
    }
    catch (e: any) {
      if ("message" in e)
        throw new SqlException(e.message);
      else
        throw new SqlException("Unknown error occured.");
    }
  }

  public async GetEntityAccessById(entity_id: number): Promise<Access[]> {
    try {
      const [rows] = await this.master.GetConnection().execute<mysql.RowDataPacket[]>(
        "SELECT access.access_id, description FROM entity_access INNER JOIN access ON entity_access.access_id=access.access_id WHERE entity_id=?",
        [entity_id]
      );

      return rows.map((value): Access => {
        return {
          access_id: value.access_id,
          description: value.description
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

  public async AppendEntityAccessByIds(entity_id: number, access_ids: string[]) {
    const values = access_ids.flatMap(access_id => [entity_id, access_id]);
    
    try {
      await this.master.GetConnection().execute(
        "INSERT INTO entity_access VALUES " + access_ids.map(() => "(?, ?)").join(", "),
        values
      );
    }
    catch (e: any) {
      if ("message" in e)
        throw new SqlException(e.message);
      else
        throw new SqlException("Unknown error occured.");
    }
  }

  public async RemoveEntityAccessByIds(entity_id: number, access_ids: string[]) {
    const placeholders = access_ids.map(_ => "?").join(", ");

    try {
      await this.master.GetConnection().execute(
        "DELETE FROM entity_access WHERE entity_id=? AND access_id IN (" + placeholders + ")",
        [entity_id, ...access_ids]
      );
    }
    catch (e: any) {
      if ("message" in e)
        throw new SqlException(e.message);
      else
        throw new SqlException("Unknown error occured.");
    }
  }
}