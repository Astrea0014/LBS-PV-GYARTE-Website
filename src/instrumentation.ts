import { CollaborationDb, ThesisDb } from './app/lib/Db';

import { SUSG01ProjectDataRequester } from './app/lib/db_proprietary/pv_data_structures/SUSG01';

export let PvDb: CollaborationDb;
export let GyDb: ThesisDb;

export function register() {
    PvDb = new CollaborationDb();
    PvDb.SetProjectTypeDataRequester("SUSG01", SUSG01ProjectDataRequester);

    GyDb = new ThesisDb();
}