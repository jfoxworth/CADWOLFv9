
// Standard angular items
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

// Fuse specific items
import { FuseSharedModule } from '@fuse/shared.module';


// Components
import { ForgotPasswordComponent } from './forgotpassword.component';


// Services



// Material Imports


const routes = [
    {
        path     : 'forgotpassword',
        component: ForgotPasswordComponent
    }
];

@NgModule({
    declarations: [
        ForgotPasswordComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatFormFieldModule,
        MatIconModule
    ],
    exports     : [
        ForgotPasswordComponent
    ]
})

export class ForgotPasswordModule
{
}
