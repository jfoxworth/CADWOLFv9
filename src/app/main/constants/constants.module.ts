
// Standard angular items
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Fuse specific items
import { FuseSharedModule } from '@fuse/shared.module';


// Components
import { ConstantsComponent } from './constants.component';


// Services



// Material Imports


const routes = [
    {
        path     : 'constants',
        component: ConstantsComponent
    }
];

@NgModule({
    declarations: [
        ConstantsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ],
    exports     : [
        ConstantsComponent
    ]
})

export class ConstantsModule
{
}
