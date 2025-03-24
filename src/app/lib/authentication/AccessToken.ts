import jwt from "jsonwebtoken";

import { Token } from "./Token";

const DELTA_TIMEOUT = 8 * 60 * 60 * 1000; // The timeout for an access token in milliseconds.

export class AccessToken implements Token {
  entity_id: number = 0;
  token: string = "";
  created_at: Date = new Date(0);

  static create_and_insert(entity_id: number): AccessToken {
    const ret = new AccessToken();
    ret.entity_id = entity_id;
    ret.created_at = new Date();
    ret.token = jwt.sign({ entity_id: ret.entity_id, created_at: ret.created_at }, process.env.AUTH_MASTER as string, { expiresIn: DELTA_TIMEOUT });

    
    return ret;
  }

  static import_jwt(token: string): AccessToken {

  }
}

export class AccessTokenChache {
  chache: AccessToken[];

  constructor() {
    this.chache = [];
  }

  get(token: string): AccessToken | undefined {
    return this.chache.find(value => value.token == token);
  }

  add(token: AccessToken): void {
    this.chache.push(token);
  }

  invalidate(token: AccessToken): void {
    const index = this.chache.findIndex(value => value.token == token.token);
    
    if (index == -1)
      return;

    this.chache.splice(index, 1);
  }

  clear(): void {
    this.chache = [];
  }

  clear_invalid(): void {
    const get_index = () => this.chache.findIndex(value => new Date().getTime() - value.created_at.getTime() > DELTA_TIMEOUT);

    let index = get_index(); // dt > timeout.

    while (index != -1) {
      this.chache.splice(index, 1);
      index = get_index();
    }
  }
}