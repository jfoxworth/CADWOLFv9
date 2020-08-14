
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



// Components
import { WorkspaceComponent } from './workspace.component';


// Services



// Material Imports


const routes = [
	{
		path	 : 'workspace',
		component: WorkspaceComponent
	},
	{
		path	 : 'workspace/:workspacePath',
		component: WorkspaceComponent,
	}
];

@NgModule({
	declarations: [
		WorkspaceComponent
	],
	imports	 : [
		RouterModule.forChild(routes),
		FuseSharedModule,

		MatButtonModule,
		MatInputModule,
		MatIconModule,
		MatListModule,
		MatTooltipModule,
	],
	exports	 : [
		WorkspaceComponent
	]
})

export class WorkspaceModule
{
}
