import { Collaboration, FullCollaboration, ProjectGroup, Thesis } from "./DbTypes";

const routes = {
  pv_years: '/api/pv/years',                    // GET;
  pv_collaborations: '/api/pv/collaborations',  // GET; requires 'DbRef-Year' header.
  pv_collaboration: '/api/pv/collaboration',    // GET; requires 'DbRef-Id' header.
  gy_years: '/api/gyarte/years',                // GET;
  gy_theses: '/api/gyarte/theses',              // GET; requires 'DbRef-Year' and 'DbRef-
  gy_thesis: '/api/gyarte/thesis'               // GET; requires 'DbRef-Id' header.
};

export class PvDb {
  public static async GetDbPresentYears(): Promise<number[]> {
    return fetch(routes.pv_years)
    .then(async (response: Response): Promise<number[]> => {
      if (response.status != 200)
        throw new Error(`Fetch failed (${response.status}): '${response.headers.get('Error-Message')}'`);
      return JSON.parse(await response.json()) as number[];
    });
  }

  public static async GetCollaborationsFromYear(year: number): Promise<Collaboration[]> {
    return fetch(routes.pv_collaborations, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'DbRef-Year': year.toString()
      }
    }).then(async (response: Response): Promise<Collaboration[]> => {
      if (response.status != 200)
        throw new Error(`Fetch failed (${response.status}): '${response.headers.get('Error-Message')}'`);
      return JSON.parse(await response.json()) as Collaboration[];
    });
  }

  public static async GetCollaborationFromId(id: number): Promise<FullCollaboration> {
    return fetch(routes.pv_collaboration, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'DbRef-Id': id.toString()
      }
    }).then(async (response: Response): Promise<FullCollaboration> => {
      if (response.status != 200)
        throw new Error(`Fetch failed (${response.status}): '${response.headers.get('Error-Message')}'`);
      return JSON.parse(await response.json()) as FullCollaboration;
    });
  }

  public static async GetProjectFromId(id: number): Promise<ProjectGroup> {
    return fetch(routes.pv_collaboration, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'DbRef-Id': id.toString()
      }
    }).then(async (response: Response): Promise<ProjectGroup> => {
      if (response.status != 200)
        throw new Error(`Fetch failed (${response.status}): '${response.headers.get('Error-Message')}'`);
      return JSON.parse(await response.json()) as ProjectGroup;
    });
  }
}

export class GyDb {
  public static async GetDbPresentYears(): Promise<number[]> {
    return fetch(routes.gy_years)
    .then(async (response: Response): Promise<number[]> => {
      if (response.status != 200)
        throw new Error(`Fetch failed (${response.status}): '${response.headers.get('Error-Message')}'`);
      return JSON.parse(await response.json()) as number[];
    });
  }

  public static async GetThesesByYearAndCourse(year: number, course: string): Promise<Thesis[]> {
    return fetch(routes.gy_theses, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'DbRef-Year': year.toString(),
        'DbRef-Course': course
      }
    }).then(async (response: Response): Promise<Thesis[]> => {
      if (response.status != 200)
        throw new Error(`Fetch failed (${response.status}): '${response.headers.get('Error-Message')}'`);
      return JSON.parse(await response.json()) as Thesis[];
    });
  }

  public static async GetThesisById(id: number): Promise<Thesis> {
    return fetch(routes.gy_thesis, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'DbRef-Id': id.toString()
      }
    }).then(async (response: Response): Promise<Thesis> => {
      if (response.status != 200)
        throw new Error(`Fetch failed (${response.status}): '${response.headers.get('Error-Message')}'`);
      return JSON.parse(await response.json()) as Thesis;
    });
  }
}