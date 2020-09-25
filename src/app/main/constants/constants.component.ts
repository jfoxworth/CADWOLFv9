
// Standard angular items
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

// RXJS itemss
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


// Models
import { Constant } from 'app/main/models/constants';


// Services
import { ConstantsService } from 'app/main/services/constants.service';


@Component({
    selector: 'constants',
    templateUrl: './constants.component.html',
    styleUrls: ['./constants.component.scss']
})
export class ConstantsComponent implements OnInit, OnDestroy
{

	constants : Constant[];
    private _unsubscribeAll: Subject<any>;


	constructor(
        private ConstantsService: ConstantsService,
        private titleService: Title
  	) 
	{        
        this._unsubscribeAll = new Subject();        
    }




    // -----------------------------------------------------------------------------------------------------
    //
    // @ LIFE CYCLE HOOKS
    //
    // -----------------------------------------------------------------------------------------------------

	ngOnInit(): void {

        // Set the title
		this.titleService.setTitle( 'Constants in Cadwolf' );

        // Subscribe to the observable data
        this.subscribeToData();
	}


	ngOnDestroy():void {

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

  	}	




    // -----------------------------------------------------------------------------------------------------
    //
    // @ FUNCTIONS
    //
    // -----------------------------------------------------------------------------------------------------


    // -----------------------------------------------------------------------------------------------------
    //
    // @ FUNCTIONS TO SUBSCRIBE TO DATA
    //
    // -----------------------------------------------------------------------------------------------------

    subscribeToData()
    {
        // This is a one time get for the constants. It is not an observable
        this.ConstantsService.constantsStatus
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((constants)=>{this.constants = constants;});

    }




}
