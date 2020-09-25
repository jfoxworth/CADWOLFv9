
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



//	fileStatus 		: BehaviorSubject<any>;					// Handles getting the dataset




	constructor(	public afs 					: AngularFirestore,
					public permissionsService 	: PermissionsService,
			        private logService 			: LogService )
	{
//		this.fileStatus 			= new BehaviorSubject([]);

	}



}
