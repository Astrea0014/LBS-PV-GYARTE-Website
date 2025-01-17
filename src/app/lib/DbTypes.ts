// PV
export interface Collaboration {
  collaboration_id: number;
  year: number;
  theme: string;
  description: string;
  poster_ref: string;
  collaborators: string[];
}

export interface GroupMember {
  name: string;
  class: string;
}

export interface ProjectGroup {
  project_id: number;
  group_name: string;
  project_type: string;
  project_data: any;  // This is where a proprietary data
  // structure instance queried by a
  // project data requester will be located.
  group_members: GroupMember[];
}

export interface FullCollaboration extends Collaboration {
  project_groups: ProjectGroup[];
}

// GYARTE
export interface Thesis {
  id: number;
  thesis: string;
  course: string;
  author_name: string | null;
  author_class: string | null;
  publication_year: number;
  component_id: string;
  component_data: any;
}