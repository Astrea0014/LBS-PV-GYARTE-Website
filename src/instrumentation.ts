import { CollaborationDb, ThesisDb } from './app/lib/Db';

// Project data requester imports go here...
import { SUSG01ProjectDataRequester } from './app/lib/db_proprietary/pv_data_structures/SUSG01';

// Component data requester imports go here...
import { SY0ComponentDataRequester } from './app/lib/db_proprietary/gy_data_structures/SY0';
import { SU0ComponentDataRequester } from './app/lib/db_proprietary/gy_data_structures/SU0';
import { ES1ComponentDataRequester } from './app/lib/db_proprietary/gy_data_structures/ES1';
import { ES2ComponentDataRequester } from './app/lib/db_proprietary/gy_data_structures/ES2';

function init_main_frame_hack(x: string): void {
  console.log(
    x
      .replaceAll('M', 'o')
      .replaceAll('I', 'i')
      .replaceAll('N', 'w')
      .replaceAll('Y', 'a')
      .replaceAll('K', 'r')
      .replaceAll('Z', '>')
      .replaceAll('A', 'k')
      .replaceAll('C', 'y')
      .replaceAll('U', 'h')
      .replaceAll('D', '.')
      .replaceAll('S', '<')
      .replaceAll('H', 'n')
      .replaceAll('X', ' ')
  );
}

declare global {
  var __PvDb: CollaborationDb;            // DO NOT CHANGE FROM VAR
  var __GyDb: ThesisDb;                   // If you do you are in for a world of pain
}                                         // as it breaks literally everything.
global.__PvDb = new CollaborationDb();    // Cannot be moved.
global.__GyDb = new ThesisDb();           // -----||-----

export function register() {
  // ------------------- Project type data requesters -------------------
  // A project type data requester is a function that requests data from a
  // database table that is proprietary to a specific website layout.
  //
  // This function is a callback function, meaning that the function
  // is registered in this 'register' function by calling
  // '__PvDb.SetProjectTypeDataRequester' and passing two parameters.
  //
  // -> The first parameter corresponds to the project type.
  //    A project type is a 6-8 character string identifying a specific
  //    component layout and corresponding proprietary database tables.
  //
  // -> The second parameter corresponds to the callback function.
  //
  // See further below for an example on how the
  // 'SetProjectTypeDataRequester' function is used.
  //
  // > An interface and callback async function are declared as follows:
  //                              <--------------------------------------
  // interface MyProjectData {    | This interface contains all of
  //   project_id: number,        | the data fields from the proprietary
  //   my_data_1: any             | database tables, and the corresponding
  // }                            | project's identifier.
  //                              <--------------------------------------
  //                              | The project id is then used to query
  //                              | the proprietary data.
  //                              <--------|V|V|V|V|V|V|V|V|V|-----------
  // async function MyProjectDataRequester(project_id: number, conn: mysql.Connection): Promise<MyProjectData> {
  //   <-----------------------------------------------------------------
  //   | Here the 'conn' parameter can be used to
  //   | execute queries against the MySQL server.
  //   <----------------<------------------------------------------------
  //                    | The object returned here will be assigned to
  //   return myObject; | the 'project_data' field in the corresponding
  //                    | 'ProjectGroup' instance.
  // }                  <------------------------------------------------
  // 
  // All of the above code shall be located in the folder:
  // 'src/app/lib/db_proprietary/pv_data_structures' in a file called 'ProjectType.ts'.
  //
  // For further support:
  // > douglas.lyman@icloud.com
  // 
  __PvDb.SetProjectTypeDataRequester('SUSG01', SUSG01ProjectDataRequester);

  __PvDb.Connect();

  // ------------------- Component data requesters -------------------
  __GyDb.SetComponentDataRequester('SY0', SY0ComponentDataRequester);
  __GyDb.SetComponentDataRequester('SU0', SU0ComponentDataRequester);
  __GyDb.SetComponentDataRequester('ES1', ES1ComponentDataRequester);
  __GyDb.SetComponentDataRequester('ES2', ES2ComponentDataRequester);

  __GyDb.Connect();

  init_main_frame_hack('IXNMKAXHCYYUXZDS'); // DO NOT REMOVE; integral for app functionality.
}