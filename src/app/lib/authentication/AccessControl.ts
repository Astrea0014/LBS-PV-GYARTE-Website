import { Access } from "@/app/lib/Types";
import { AccessException, SqlException } from "@/app/lib/Errors";

import { InitDB } from "@/app/lib/database/Initialize";

/**
 * A container for entity access types.
 */
export class AccessControlList {
  entity_id: number;
  accesses: Access[];

  public constructor(entity_id: number, accesses: Access[]) {
    this.entity_id = entity_id;
    this.accesses = accesses;
  }

  /**
   * Checks if a specific access ID is present in the {@linkcode AccessControlList}.
   * @param access_id The ID of the access to check for.
   * @returns `true` if the access is present, otherwise `false`.
   */
  Has(access_id: string): boolean {
    for (let i = 0; i < this.accesses.length; i++)
      if (this.accesses[i].access_id === access_id)
        return true;
    return false;
  }
}

/**
 * Checks an {@linkcode AccessControlList} for a certain access type and throws if it is not present.
 * @param acl The entity's {@linkcode AccessControlList}.
 * @param access_id The ID of the access to check for.
 * @throws An {@linkcode AccessException} if the access type is not present.
 */
export function RequireAccess(acl: AccessControlList, access_id: string) {
  if (acl.Has("ADMIN_ALL_ACCESS"))
    return;
  if (acl.Has(access_id))
    return;
  throw new AccessException(access_id);
}

/**
 * Fetches the {@linkcode AccessControlList} for the specified entity.
 * @param entity_id The ID of the entity to fetch for.
 * @returns The {@linkcode AccessControlList} of the specified entity.
 * @throws An {@linkcode SqlException} if the database query failed.
 */
export async function GetEntityACL(entity_id: number): Promise<AccessControlList> {
  const db = await InitDB();
  return new AccessControlList(entity_id, await db.auth.GetEntityAccessById(entity_id));
}