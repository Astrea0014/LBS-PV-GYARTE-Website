"use client";

import SuSg from "./SuSg";
import { PvDb } from "@/app/lib/DbFetch";
import { FullCollaboration } from "@/app/lib/DbTypes";
import { useState, useEffect } from "react";

interface ProjectPageProps {
  params: Promise<{
    collabId: string;
    projectId: string;
  }>
}

export default async function ProjectPage({params}: ProjectPageProps) {
  return (
    <>
    </>
  );
}