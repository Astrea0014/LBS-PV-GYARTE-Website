"use client"

import { PvDb } from "../lib/DbFetch";

export default function IvePlayedTheseGamesBefore() {
  return (
    <button onClick={async () => {
      console.log((await PvDb.GetCollaborationFromId(1)));
    }} className="btn h-16 w-16 m-16"/>
  );
}