
export interface CadwolfComponent {
	
	id 				: string;
	dateCreated 	: number;
	dateModified 	: number;
	itemId 			: string;
	name 			: string;
	fileId 			: string;
	componentType 	: number;
	content			: any;
	dependentId 	: string;
	dependentFile 	: string;
	order 			: number;
	inEdit 			: number;

	creatorId 		: string;
	creatorName 	: string;

}




/*

component type numbers

1 - text
2 - header
3 - equation
4 - symbolic equation
5 - table
6 - for loop
7 - while loop
8 - if else
9 - plot
10 - image
11 - line break
12 - video
13 - three D plot
14 -
15 - card
16 - free body diagram
17 - requirement

*/