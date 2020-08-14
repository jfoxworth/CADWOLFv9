export interface CadwolfFile {
	uid 			: string;
	creatorId 		: string;
	dateCreated 	: string;
	fileType 		: number;
	itemData 		: string;
	name 			: string;
	needsUpdate 	: boolean;
	oid 			: string;
	order 			: number;
	parentId		: string;
	version 		: number;

	viewPermType 	: number;
	editPermType 	: number;
	adminPermType 	: number;
}