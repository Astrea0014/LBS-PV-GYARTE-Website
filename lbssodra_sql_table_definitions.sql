CREATE DATABASE gymnasial_theses;

USE gymnasial_theses;

CREATE TABLE theses (
	id					INT,
    thesis				VARCHAR(128)	NOT NULL,
    course				CHAR(2)			NOT NULL,	# AI, SU, SY, FF, MB, GD, SG
    author_name			VARCHAR(64),
    author_class		CHAR(6),
    publication_year	SMALLINT		NOT NULL,
    component_id		CHAR(3)			NOT NULL,	# Possible values: SY0, SU0, ES1, ES2.
													# - SY0 uses SY0
													# - SU0 uses ESV
													# - ES1 uses ESX
													# - ES2 uses ESX and ESV
													# The component id is the field to be modified if any new layouts for
													# different type of works 
    
    CONSTRAINT pk_thesis_id
		PRIMARY KEY (id),
    CONSTRAINT uq_name_class
		UNIQUE (author_name, author_class)
);

CREATE TABLE sy0_component_data (
	id					INT,
    href				VARCHAR(512)	NOT NULL,
    
    CONSTRAINT fk_sy0_thesis_id
		FOREIGN KEY (id)
        REFERENCES theses(id)
);

CREATE TABLE esx_component_data (
	id					INT,
    image_header		VARCHAR(64),
    image_ref			VARCHAR(256)	NOT NULL,
    image_format		CHAR(12)		NOT NULL,
    
    CONSTRAINT fk_esx_thesis_id
		FOREIGN KEY (id)
        REFERENCES theses(id),
	CONSTRAINT uq_image_ref
		UNIQUE (image_ref)
);

CREATE TABLE esv_component_data (
	id					INT,
    video_ref			VARCHAR(256)	NOT NULL,
    
    CONSTRAINT fk_esv_thesis_id
		FOREIGN KEY (id)
		REFERENCES theses(id),
	CONSTRAINT uq_video_ref
		UNIQUE (video_ref)
);

CREATE DATABASE program_weeks;

USE program_weeks;

# Contains a collaboration between one or more programs.
# Example: SU-SG program weeks 2025
CREATE TABLE collaborations (
	collaboration_id	INT,
    year				SMALLINT		NOT NULL,
    description			TEXT			NOT NULL,
    
    CONSTRAINT pk_collaboration_id
		PRIMARY KEY (collaboration_id)
);

# Links which courses belong to which collaboration.
# This is a one-to-many relationship.
# Example: SU and SG use the same collaboration id -> they are collaborators in the identified collaboration.
CREATE TABLE collaborators (
	collaboration_id	INT,
    collaborator		CHAR(2)			NOT NULL,		# E.g. SU, SG, SY, AW, AI, GD, FF, MB
    
    CONSTRAINT fk_collaborators_collaboration_id
		FOREIGN KEY (collaboration_id)
		REFERENCES collaborations(collaboration_id),
	CONSTRAINT uq_collaborator							# The same collaborator for a collaboration should not be able to be named twice.
		UNIQUE (collaboration_id, collaborator)
);

# Contains the numerous groups in a collaboration.
CREATE TABLE project_groups (
	collaboration_id	INT,
    project_id			INT,
    group_name			VARCHAR(64)		NOT NULL,		# If none is specified, the group id should be provided. E.g. 2:21, 3:1 et cetera.
    project_type		CHAR(8)			NOT NULL,		# Used as a data location and layout reference.
														# -- Longer explanation --
														# This field is highly modifiable, as it determines what react component is used for the layout,
														# and what table to reference for the data the component uses to display the works.
														# The naming scheme for the project type is as follows:
														# (collaborator 1)[(collaborator 2)[(collaborator 3)]](number, starting with 01)
														# where square brackets define optional values.
														# Example:
														#	The project type for SU-SG 2025 will be SUSG01, as it is the first SU-SG layout.
														# 	If AW, AI and GD collaborated, it would be AWAIGD01.
														#	If SU and SG collaborate again, and the layout needs to be changed, it would be SUSG02.
                                        
	CONSTRAINT fk_project_groups_collaboration_id
		FOREIGN KEY (collaboration_id)
        REFERENCES collaborations(collaboration_id),
	CONSTRAINT pk_project_id
		PRIMARY KEY (project_id)
);

# Contains a student name and class.
CREATE TABLE people (
	person_id			INT,
    name				VARCHAR(64),
    class				CHAR(8),
    
    CONSTRAINT pk_person_id
		PRIMARY KEY (person_id),
	CONSTRAINT uq_name_class
		UNIQUE (name, class)
);

# Association table for many-to-many relation between project_groups and people tables.
CREATE TABLE project_groups_people (
	project_id			INT,
    person_id			INT,
    
    CONSTRAINT fk_project_id
		FOREIGN KEY (project_id)
		REFERENCES project_groups(project_id),
	CONSTRAINT fk_person_id
		FOREIGN KEY (person_id)
		REFERENCES people(person_id),
	CONSTRAINT pk_project_person_id
		PRIMARY KEY (project_id, person_id)
);

# Proprietary tables are created for each layout added. The project type is what determines which data tables are accessed.
# This is because different layouts for different types of projects also require different types of data.

# PROPRIETARY FOR SUSG01 LAYOUT
# One-to-one relation for layout data.
CREATE TABLE susg01_project_data (
	project_id			INT,
    itch_href			VARCHAR(512)	NOT NULL,
    video_ref			VARCHAR(256)	NOT NULL,
    poster_ref			VARCHAR(256)	NOT NULL,
    moodboard_ref		VARCHAR(256)	NOT NULL,
    
	CONSTRAINT fk_susg01_project_id
		FOREIGN KEY (project_id)
		REFERENCES project_groups(project_id)
);

# PROPRIETARY FOR SUSG01 LAYOUT
# One-to-many relation for multiple game assets in a 1:1 format.
CREATE TABLE susg01_project_assets (
	project_id			INT,
    asset_ref			VARCHAR(256)	NOT NULL,
    
    CONSTRAINT fk_susg01a_project_id
		FOREIGN KEY (project_id)
		REFERENCES project_groups(project_id) 
);