import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from 'app/main/models/constants';


// Services
import { ConstantsService } from 'app/main/services/constants.service';


@Component({
  selector: 'app-constants',
  templateUrl: './constants.component.html',
  styleUrls: ['./constants.component.scss']
})
export class ConstantsComponent implements OnInit {

	constants : Constant[];

	constructor(
        private ConstantsService: ConstantsService,
  	) 
	{}





	ngOnInit(): void {

  		this.ConstantsService.getConstants()
  			.subscribe(result => {

	            var tempArray = [];
	            var docData;
	            result.forEach((doc) => {
	                docData=doc.data();
	                docData.uid=doc.id;
	                docData.base = JSON.parse(docData.base);
	                //console.log(doc.id, '=>', doc.data());
	                tempArray.push(docData);
	            });
				this.constants = tempArray;

				console.log('The constants are ...');
				console.log(this.constants);

        });


	}

}
