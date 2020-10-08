
// Standard angular items
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Fuse specific items
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { fuseConfig } from 'app/fuse-config';



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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';


// Text editor
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



// Components
import { DocumentComponent } from './document.component';
import { TextComponent } from './components/text/text.component';
import { PropertiesComponent } from './settings/properties/properties.component';
import { SettingsComponent } from './settings/settings.component';
import { WidthmarginComponent } from './edititem/widthmargin/widthmargin.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowHideComponent } from './settings/show-hide/show-hide.component';
import { TocComponent } from './settings/toc/toc.component';
import { BibliographyComponent } from './settings/bibliography/bibliography.component';
import { HeadersComponent } from './components/headers/headers.component';
import { EquationsComponent } from './components/equations/equations.component';
import { EdititemComponent } from './edititem/edititem.component';


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
		ShowHideComponent,
		TocComponent,
		BibliographyComponent,
		HeadersComponent,
		EquationsComponent,
		EdititemComponent,
	],
	imports	 : [
		RouterModule.forChild(routes),
		FuseSharedModule,
		FuseModule.forRoot(fuseConfig),

		MatButtonModule,
		MatInputModule,
		MatIconModule,
		MatListModule,
		MatTooltipModule,
		MatRadioModule,
		MatFormFieldModule,
		MatMenuModule,
		MatCheckboxModule,
		MatTabsModule,
		DragDropModule,
		AngularEditorModule,
		MatSelectModule,
		FontAwesomeModule,
		FuseSidebarModule,
		FuseThemeOptionsModule,
		BrowserAnimationsModule
	],
	exports	 : [
		DocumentComponent
	]
})

export class DocumentModule
{
}
