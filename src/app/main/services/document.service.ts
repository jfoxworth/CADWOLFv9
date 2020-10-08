
/*

	This is the service to handle all items for the document
	component. The document is the primary item on the platform.
	While a separate service handles all CRUD operations for a 
	file, this service handles all actions related to the viewing
	of a document.

*/

// Standard Angular Items
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



	constructor(
		public afs 		: AngularFirestore,
	) 
	{ 
	}









	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS TO CREATE DOCUMENT ITEMS
	//
	// -----------------------------------------------------------------------------------------------------



	/*
	*
	*
	*	Options Array for kolkov text editor
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
	getButton1Items()
	{
		return [
			{
				addItem : 'text',
				icon 	: 'font_download',
				toolTip : 'Add Text Item',
				row1 	: true
			},
			{
				addItem : 'header',
				icon 	: 'title',
				toolTip : 'Add Header Item',
				row1 	: true
			},
			{
				addItem : 'equation',
				icon 	: 'functions',
				toolTip : 'Add Equation',
				row1 	: true
			},
			{
				addItem : 'slider',
				icon 	: 'toggle_off',
				toolTip : 'Add Slider',
				row1 	: true
			},
			{
				addItem : 'radio',
				icon 	: 'radio_button_checked',
				toolTip : 'Add Radio Select',
				row1 	: true
			},
			{
				addItem : 'select',
				icon 	: 'edit_attributes',
				toolTip : 'Add Dropdown Select',
				row1 	: true
			},
			{
				addItem : 'Symbolic Equation',
				icon 	: 'create',
				toolTip : 'Add Symbolic Equation',
				row1 	: true
			}
		]
	}

	getButton2Items()
	{
		return [
			{
				addItem : 'card',
				icon 	: 'collections',
				toolTip : 'Add Card',
				row2 	: true
			},
			{
				addItem : 'Table',
				icon 	: 'grid_on',
				toolTip : 'Add Table',
				row2 	: true
			},
			{
				addItem : 'forLoop',
				icon 	: 'loop',
				toolTip : 'Add For Loop',
				row2 	: true
			},
			{
				addItem : 'whileLoop',
				icon 	: 'low_priority',
				toolTip : 'Add While Loop',
				row2 	: true
			},
			{
				addItem : 'ifElse',
				icon 	: 'call_split',
				toolTip : 'Add If Else',
				row2 	: true
			},
			{
				addItem : 'plot',
				icon 	: 'bar_chart',
				toolTip : 'Add Plot',
				row2 	: true
			},
			{
				addItem : 'chart',
				icon 	: 'bubble_chart',
				toolTip : 'Add Chart',
				row3 	: true
			}
		]
	}
	
	getButton3Items()
	{
		return [
			{
				addItem : 'image',
				icon 	: 'camera_alt',
				toolTip : 'Add Image',
				row2 	: true
			},
			{
				addItem : 'video',
				icon 	: 'videocam',
				toolTip : 'Add Video',
				row3 	: true
			},
			{
				addItem : 'lineBreak',
				icon 	: 'vertical_align_center',
				toolTip : 'Add Line Break',
				row3 	: true
			},
			{
				addItem : 'freeBodyDiagram',
				icon 	: 'widgets',
				toolTip : 'Add Free Body Diagram',
				row3 	: true
			},
			{
				addItem : 'requirement',
				icon 	: 'security',
				toolTip : 'Add Requirement',
				row3 	: true
			},
		]
	}




}
