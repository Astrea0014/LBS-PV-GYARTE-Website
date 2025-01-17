import { Collaboration, FullCollaboration } from "./DbTypes";

const routes = {
  pv_years: "/api/pv/years",                    // GET;
  pv_collaborations: "/api/pv/collaborations",  // GET; requires 'DbRef-Year' header.
  pv_collaboration: "/api/pv/collaboration"     // GET; requires 'DbRef-Id' header.
};

export class PvDb {
  static async GetDbPresentYears(): Promise<number[]> {
    return fetch(routes.pv_years)
    .then(async (response: Response): Promise<number[]> => JSON.parse(await response.json()) as number[]);
  }

  static async GetCollaborationsFromYear(year: number): Promise<Collaboration[]> {
    return fetch(routes.pv_collaborations, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'DbRef-Year': year.toString()
      }
    }).then(async (response: Response): Promise<Collaboration[]> => JSON.parse(await response.json()) as Collaboration[]);
  }

  static async GetCollaborationFromId(id: number): Promise<FullCollaboration> {
    return fetch(routes.pv_collaboration, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'DbRef-Id': id.toString()
      }
    }).then(async (response: Response): Promise<FullCollaboration> => JSON.parse(await response.json()) as FullCollaboration);
  }
}