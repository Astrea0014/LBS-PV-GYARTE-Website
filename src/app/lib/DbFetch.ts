import { Collaboration, FullCollaboration, ProjectGroup, Thesis } from './DbTypes';
import { errors } from './Errors';

const routes = {
  pv_years: '/api/pv/years',                    // GET;
  pv_collaborations: '/api/pv/collaborations',  // GET; requires 'DbRef-Year' header.
  pv_collaboration: '/api/pv/collaboration',    // GET; requires 'DbRef-Id' header.
  pv_project: '/api/pv/project',                // GET; requires 'DbRef-Id' header.
  gy_years: '/api/gyarte/years',                // GET;
  gy_theses: '/api/gyarte/theses',              // GET; requires 'DbRef-Year' and 'DbRef-Course' headers.
  gy_thesis: '/api/gyarte/thesis'               // GET; requires 'DbRef-Id' header.
};

export class PvDb {
  public static async GetDbPresentYears(): Promise<number[]> {
    return fetch(routes.pv_years)
    .then(async (response: Response): Promise<number[]> => {
      if (response.status != 200)
        throw new Error(errors.fetch_failed(response));
      return JSON.parse(await response.json()) as number[];
    });
  }

  public static async GetCollaborationsFromYear(year: number): Promise<Collaboration[]> {
    if (Number.isNaN(year)) {
      throw new Error(errors.input_nan);
    }
    
    return fetch(routes.pv_collaborations, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'DbRef-Year': year.toString()
      }
    }).then(async (response: Response): Promise<Collaboration[]> => {
      if (response.status != 200)
        throw new Error(errors.fetch_failed(response));
      return JSON.parse(await response.json()) as Collaboration[];
    });
  }

  public static async GetCollaborationFromId(id: number): Promise<FullCollaboration> {
    if (Number.isNaN(id)) {
      throw new Error(errors.input_nan);
    }

    return fetch(routes.pv_collaboration, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'DbRef-Id': id.toString()
      }
    }).then(async (response: Response): Promise<FullCollaboration> => {
      if (response.status != 200)
        throw new Error(errors.fetch_failed(response));
      return JSON.parse(await response.json()) as FullCollaboration;
    });
  }

  public static async GetProjectFromId(id: number): Promise<ProjectGroup> {
    if (Number.isNaN(id)) {
      throw new Error(errors.input_nan);
    }

    return fetch(routes.pv_project, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'DbRef-Id': id.toString()
      }
    }).then(async (response: Response): Promise<ProjectGroup> => {
      if (response.status != 200)
        throw new Error(errors.fetch_failed(response));
      return JSON.parse(await response.json()) as ProjectGroup;
    });
  }
}

export class GyDb {
  public static async GetDbPresentYears(): Promise<number[]> {
    return fetch(routes.gy_years)
    .then(async (response: Response): Promise<number[]> => {
      if (response.status != 200)
        throw new Error(errors.fetch_failed(response));
      return JSON.parse(await response.json()) as number[];
    });
  }

  public static async GetThesesByYearAndCourse(year: number, course: string): Promise<Thesis[]> {
    if (Number.isNaN(year)) {
      throw new Error(errors.input_nan);
    }

    return fetch(routes.gy_theses, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'DbRef-Year': year.toString(),
        'DbRef-Course': course
      }
    }).then(async (response: Response): Promise<Thesis[]> => {
      if (response.status != 200)
        throw new Error(errors.fetch_failed(response));
      return JSON.parse(await response.json()) as Thesis[];
    });
  }

  public static async GetThesisById(id: number): Promise<Thesis> {
    if (Number.isNaN(id)) {
      throw new Error(errors.input_nan);
    }

    return fetch(routes.gy_thesis, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'DbRef-Id': id.toString()
      }
    }).then(async (response: Response): Promise<Thesis> => {
      if (response.status != 200)
        throw new Error(errors.fetch_failed(response));
      return JSON.parse(await response.json()) as Thesis;
    });
  }
}