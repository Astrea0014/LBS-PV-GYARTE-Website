import { CollaborationDb, ThesisDb } from './app/lib/Db';

import { SUSG01ProjectDataRequester } from './app/lib/db_proprietary/pv_data_structures/SUSG01';

declare global {
  var __PvDb: CollaborationDb;
}
global.__PvDb = new CollaborationDb();

export function register() {
  __PvDb.SetProjectTypeDataRequester("SUSG01", SUSG01ProjectDataRequester);
  __PvDb.Connect();

  console.log('i work nyaah >.<');
}