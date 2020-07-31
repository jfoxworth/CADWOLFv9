
// Standard angular items
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Fuse specific items
import { FuseSharedModule } from '@fuse/shared.module';


// Components
import { TeamsComponent } from './teams.component';


// Services



// Material Items
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


const routes = [
    {
        path     : 'teams',
        component: TeamsComponent
    }
];

@NgModule({
    declarations: [
        TeamsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,

        MatButtonModule,
        MatInputModule,
        MatIconModule,

    ],
    exports     : [
        TeamsComponent
    ]
})

export class TeamsModule
{
}
