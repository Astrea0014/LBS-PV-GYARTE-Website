import { ResponseEntity, Token } from "@/app/lib/Types";
import { ContentException } from "@/app/lib/Errors";
import { InitDB } from "@/app/lib/database/Initialize";

import { GetEntityACL, RequireAccess, AccessControlList } from "./AccessControl";
import { InsertEntity, UpdateEntityPassword } from "./Authentication";
import { GenerateRandomPassword } from "./PasswordGenerator";

export interface RegisterEntityActionArgs {
  username: string;
  password: string | undefined;
  access: string[];
}

export interface UpdateEntityActionArgs {
  username: string;
  modify: {
    generate_password: number | undefined;
    password: string | undefined;
    acl: {
      append: string[] | undefined;
      remove: string[] | undefined;
    } | undefined;
  }
}

export class AuthenticatedUser {
  public token: Token;
  public acl: AccessControlList;

  public constructor(token: Token, acl: AccessControlList) {
    this.token = token;
    this.acl = acl;
  }

  async RegisterEntity(args: RegisterEntityActionArgs): Promise<ResponseEntity> {
    RequireAccess(this.acl, "AUDIT_ENTITY_EXTENDED");

    if (args.access.length === 0)
      throw new ContentException("access specifies no values.");

    // 1. Check if username exists.

    const db = await InitDB();
    if (await db.auth.IsUsernamePresent(args.username))
      throw new ContentException("Entity with specified name already exists.");

    // 2. See if password is present or if it needs to be generated.

    let password: string;

    if (args.password)
      password = args.password;
    else
      password = await GenerateRandomPassword();

    // 3. Insert entity in database.

    await InsertEntity(args.username, password);

    // 4. Set access rights for entity.

    const entity = await db.auth.GetEntityByUsername(args.username);
    
    try {
      await db.auth.AppendEntityAccessByIds(entity.entity_id, args.access);
    }
    catch (e) {
      db.auth.RemovePartialEntityOnFailureByUsername(entity.username);
      throw e;
    }

    // 5. Return created entity.

    return {
      username: args.username,
      password: password,
      access: args.access
    };
  }

  async UpdateEntity(args: UpdateEntityActionArgs): Promise<ResponseEntity> {
    RequireAccess(this.acl, "AUDIT_ENTITY_EXTENDED");

    if (
      (!args.modify.acl ||
        (
          args.modify.acl &&
          !args.modify.acl.append &&
          !args.modify.acl.remove
        )) &&
      !args.modify.generate_password &&
      !args.modify.password
    ) throw new ContentException("modify and/or modify.acl are empty.");

    // 1. Get entity id.

    const db = await InitDB();

    const entity = await db.auth.GetEntityByUsername(args.username);

    // 2. If and how password should be updated.

    let password: string | null = null;

    if (args.modify.generate_password === 1) {
      password = await GenerateRandomPassword();
    }
    else if (args.modify.password) {
      password = args.modify.password;
    }

    if (args.modify.acl) {
      const acl = await GetEntityACL(entity.entity_id);

      // 3. Make sure access types to be added are not already present.
      if (args.modify.acl.append) {
        for (let i = 0; i < args.modify.acl.append.length; i++)
          if (acl.Has(args.modify.acl.append[i]))
            throw new ContentException("modify.acl.append specifies access IDs that are already present in the entity's ACL.");
      }

      // 4. Make sure access types to be removed are present.
      if (args.modify.acl.remove) {
        for (let i = 0; i < args.modify.acl.remove.length; i++)
          if (!acl.Has(args.modify.acl.remove[i]))
            throw new ContentException("modify.acl.remove specifies access IDs that are not present in the entity's ACL.")
      }
    }

    // 5. Change password (if applicable).

    if (password)
      UpdateEntityPassword(entity, password);

    if (args.modify.acl) {
      // 6. Append to ACL (if applicable).
      if (args.modify.acl.append)
        await db.auth.AppendEntityAccessByIds(entity.entity_id, args.modify.acl.append);
      
      // 7. Remove from ACL (if applicable).
      if (args.modify.acl.remove)
        await db.auth.RemoveEntityAccessByIds(entity.entity_id, args.modify.acl.remove);
    }

    // 8. Return updated entity.

    return {
      username: args.username,
      password: password,
      access: (await db.auth.GetEntityAccessById(entity.entity_id)).map(x => x.access_id)
    };
  }
}