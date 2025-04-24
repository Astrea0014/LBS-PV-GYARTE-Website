import { Token } from "@/app/lib/Types";

export class UploadToken implements Token {
  entity_id: number;
  token: string;
  created_at: Date;
  is_expended: boolean;

  constructor() {
    this.entity_id = 0;
    this.token = "";
    this.created_at = new Date();
    this.is_expended = false;
  }
}