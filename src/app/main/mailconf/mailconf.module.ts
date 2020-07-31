
// Standard angular items
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


// Fuse specific items
import { FuseSharedModule } from '@fuse/shared.module';


// Components
import { MailConfirmComponent } from './mailconf.component';


// Services



// Material Imports


const routes = [
    {
        path     : 'mail-confirm',
        component: MailConfirmComponent
    }
];

@NgModule({
    declarations: [
        MailConfirmComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatFormFieldModule,
        MatIconModule
    ],
    exports     : [
        MailConfirmComponent
    ]
})

export class MailConfModule
{
}
