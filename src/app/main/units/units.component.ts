
// Standard angular items
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


// RXJS itemss
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


// Models
import { Unit } from 'app/main/models/units';


// Services
import { UnitsService } from 'app/main/services/units.service';


@Component({
  selector: 'units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit, OnDestroy
{

	units : Unit[];
	private _unsubscribeAll: Subject<any>;



	constructor(
		private UnitsService: UnitsService,
		private titleService: Title
  	) 
	{
		this._unsubscribeAll = new Subject();		
	}



	ngOnInit(): void {


		this.titleService.setTitle( 'Units in Cadwolf' );

		// This is a one time get for the constants. It is not recurring Observable
		this.UnitsService.unitsStatus
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((units)=>{this.units = units;});

	}


	ngOnDestroy():void {

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

  	}	

}


