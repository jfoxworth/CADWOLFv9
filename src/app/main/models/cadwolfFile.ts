export interface CadwolfFile {
	uid 			: string;
	creatorId 		: string;
	dateCreated 	: number;
	dateModified 	: number;
	fileType 		: number;
	itemData 		: any;
	name 			: string;
	needsUpdate 	: boolean;
	oid 			: string;
	id 				: string;
	order 			: number;
	parentId		: string;
	version 		: number;
	revision 		: number;
	deleted 		: boolean;

	viewPermType 	: number;
	editPermType 	: number;
	adminPermType 	: number;

	branchId 		: string;
}



