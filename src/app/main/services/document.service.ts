
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { LogEntry } from 'app/main/models/log';
import { Permission } from 'app/main/models/permission';
import { CadwolfComponent } from 'app/main/models/cadwolfComponent';




// Services
import { AuthService } from 'app/main/services/auth.service';
import { LogService } from 'app/main/services/log.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable({
	providedIn: 'root'
})
export class DocumentService {


	fileStatus 		: BehaviorSubject<any>;


	constructor(
		public afs 		: AngularFirestore,
	) 
	{ 
		this.fileStatus 			= new BehaviorSubject([]);
	}





	/*
	 *
	 * 	Get a file using an ID
	 *
	 * 
	 */
	getFileById( fileId )
	{

		this.afs.collection('files').doc(fileId)
		.valueChanges()
		.subscribe((result:CadwolfFile[]) => {

			// Send to observable
			this.fileStatus.next(result);
			
		});

	}




	/*-----------------------------------------------------------------------------
	*
	*
	*	FUNCTIONS TO CREATE DOCUMENT ITEMS
	*
	*
	*-----------------------------------------------------------------------------*/


	/*
	*
	*
	*	Options Array for kolkov editor
	*
	*
	*/
	kolkovSettings()
	{
		return {
			editable: true,
			spellcheck: true,
			height: 'auto',
			minHeight: '0',
			maxHeight: 'auto',
			width: 'auto',
			minWidth: '0',
			translate: 'yes',
			enableToolbar: true,
			showToolbar: true,
			placeholder: 'Enter text here...',
			defaultParagraphSeparator: '',
			defaultFontName: '',
			defaultFontSize: '',
			fonts: [
				{class: 'arial', name: 'Arial'},
				{class: 'times-new-roman', name: 'Times New Roman'},
				{class: 'calibri', name: 'Calibri'},
				{class: 'comic-sans-ms', name: 'Comic Sans MS'}
 			],
			customClasses: [
			],
			uploadUrl: 'v1/image',
			uploadWithCredentials: false,
			sanitize: true,
			//toolbarPosition: 'top',
			toolbarHiddenButtons: [
				['fontName'],
				['customClasses', 
					'insertImage',
					'insertVideo'
				]
			]
		}
	}


	/*
	*
	*
	*	Return array for add item options
	*
	*
	*/
	getAddComponentItems()
	{
		return [
			{
				addItem : 'text',
				icon 	: 'font_download',
				toolTip : 'Add Text Item'
			},
			{
				addItem : 'header',
				icon 	: 'format_bold',
				toolTip : 'Add Header Item'
			}
		]
	}

	/*

						<button mat-mini-fab 
								color="#2D323E"
								aria-label="Add Equation Item"
								matTooltip="Add Equation Item"
								class="ml-28 mt-8"
								matTooltipPosition="above"
								(click)="addComponent('equation')">
							<mat-icon>functions</mat-icon>
						</button>

						<button mat-mini-fab 
								color="#2D323E"
								aria-label="Add Symbolic Equation"
								matTooltip="Add Symbolic Equation"
								class="ml-28 mt-8"
								matTooltipPosition="above"
								(click)="addComponent('slider')">
							<mat-icon>table_chart</mat-icon>
						</button>

						<button mat-mini-fab 
								color="#2D323E"
								aria-label="Add Table Item"
								matTooltip="Add Table Item"
								class="ml-28 mt-8"
								matTooltipPosition="above"
								(click)="addComponent('radio')">
							<mat-icon>table_chart</mat-icon>
						</button>

						<button mat-mini-fab 
								color="#2D323E"
								aria-label="Add forum"
								matTooltip="Add forum"
								class="ml-28 mt-8"
								matTooltipPosition="above"
								(click)="addComponent('select')">
							<mat-icon>chat</mat-icon>
						</button>

						<button mat-mini-fab 
								color="#2D323E"
								aria-label="Add forum"
								matTooltip="Add forum"
								class="ml-28 mt-8"
								matTooltipPosition="above"
								(click)="addComponent('symbolic')">
							<mat-icon>chat</mat-icon>
						</button>

						<button mat-mini-fab 
								color="#2D323E"
								aria-label="Add forum"
								matTooltip="Add forum"
								class="ml-28 mt-8"
								matTooltipPosition="above"
								(click)="addComponent('card')">
							<mat-icon>chat</mat-icon>
						</button>

						<button mat-mini-fab 
								color="#2D323E"
								aria-label="Add forum"
								matTooltip="Add forum"
								class="ml-28 mt-8"
								matTooltipPosition="above"
								(click)="addComponent('table')">
							<mat-icon>chat</mat-icon>
						</button>

						<button mat-mini-fab 
								color="#2D323E"
								aria-label="Add Image Item"
								matTooltip="Add Image Item"
								class="ml-28 mt-8"
								matTooltipPosition="above"
								(click)="addComponent('forLoop')">
							<mat-icon>local_see</mat-icon>
						</button>

					</div>




					<div fxLayout="row">

						<button mat-mini-fab 
								color="#2D323E"
								aria-label="Add forum"
								matTooltip="Add forum"
								class="ml-28 mt-8"
								matTooltipPosition="below"
								(click)="addComponent('whileLoop')">
							<mat-icon>chat</mat-icon>
						</button>

						<button mat-mini-fab 
								color="#2D323E"
								aria-label="Add Video Item"
								matTooltip="Add Video Item"
								class="ml-28 mt-8"
								matTooltipPosition="below"
								(click)="addComponent('ifElse')">
							<mat-icon>movie</mat-icon>
						</button>

						<button mat-mini-fab 
								color="#2D323E"
								aria-label="Add forum"
								matTooltip="Add forum"
								class="ml-28 mt-8"
								matTooltipPosition="below"
								(click)="addComponent('plot')">
							<mat-icon>chat</mat-icon>
						</button>

						<button mat-mini-fab 
								color="#2D323E"
								aria-label="Add forum"
								matTooltip="Add forum"
								class="ml-28 mt-8"
								matTooltipPosition="below"
								(click)="addComponent('chart')">
							<mat-icon>chat</mat-icon>
						</button>

						<button mat-mini-fab 
								color="#2D323E"
								aria-label="Add forum"
								matTooltip="Add forum"
								class="ml-28 mt-8"
								matTooltipPosition="below"
								(click)="addComponent('image')">
							<mat-icon>chat</mat-icon>
						</button>

						<button mat-mini-fab 
								color="#2D323E"
								aria-label="Add forum"
								matTooltip="Add forum"
								class="ml-28 mt-8"
								matTooltipPosition="below"
								(click)="addComponent('video')">
							<mat-icon>chat</mat-icon>
						</button>

						<button mat-mini-fab 
								color="#2D323E"
								aria-label="Add forum"
								matTooltip="Add forum"
								class="ml-28 mt-8"
								matTooltipPosition="below"
								(click)="addComponent('lineBreak')">
							<mat-icon>chat</mat-icon>
						</button>

						<button mat-mini-fab 
								color="#2D323E"
								aria-label="Add forum"
								matTooltip="Add forum"
								class="ml-28 mt-8"
								matTooltipPosition="below"
								(click)="addComponent('freeBodyDiagram')">
							<mat-icon>chat</mat-icon>
						</button>

						<button mat-mini-fab 
								color="#2D323E"
								aria-label="Add forum"
								matTooltip="Add forum"
								class="ml-28 mt-8"
								matTooltipPosition="below"
								(click)="addComponent('requirement')">
							<mat-icon>chat</mat-icon>
						</button>

					</div>


				</div>


			</div>
			<!-- / The add item row -->


		*/



}
