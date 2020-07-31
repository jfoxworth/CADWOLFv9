
// Standard angular items
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Fuse specific items
import { FuseSharedModule } from '@fuse/shared.module';


// Material Items
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



// Components
import { ProfileComponent } from './profile.component';


// Services



// Material Imports


const routes = [
    {
        path     : 'profile',
        component: ProfileComponent
    },
    {
        path     : 'profile/:id',
        component: ProfileComponent,
    }
];

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,

        MatButtonModule,
        MatInputModule,
        MatIconModule,
    ],
    exports     : [
        ProfileComponent
    ]
})

export class ProfileModule
{
}
