
// Standard angular items
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Fuse specific items
import { FuseSharedModule } from '@fuse/shared.module';


// Components
import { UnitsComponent } from './units.component';


// Services



// Material Imports


const routes = [
    {
        path     : 'units',
        component: UnitsComponent
    }
];

@NgModule({
    declarations: [
        UnitsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ],
    exports     : [
        UnitsComponent
    ]
})

export class UnitsModule
{
}
