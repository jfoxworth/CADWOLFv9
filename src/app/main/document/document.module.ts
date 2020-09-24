
// Standard angular items
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Fuse specific items
import { FuseSharedModule } from '@fuse/shared.module';


// Material Items
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';



// Text editor
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { DocumentComponent } from './document.component';
import { TextComponent } from './components/text/text.component';
import { PropertiesComponent } from './settings/properties/properties.component';
import { SettingsComponent } from './settings/settings.component';
import { WidthmarginComponent } from './settings/widthmargin/widthmargin.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Services



// Material Imports


const routes = [

	{
		path: 'document',
//		runGuardsAndResolvers: 'always',
		children: [
			{ path: '**', component: DocumentComponent },
		]
	},

	{
		path: 'Document',
		children: [
			{ path: '**', component: DocumentComponent },
		]
	},



	{
		path: 'documentId/:documentId',
		component: DocumentComponent,
	},

	{
		path: 'DocumentId/:documentId',
		component: DocumentComponent,
	}



];

@NgModule({
	declarations: [
		DocumentComponent,
		TextComponent,
		PropertiesComponent,
		SettingsComponent,
		WidthmarginComponent,
	],
	imports	 : [
		RouterModule.forChild(routes),
		FuseSharedModule,

		MatButtonModule,
		MatInputModule,
		MatIconModule,
		MatListModule,
		MatTooltipModule,
		MatRadioModule,
		MatFormFieldModule,
		MatMenuModule,
		DragDropModule,
		AngularEditorModule,
		MatSelectModule,
		FontAwesomeModule,
		BrowserAnimationsModule
	],
	exports	 : [
		DocumentComponent
	]
})

export class DocumentModule
{
}
