
// Standard angular items
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

// Fuse specific items
import { FuseSharedModule } from '@fuse/shared.module';


// Components
import { ResetPasswordComponent } from './resetpassword.component';


// Services



// Material Imports


const routes = [
    {
        path     : 'resetpassword',
        component: ResetPasswordComponent
    }
];

@NgModule({
    declarations: [
        ResetPasswordComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatFormFieldModule,
        MatIconModule 
    ],
    exports     : [
        ResetPasswordComponent
    ]
})

export class ResetPasswordModule
{
}
