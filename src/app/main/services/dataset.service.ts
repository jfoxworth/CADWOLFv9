
/*


	This is the service that handles all of the actions related 
	to the dataset view component. The functions parse the raw
	text and return the results and get the size of the returned
	array.


*/



// Standard Angular Items
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { LogEntry } from 'app/main/models/log';
import { Permission } from 'app/main/models/permission';
import { Branch } from 'app/main/models/branch';




// Services
import { LogService } from 'app/main/services/log.service';
import { WorkspaceService } from 'app/main/services/workspace.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PermissionsService } from 'app/main/services/permissions.service';




@Injectable({
  providedIn: 'root'
})
export class DatasetService {





	constructor(	public afs 					: AngularFirestore,
					public permissionsService 	: PermissionsService,
			        private logService 			: LogService )
	{

	}



	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS
	//
	// -----------------------------------------------------------------------------------------------------


	// This is the function that takes raw text and parses it into an array
	parseText( datasetFile:CadwolfFile, textToParse : string )
	{
		console.log(`The text to be parsed is ...`);
		console.log(textToParse);

		let parsedText = textToParse.split(datasetFile.itemData.parsers[0]);

		if ( datasetFile.itemData.parsers.length == 1 )
		{
			console.log(`The parsed text is ...`);
			console.log(parsedText);
			return parsedText;
		}

		if ( datasetFile.itemData.parsers.length == 2 )
		{
			let parsedText2 = [];
			for ( var a=0; a<parsedText.length; a++)
			{
				parsedText2[a] = parsedText[a].split(datasetFile.itemData.parsers[1]);
			}
			console.log(`The parsed text is ...`);
			console.log(parsedText2);
			console.log(parsedText2.length);
			return parsedText2;
		}


		if ( datasetFile.itemData.parsers.length == 3 )
		{
			let parsedText3 = [];
			let parsedText4 = [];
			for ( var a=0; a<parsedText.length; a++)
			{
				parsedText3[a] = parsedText[a].split(datasetFile.itemData.parsers[1]);
				for ( var b=0; b<parsedText[a].length; b++)
				{
					parsedText4[a][b] = parsedText3[a][b].split(datasetFile.itemData.parsers[2]);
				}
			}
			console.log(`The parsed text is ...`);
			console.log(parsedText4);
			return parsedText4;
		}

	}



	// This function gets the size of the parsed array
	getSize( datasetFile:CadwolfFile )
	{
		let size 	= datasetFile.itemData.realArray.length;
		size 		= size+'x'+datasetFile.itemData.realArray[0].length;
		
		if ( datasetFile.itemData.realArray[0][0].length > 1 )
		{
			size 	= size+'x'+datasetFile.itemData.realArray[0][0].length;
		}

		if ( datasetFile.itemData.realArray[0][0][0].length > 1 )
		{
			size 	= size+'x'+datasetFile.itemData.realArray[0][0][0].length;
		}

		return size
	}

}
