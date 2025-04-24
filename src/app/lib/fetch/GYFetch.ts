import { Thesis } from "@/app/lib/Types";
import * as Helper from "@/app/lib/RoutingHelpers";

const routes = {
  stub: "/api/gyarte/",
  present_years: () => routes.stub + "years", // GET;
  theses: () => routes.stub + "theses",       // GET; requires 'DbRef-Year' and 'DbRef-Course' headers.
  thesis: () => routes.stub + "thesis"        // GET; requires 'DbRef-Id' header.
};

export async function GetPresentYears(): Promise<number[]> {
  const response = await fetch(routes.present_years(), {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });

  await Helper.ThrowOnBadResponse(response);

  const json = await response.json();
  return json as number[];
}

export async function GetThesesByYearAndCourse(year: number, course: string): Promise<Thesis[]> {
  Helper.ThrowOnNaN(year);

  const response = await fetch(routes.theses(), {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Reference-Publication-Year": year.toString(),
      "Reference-Course": course
    }
  });

  await Helper.ThrowOnBadResponse(response);

  const json = await response.json();
  return json as Thesis[];
}

export async function GetThesisById(id: number): Promise<Thesis> {
  Helper.ThrowOnNaN(id);

  const response = await fetch(routes.thesis(), {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Reference-Thesis-Id": id.toString()
    }
  });

  await Helper.ThrowOnBadResponse(response);

  const json = await response.json();
  return json as Thesis;
}