export interface Collaboration {
    collaboration_id: number;
    year: number;
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