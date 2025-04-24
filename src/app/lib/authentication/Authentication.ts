import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { Token, Entity } from "@/app/lib/Types";
import { AuthException } from "@/app/lib/Errors";

import { InitDB } from "@/app/lib/database/Initialize";

async function HashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

async function VerifyHashedPassword(password: string, hashed_password: string): Promise<boolean> {
  return bcrypt.compare(password, hashed_password);
}

/**
 * Authenticates an entity and creates an access token.
 * @param username The username of the entity.
 * @param password The password of the entity.
 * @returns A promise of a JSON-web-token used for subsequent API-requests.
 */
export async function AuthenticateEntity(username: string, password: string): Promise<string> {
  let entity_id = 0;

  const db = await InitDB();

  try {
    const entity = await db.auth.GetEntityByUsername(username);

    if (!await VerifyHashedPassword(password, entity.password))
      throw new AuthException("Invalid password.");

    entity_id = entity.entity_id;
  }
  catch (e) {
    if (e instanceof Error || e instanceof AuthException)
      throw e;
    throw new Error("Unknown error.");
  }

  return ExportJWT({
    entity_id: entity_id,
    token: null,
    created_at: new Date()
  });
}

/**
 * Authenticates an administrator and creates an access token.
 * @param master The administrator's master key.
 * @returns A promise of a JSON-web-token used for subsequent API-requests.
 * @throws An {@linkcode AuthException} when the key is invalid.
 */
export async function AuthenticateMaster(master: string): Promise<string> {
  if (master != process.env.AUTH_MASTER)
    throw new AuthException("Invalid master key.");

  if (!process.env.AUTH_MASTER_ENTITY_ID)
    throw new Error("AUTH_MASTER_ENTITY_ID is not declared or defined in .env.");

  return ExportJWT({
    entity_id: parseInt(process.env.AUTH_MASTER_ENTITY_ID!),
    token: null,
    created_at: new Date()
  });
}

export async function UpdateEntityPassword(entity: Entity, password: string) {
  const db = await InitDB();
  const hashed = await HashPassword(password);
  return db.auth.UpdatePasswordForEntity(entity.entity_id, hashed);
}

/**
 * Takes a JSON-web-token, makes sure it is valid, and returns the information it contains.
 * @param token The JWT to import.
 * @returns An initialized instance of the {@linkcode Token} interface.
 * @throws An {@linkcode AuthException} if the token is expired or invalid.
 * @throws An {@linkcode Error} if an unknown error occurs.
 */
export async function ImportJWT(token: string): Promise<Token> {
  try {
    const decoded: any = jwt.verify(token, process.env.AUTH_MASTER!);
    return {
      entity_id: decoded.entity_id,
      token: token,
      created_at: new Date(decoded.created_at)
    };
  }
  catch (e) {
    if (e instanceof jwt.TokenExpiredError)
      throw new AuthException("Token is expired.");
    if (e instanceof jwt.JsonWebTokenError)
      throw new AuthException("Token is invalid.");
    throw new Error("Unknown error.");
  }
}

export async function ExportJWT(token: Token): Promise<string> {
  return jwt.sign({
    entity_id: token.entity_id,
    created_at: token.created_at
  }, process.env.AUTH_MASTER!, { expiresIn: '8h' });
}