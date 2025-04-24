import { Collaboration, FullCollaboration, ProjectGroup } from "../Types";
import * as Helper from "../RoutingHelpers";

const routes = {
  stub: "api/pv/",
  present_years: () => routes.stub + "years",           // GET;
  collaborations: () => routes.stub + "collaborations", // GET; requires 'DbRef-Year' header.
  collaboration: () => routes.stub + "collaboration",   // GET; requires 'DbRef-Id' header.
  project: () => routes.stub + "project"                // GET; requires 'DbRef-Id' header.
};

export async function GetPresentYears(): Promise<number[]> {
  const response = await fetch(routes.present_years(), {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });

  Helper.ThrowOnBadResponse(response);

  const json = await response.json();
  return JSON.parse(json) as number[];
}

export async function GetCollaborationsFromYear(year: number): Promise<Collaboration[]> {
  Helper.ThrowOnNaN(year);

  const response = await fetch(routes.collaborations(), {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "DbRef-Year": year.toString()
    }
  });

  Helper.ThrowOnBadResponse(response);

  const json = await response.json();
  return JSON.parse(json) as Collaboration[];
}

export async function GetCollaborationFromId(collaboration_id: number): Promise<FullCollaboration> {
  Helper.ThrowOnNaN(collaboration_id);

  const response = await fetch(routes.collaboration(), {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Reference-Collaboration-Id": collaboration_id.toString()
    }
  });

  Helper.ThrowOnBadResponse(response);

  const json = await response.json();
  return json as FullCollaboration;
}

export async function GetProjectFromId(project_id: number): Promise<ProjectGroup> {
  Helper.ThrowOnNaN(project_id);

  const response = await fetch(routes.collaboration(), {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "DbRef-Id": project_id.toString()
    }
  });

  const json = await response.json();
  return JSON.parse(json) as ProjectGroup;
}