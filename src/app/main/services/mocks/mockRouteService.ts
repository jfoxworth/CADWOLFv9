
import { Observable } from "rxjs/Observable"
import { of } from 'rxjs';


export class mockRouteService {


	constructor() {}


	// Stub for the Angular Fire
	public mockRouteService() {

		return { 
//					snapshot: { paramMap:() => new Observable((observer) => {'Me'}) }
					snapshot: { paramMap: { get: () => new Observable((observer) => {'Me'}) } }

		}
	}


	// Data Object for activated route stub
	public AuthRouteStub() {
		return { 'snapshot': {
	                'url': [{ 'path': 1 }, { 'path': 2 }],
	                'paramMap' : {
	                	'get' : ()=>{ return '1'},
	                	'set' : ()=>{},
	                }
	            }
	        
		}
	}






}

