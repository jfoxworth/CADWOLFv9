
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
import { LogComponent } from './log.component';


// Services



// Material Imports


const routes = [
	{
		path	 : 'log',
		component: LogComponent
	},
	{
		path	 : 'log/:itemId',
		component: LogComponent,
	},
	{
		path	 : 'Log',
		component: LogComponent
	},
	{
		path	 : 'Log/:itemId',
		component: LogComponent,
	}
];

@NgModule({
	declarations: [
		LogComponent
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
		LogComponent
	]
})

export class LogModule
{
}
