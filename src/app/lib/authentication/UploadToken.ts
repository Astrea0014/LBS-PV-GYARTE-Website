import { Token } from "./Token";

export class UploadToken implements Token {
  entity_id: number;
  token: string;
  created_at: Date;
  is_expended: boolean;
}