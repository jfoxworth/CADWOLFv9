export interface Branch {
	dateCreated 	: number;		// Created when the branch is created
	parentBranch 	: string; 		// ID of branch that this branch was cloned from - 0 if parent
	name 			: string;		// Simple user entered name of branch
	isMaster 		: boolean;		// Boolean for whether or not this is a master
	status 			: number; 		// 0 for open, 1 for close
	creatorId 		: string;  		// User ID of the person that created the branch
	creatorName		: string; 		// Name of user that created branch
	description 	: string;		// Text description of branch
	fileId 			: string;		// The oid of the file that all of this is based around
}