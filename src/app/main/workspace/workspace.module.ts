
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


// Components
import { WorkspaceComponent } from './workspace.component';
import { EditListComponent } from './views/edit-list/edit-list.component';
import { EditPropertiesComponent } from './views/edit-list/edit-properties/edit-properties.component';
import { ViewListComponent } from './views/view-list/view-list.component';
import { EditPermissionsComponent } from './views/edit-list/edit-permissions/edit-permissions.component';
import { MoveItemComponent } from './views/edit-list/move-item/move-item.component';
import { CopyItemComponent } from './views/edit-list/copy-item/copy-item.component';


// Services



// Material Imports


const routes = [
/*
	{
		path	 : 'workspace',
		component: WorkspaceComponent
	},
	{
		path	 : 'workspace/:workspacePath',
		component: WorkspaceComponent,
	},
	{
		path	 : 'Workspace',
		component: WorkspaceComponent
	},
	{
		path	 : 'Workspace/:workspacePath',
		component: WorkspaceComponent,
	},
*/

	{
		path: 'workspace',
//		runGuardsAndResolvers: 'always',
		children: [
			{ path: '**', component: WorkspaceComponent },
		]
	},

	{
		path: 'Workspace',
		children: [
			{ path: '**', component: WorkspaceComponent },
		]
	},



	{
		path: 'workspaceId/:workspaceId',
		component: WorkspaceComponent,
	},

	{
		path: 'WorkspaceId/:workspaceId',
		component: WorkspaceComponent,
	}



];

@NgModule({
	declarations: [
		WorkspaceComponent,
		EditListComponent,
		EditPropertiesComponent,
		ViewListComponent,
		EditPermissionsComponent,
		MoveItemComponent,
		CopyItemComponent
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
	],
	exports	 : [
		WorkspaceComponent
	]
})

export class WorkspaceModule
{
}
