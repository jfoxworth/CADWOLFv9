
// Standard angular items
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Fuse specific items
import { FuseSharedModule } from '@fuse/shared.module';


// Components
import { TeamsComponent } from './teams.component';
import { TeamComponent } from './team/team.component';


// Services



// Material Items
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';

const routes = [
    {
        path     : 'teams',
        component: TeamsComponent
    },
    {
        path     : 'teams/:teamId/:teamSlug',
        component: TeamComponent,
        resolve  : {
        }
    }
];

@NgModule({
    declarations: [
        TeamsComponent,
        TeamComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,

        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatBadgeModule,
        MatTooltipModule,

    ],
    exports     : [
        TeamsComponent,
        TeamComponent
    ]
})

export class TeamsModule
{
}
