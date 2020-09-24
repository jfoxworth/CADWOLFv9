
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
import { MatButtonToggleModule } from '@angular/material/button-toggle';


// Components
import { BranchesComponent } from './branches.component';
import { BranchComponent } from './branch/branch.component';
import { FileComponent } from './file/file.component';


// Services



// Material Imports


const routes = [

	{
		path: 'branches/:fileId',
		component: BranchesComponent,
	},

	{
		path: 'Branches/:fileId',
		component: BranchesComponent,
	}



];

@NgModule({
	declarations: [
		BranchesComponent,
		BranchComponent,
		FileComponent,
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
		MatButtonToggleModule,
	],
	exports	 : [
		BranchesComponent
	]
})

export class BranchesModule
{
}
