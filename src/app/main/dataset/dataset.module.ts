
// Standard angular items
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';



// Text editor
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



// Components
import { DatasetComponent } from './dataset.component';
import { SettingsComponent } from './settings/settings.component';
import { InputTextComponent } from './input-text/input-text.component';
import { ResultsComponent } from './results/results.component';







const routes = [

    {
        path: 'dataset',
//      runGuardsAndResolvers: 'always',
        children: [
            { path: '**', component: DatasetComponent },
        ]
    },

    {
        path: 'Dataset',
        children: [
            { path: '**', component: DatasetComponent },
        ]
    },

    {
        path: 'datasetId/:datasetId',
        component: DatasetComponent,
    },

    {
        path: 'DatasetId/:datasetId',
        component: DatasetComponent,
    }



];

@NgModule({
    declarations: [
        DatasetComponent,
        SettingsComponent,
        InputTextComponent,
        ResultsComponent,
    ],
    imports  : [
        RouterModule.forChild(routes),
        FuseSharedModule,

        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        MatTooltipModule,
        MatRadioModule,
        MatFormFieldModule,
        MatMenuModule,
        DragDropModule,
        AngularEditorModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatTabsModule,
        FontAwesomeModule,
        BrowserAnimationsModule
    ],
    exports  : [
        DatasetComponent
    ]
})

export class DatasetModule
{
}
