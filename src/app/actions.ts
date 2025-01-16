'use server';

import { PvDb, GyDb } from '@/instrumentation';
import { Collaboration, FullCollaboration } from './lib/DbTypes';

export async function PV_GetDbPresentYears(): Promise<number[]> {
  return PvDb.GetDbPresentYears();
}

export async function PV_GetCollaborationsFromYear(year: number): Promise<Collaboration[]> {
  return PvDb.GetCollaborationsFromYear(year);
}

export async function PV_GetCollaborationFromId(id: number): Promise<FullCollaboration> {
  return PvDb.GetCollaborationFromId(id);
}