
// Standard angular items
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Fuse specific items
import { FuseSharedModule } from '@fuse/shared.module';


// Components
import { TeamsComponent } from './teams.component';


// Services



// Material Imports


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
        FuseSharedModule
    ],
    exports     : [
        TeamsComponent
    ]
})

export class TeamsModule
{
}
