

// Standard Angular Components
import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';



// Material Items
import { MatSnackBar } from '@angular/material/snack-bar';



// RXJS items
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';


// Services
import { ProfileService } from 'app/main/services/profile.service';
import { UserService } from 'app/main/services/user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';



@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	userData 		: any;
	displayStatus  	: string 	=  'view';
	userId 			: string;
	profileData 	: any 		= {};
	profileImage 	: any;
    private _unsubscribeAll: Subject<any>;


	constructor(
        private ProfileService	: ProfileService,
        private UserService		: UserService,
		private route 			: ActivatedRoute,
        private titleService	: Title,
        private afStorage 		: AngularFireStorage,
        private afs 			: AngularFirestore,
//        private SnackBar 		: MatSnackBar,
  	) 
	{		
        this._unsubscribeAll = new Subject();        
	}



	ngOnInit(): void {

        // This is a one time get for the constants. It is not an observable
        this.ProfileService.profileStatus
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((profileData)=>{
            	this.profileData = profileData;
				this.profileImage = this.UserService.getProfileImage( profileData );
		    });


		// Set the user data
        this.userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

        // Set the title
		this.titleService.setTitle( 'Profile for CADWOLF User '+this.userData.userName );

		// Get id from URL
		this.userId = this.route.snapshot.paramMap.get('id');

		// Determine if view status
		this.displayStatus = this.ProfileService.checkUserViewerStatus(this.userId);

		// Determine if user info to be displayed
		this.ProfileService.setProfileData(this.userId);


	}



	ngOnDestroy():void {

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

  	}	





  	/*
  	*
  	*
  	*
  	*	PUBLIC FUNCTIONS
  	*
  	*
  	*
  	*/



  	/**
  	*
  	*	When a profile icon is uploaded
  	*
  	**/
	onUpload(event) {


		// Grab the background image
		const file = event.target.files[0];
		console.log('The target is ...');
		console.log(event.target.files);

		var imageType = file.type.replace('image/','');
		var path = '/profile/'+this.profileData.uid+'.'+imageType;			


		// Get URL
		const ref = this.afStorage.ref(path);

		// Store image type
		this.profileData.imageType = imageType;
		this.saveChanges();

		// Upload file and subscribe to results
		const task = this.afStorage.upload(path, event.target.files[0]);
		task.snapshotChanges().pipe(
        	finalize(() => this.profileImage = ref.getDownloadURL()) 
    	 )
    	.subscribe()

    	setTimeout(()=>{ this.ProfileService.updateProfileImages(this.profileData); }, 1000);

  	}





	/**
	*
	* When the data needs to be saved
	*
	**/
	saveChanges():void{


		console.log('Saving user data '+this.profileData.uid);
		var docRef = this.afs.collection('users').doc(this.profileData.uid);
		docRef.update(this.profileData);
		this.userData = this.profileData;
//		this.SnackBar.open('Data Saved','', {duration: 4000});
		localStorage.setItem('cadwolfUserData', JSON.stringify(this.userData));


	}




}
