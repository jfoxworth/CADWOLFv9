import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';


// Components
import { AppComponent } from 'app/app.component';

// Modules
import { LayoutModule } from 'app/layout/layout.module';
import { ProfileModule } from 'app/main/profile/profile.module';
import { ConstantsModule } from 'app/main/constants/constants.module';


// Firebase Items
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';


// Services
import { FirebaseService } from 'app/main/services/firebase.service';
import { ConstantsService } from 'app/main/services/constants.service';
import { UnitsService } from 'app/main/services/units.service';




const appRoutes: Routes = [
	{
		path	  : '**',
		redirectTo: 'profile'
	}
];

@NgModule({
	declarations: [
		AppComponent,
	],
	imports	 : [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		RouterModule.forRoot(appRoutes),

		TranslateModule.forRoot(),

		// Material moment date module
		MatMomentDateModule,

		// Material
		MatButtonModule,
		MatIconModule,

		// Fuse modules
		FuseModule.forRoot(fuseConfig),
		FuseProgressBarModule,
		FuseSharedModule,
		FuseSidebarModule,
		FuseThemeOptionsModule,

		// App modules
		LayoutModule,
		ProfileModule,
		ConstantsModule,

		// Firebase 
        AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFirestoreModule,
		AngularFireStorageModule

	],
    providers :[
        ConstantsService,
        UnitsService,
        FirebaseService,
    ],

	bootstrap   : [
		AppComponent
	]
})
export class AppModule
{
}
