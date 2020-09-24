export interface CadwolfFile {
	uid 			: string;
	creatorId 		: string;
	dateCreated 	: number;
	dateModified 	: number;
	fileType 		: number;
	itemData 		: string;
	name 			: string;
	needsUpdate 	: boolean;
	oid 			: string;
	id 				: string;
	order 			: number;
	parentId		: string;
	version 		: number;
	revision 		: number;
	deleted 		: boolean;
	description 	: string;

	viewPermType 	: number;
	editPermType 	: number;
	adminPermType 	: number;

	branchId 		: string;
}



