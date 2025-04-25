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
  project_name: string;
  group_name: string;
  poster_ref: string;
  description: string;          //<---------------------------------------
  project_type: string;         //| This is where a proprietary data
  project_data: any; //<----------| structure instance queried by a
  group_members: GroupMember[]; //| project data requester will be located.
}                               //<---------------------------------------

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

// AUTH
export interface Access {
  access_id: string;
  description: string;
}

export interface Token {
  entity_id: number;
  token: string | null;
  created_at: Date;
}

export interface Entity {
  entity_id: number;
  username: string;
  password: string;
}

export interface ResponseEntity {
  username: string;
  password: string | null;
  access: string[];
}

export interface DetailedEntity {
  entity_id: number;
  username: string;
  password: string;
  access: Access[];
}