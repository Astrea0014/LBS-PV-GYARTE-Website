import { AccessToken } from "./AccessToken";
import { UploadToken } from "./UploadToken";

export class Entity {
  entity_id: number;
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.entity_id = -1;
  }

  async login(): Promise<void> {
    if (this.entity_id != -1)
      throw new Error("");

    // Get entity id from login information. Throw if invalid.
  }

  async create_access_token(): Promise<AccessToken> {
    if (this.entity_id == -1)
      throw new Error("");

    

    // Insert everything into database.

    return new AccessToken();
  }

  async create_upload_tokens(group_target: string, layout_target: string, quantity: number): Promise<UploadToken> {
    if (this.entity_id == -1)
      throw new Error("");

    // Create a number of upload targets for the target.
  }
}