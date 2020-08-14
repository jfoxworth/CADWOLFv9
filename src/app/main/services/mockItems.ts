
import { Observable } from "rxjs/Observable"
import { of } from 'rxjs';


export class mockItems {


    constructor() {}


    // Stub for the Angular Fire
    public AngularFireStub() {

        return { getDocsByUserId: (_d: any, _id:any) => new Promise((resolve, _reject) => resolve({data:()=>{}})),

        		 getDocById: (_d: any, _id:any) => new Promise((resolve, _reject) => resolve({data:()=>{ return this.FireStubData(_d, _id)}})),

        		 //getDocsByParam: (_d: any, _id:any, num:any) => new Observable((observer) => {'Me'}) }
        		 
        		 getDocsByParam: (_d: any, _id:any, num:any) => of(this.mockStoreData(_d)),

        		 getDocsByParamWithOrder: (_d: any, _id:any, num:any, order:any) => of(this.mockStoreData(_d)),

        		 getCollectionTwoParams: (imp1: any, imp2:any, uid:any, param:any, id:any) => of(this.mockCollectionData(imp1, imp2, uid, param, id)),

        		 updateDocDataUsingId: ()=>{},

        		 collection:()=> { valuesChanges : (imp1: any, imp2:any, imp3:any, imp4:any) => of(this.mockCollectionData(imp1, imp2, imp3, imp4, '')) },

        }
    }


    public mockCollectionData(database, param1, value1, param2, value2){

    	if ( database == 'projects')
    	{
    		return [
    			{

		            'id'      : '154588a0864d2881124',
					data : ()=>{ return {
					'uid' 	  : '1',
		            'id'      : '154588a0864d2881124',
		            'title'   : 'Fossil Wall',
		            'slug'    : 'fossil-wall',
		            'name'	  : 'test',
		            'versions':[]
		     	   		}
		     		}

    			}
    		]

    		
    	}

    }



    public FireStubData(database, id){

    	if ( database == 'versions')
    	{
	    	return { 	'creatorId': "mmAvAdd1GlgBebdV85OVRE1CSK43",
						'dateCreated': 1591842018832,
						'deposit': 4465,
						'description': "This was an update after speaking with the customer",
						'designId': "jBRzSildNc16fQjAmLkh",
						'initialOpen': false,
						'latest': true,
						'measurements': [],
						'name': "Second Version",
						'price': 16500,
						'projectId': "MKya93yYzkdKARwIwfz9",
						'tax': 1361,
						'totalCost': 17861,
						'uid': "1wdiyJc3OyZQ2a7F47G6",
						'values':{
							'Bench Depth': 30,
							'Bench Height': 20,
							'Left Planter': "0",
							'Left Seating Length': 1,
							'RIGHT SEATING LENGTH': 6,
							'Right Planter': "0",
							'Right Seating Length': 8,
							'Twist Length': 2,
						 }
					}
		}

		if ( database == 'designs')
		{
			return {
						'category': "Seating",
						'company': {
							'id': 1,
							'location': "Houston, Texas",
							'logo': "https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png",
							'name': "MAK Studio"},
						'companyId': 1,
						'designerId': "mmAvAdd1GlgBebdV85OVRE1CSK43",
						'designers': {
							'mmAvAdd1GlgBebdV85OVRE1CSK43': true
							},
						'id': "IrcvJwPAs612",
						'initialPrice': "10000",
						'marketplace': {
							'description': "This bench has two seating areas with a twisting section connecting them. The width and depth of the bench can be set as well as the length of each seating area and the length of the twisting section. There can also be a planter in the seating section.",
							'images': [
								{ 'mainImage': false, 'path': "/marketplace/carousel/jBRzSildNc16fQjAmLkh-Kb5JT6.png"},
								{ 'path': "/marketplace/carousel/jBRzSildNc16fQjAmLkh-Gn40cg.jpeg", 'mainImage': true} ],
							'mainBgImage': "jBRzSildNc16fQjAmLkh.jpeg",
							'mainImage': "https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png",
						},
						'price': 4500,
						'priceFormula': "(Left Seating Length+Twist Length+Right Seating Length)*1500",
						'priceShowForm': "",
						'priceStatus': false,
						'priceString': "(1+1+1)*1500",
						'priceValid': true,
						'pricingModel': "",
						'shapediverTicket': "ccf330f694285fa526a47387edbd0a89e09146369e7b730dbf57fa6354146b1df5390f267e9fe942b42e7571084e91c912c272ff2b7609aed88e123dfd2718afeb773039caed2580fc03c3d0d629a26da06f34f54bc0b3731a19d16c790bd4656b5dad94fd5572642398bc694aaf42b03957e44bbb44-9bc6005b71d9578337b4509851c32a30",
						'slug': "",
						'status': 1,
						'test': true,
						'title': "Planter Bench",
						'uid': "jBRzSildNc16fQjAmLkh",
						'visibility': "private"
					}
		}

		if ( database == 'users')
		{

			if ( id == 0 )
			{
				return {
							'uid' : 0,
							'designer' : false,
							'email' : 'jfoxworth@cadwolf.com',
							'displayName' : 'the wolf',
							'title' : 'CEO / Hero',
							'shortBio' : 'This is the short bio',
							'website' : ''
						}
			}

			if ( id == 1 )
			{
				return {
							'uid' : 1,
							'designer' : true,
							'email' : 'jfoxworth@cadwolf.com',
							'displayName' : 'the wolf',
							'title' : 'CEO / Hero',
							'shortBio' : 'This is the short bio',
							'website' : ''
						}
			}
		}

    }



    // Stub for the Angular Fire Storage
    public AngularFireStorageStub() {
    	class afsStub {
        	ref(_d: any) {
        		 	return { getDownloadURL : (_d: any) => new Observable((observer) => {'Me'}) }
        	}

    	}
    	return new afsStub()
    }		



    // Stub for the dialog ref
    public DialogRefStub() {
    	return {
	    	close: jasmine.createSpy('close'),
	    	open: jasmine.createSpy('open')
	    }
	};


	// Stub for the dialog
	public mockDialog() {
		return {
			close: jasmine.createSpy('close'),
	    	open: jasmine.createSpy('open'),
	    	Overlay : jasmine.createSpy('Overlay')
	    }
	};


	// Stub for the snack bar
	public mockSnackBar() {
    	return { 
    		Overlay : jasmine.createSpy('Overlay'),
    		open : ()=>{},
    		close : ()=>{}
    	}
	}


	// Data Object used in parameter-dialog
	public mockParameterDialog() {
		return {
				'i' : 0,
				'j' : 0,
				'currentDesign' : {
					'parameterMenus' : [
						{ 'parameters' : [{'type':'slider'}] }
					]
				}
		}
	}







	// Data Object used in document-dialog
	public mockDocumentDialog() {
		return {
			'querySelectorAll' : ()=>{}
		}
	}


	// Data Object for activated route stub
	public ActivatedRouteStub() {
		return { 'snapshot': {
	                'url': [{ 'path': 1 }, { 'path': 2 }],
	                'paramMap' : {
	                	'get' : ()=>{ return '1'},
	                	'set' : ()=>{},
	                }
	            }
	        
		}
	}



	// Data Object for activated route stub
	public ActivatedRouteEmptyStub() {
		return { 'snapshot': {
	                'url': [{ 'path': 1 }, { 'path': 2 }],
	                'paramMap' : {
	                	'get' : ()=>{ return undefined},
	                	'set' : ()=>{},
	                }
	            }
	        
		}
	}




	// Stub for Route
	public RouteStub() {
		return { 'snapshot': {
	                'url': [{ 'path': 1 }, { 'path': 2 }],
	                'paramMap' : {
	                	'get' : ()=>{},
	                	'set' : ()=>{},
	                }
	            }
	        
		}
	}





	// Stub for Auth Service
	public AngularAuthStub() {
		return { 'authState': 
					{
				 		'subscribe' : ()=>{}
				 	}
				}
	}






	// Data Object for design data
	public designDataStub() {
		return { 'parameterMenus' : 
				[
					{'parameters' : [] }
				],
				'menuShow' : [],
				'menuLocations' : [ [] ]
			 
	            
	        
		}
	}



	// Data Object for version List
	public versionListStub() {
		return [] 
	           
	}




	// Data Object for version data
	public versionDataStub() {
		return { 
	            
	        
		}
	}





	// Data Object for user data
	public userDataStub() {
		return { 
	            
	        
		}
	}






	// Data Object for user data
	public mockUserData() {
		return { 
	            
	        
		}
	}





	// Data Object for user data
	public UserServiceStub() {
		return { 
			'uid' : 'mmAvAdd1GlgBebdV85OVRE1CSK43',
			'getYearList' : ()=>{},
			'getMonthList' : ()=>{},
			'getProfileImage' : ()=>{}
	        
		}
	}



	public EcommerceServiceStub() {
		return {
			getProducts: (_d: any, _id:any) => new Promise((resolve, _reject) => resolve({data:()=>{return this.projectStubData()}})),
			getProductStages: ()=>{},
			getInitialStageStatus: ()=>{},
			getInitialSelectedStatus: ()=>{},
			getStageTexts:()=>{}
		}

	}



	public projectStubData(){

		return  [
			{
				'creatorId' : 'mmAvAdd1GlgBebdV85OVRE1CSK43',
				'dateCreated' : '1592015010813',
				'description' : "This is the description of this project",
				'designId' : "5W0vbMqd9j3cYeW5V82Y",
				'designType' : "Island",
				'initialOpen' : false,
				'name' : "Sanitizer 1",
				'status' : "0",
				'uid' : "1ryfv7hw4JzJF072YI2d",
				'versions' : '1'
	        }
	    ]
	}
	

	public MarketplaceServiceStub() {
		return {}

	}



	public mockEcommerceProductService() {
		return {}

	}


	public mockEcommerceProductsService() {
		return {}

	}



	public FaqServiceStub() {
		return {}

	}


	public mockChatService() {
		return {
				'onRightSidenavViewChanged' : {
					'pipe' : (_d: any) => new Observable((observer) => {})
				},
				'onChatSelected' : {
					'pipe' : (_d: any) => new Observable((observer) => {})
				},
				'onLeftSidenavViewChanged' : {
					'pipe' : (_d: any) => new Observable((observer) => {})
				},
				'onContactSelected' : {
					'pipe' : (_d: any) => new Observable((observer) => {})
				},
				'onChatsUpdated' : {
					'pipe' : (_d: any) => new Observable((observer) => {})
				},
				'onUserUpdated' : {
					'pipe' : (_d: any) => new Observable((observer) => {})
				},
				'selectedChatIndex' :  new Observable((observer) => {}),
				'conversations' :  new Observable((observer) => {}),
				'conversationStatus' : new Observable((observer) => {}),
				'dataFlagStatus' : new Observable((observer) => {}),
				'contactStatus' : new Observable((observer) => {}),				
				
		}
	}




	public mockKnowledgeBase() {
		return {
				'onKnowledgeBaseChanged' : {
					'pipe' : (_d: any) => new Observable((observer) => {}),
				}
				
		}
	}



	public mockDesignData() {
		return {
					'parameterMenus' : [ {
											'parameters' : [ {
																'images' : [] 
															  }
															] 
										 } 
										],
					'versionList' : []
		}
	}






	public mockStoreData(type){

		if ( type =="projects" )
		{
			return  [
				{

		            'id'      : '154588a0864d2881124',
					data : ()=>{ return {
					'uid' 	  : '1',
		            'id'      : '154588a0864d2881124',
		            'title'   : 'Fossil Wall',
		            'slug'    : 'fossil-wall',
		            'name'	  : 'test',
		            'versions':[]
		     	   		}
		     		}
		     	}
		    ]

		}else
		{
			return  [
				{

		            'id'      : '154588a0864d2881124',
					data : ()=>{ return {
					'uid' 	  : '1',
		            'id'      : '154588a0864d2881124',
		            'title'   : 'Fossil Wall',
		            'slug'    : 'fossil-wall',
		            'category': 'Wall',
		            'length'  : 60,
		            'updated' : 'Nov 01, 2017',
		            'date_created' : 'July 5, 2020',
		            'initialPrice' : 3150,
		            'background' : 'https://makstudio.s3.us-east-2.amazonaws.com/Products+-+Feature+Wall/flower_solid_surface_feature_wall.jpg',
		            'description' : 'lorem ipsum free text here',
		            'company' : {
		            	'name' : 'MAK Studio',
		            	'location' : 'Houston, Texas',
		            	'logo' : 'https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png'
		            },
		            'images' : [
		            	"https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png"
		            ],
		            'marketplace' : {
		            	'description' : "The flower wall lets customers place, move, and alter the size and orientation of flowers on a wall.",
		            	'mainImage' : "https://makstudio.s3.us-east-2.amazonaws.com/Marketplace/background/001.png",
		            	'images' : [
		            		{
		            			'mainImage' : true,
		            			'path' : "/marketplace/carousel/1pbM0lb5hcHureiiX239-shh6E4.png"
		            		}
		            	]
		            },
		            'parameterMenus' : [
		            	{
		            		'icon' : "settings",
		            		'label' : 'Wall Dimensions',
		            		'parameters' : [

		            		]
		            	}
		            ],
		            'price':0,
		            'priceFormula' : '',
		            'priceStatus' : true,
		            'priceValid' : true,
		            'shapediverTicket' : '',
		            'status' : 1 } }
				},
				{
		            'id'      : 'fm3oif93hfiuf3u3iihg',
					data : ()=>{ return {
					'uid' 	  : '2',
		            'id'      : 'fm3oif93hfiuf3u3iihg',
		            'title'   : 'Planter Bench',
		            'slug'    : 'planter-bench',
		            'category': 'Seating',
		            'length'  : 60,
		            'updated' : 'Nov 01, 2017',
		            'date_created' : 'July 5, 2020',
		            'initialPrice' : 3150,
		            'background' : 'https://makstudio.s3.us-east-2.amazonaws.com/Products+-+Lobby+Seating/parametric_lobby_bench_seating.jpg',
		            'description' : 'The MAK Studio planter bench adds a stylish seating element to any lobby or reception area. Customers can adjust the depth of the bench, the length of each side, the length of the twist area, and the depths of the planters areas on each side.',
		            'company' : {
		            	'name' : 'MAK Studio',
		            	'location' : 'Houston, Texas',
		            	'logo' : 'https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png'
		            },
		            'images' : [
		            	"https://makstudio.s3.us-east-2.amazonaws.com/ProductImages/Screen+Shot+2020-04-15+at+5.28.57+PM.png",
		            	"https://makstudio.s3.us-east-2.amazonaws.com/Products+-+Lobby+Seating/parametric_lobby_bench_seating.jpg",
		            	"https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png"
		            ],
		            'marketplace' : {
		            	'description' : "The flower wall lets customers place, move, and alter the size and orientation of flowers on a wall.",
		            	'mainImage' : "https://makstudio.s3.us-east-2.amazonaws.com/Marketplace/background/001.png",
		            	'images' : [
		            		{
		            			'mainImage' : true,
		            			'path' : "/marketplace/carousel/1pbM0lb5hcHureiiX239-shh6E4.png"
		            		}
		            	]
		            },
		            'parameterMenus' : [
		            	{
		            		'icon' : "settings",
		            		'label' : 'Wall Dimensions',
		            		'parameters' : [

		            		]
		            	}
		            ],
		            'price':0,
		            'priceFormula' : '',
		            'priceStatus' : true,
		            'priceValid' : true,
		            'shapediverTicket' : '',
		            'status' : 1 } }
				}

			];
		}


	}





    // Stub for the Fuse Navication
    public FuseNavigationStub() {
    	class navStub {
        	ref(_d: any) {
        		 	return { getDownloadURL : (_d: any) => new Observable((observer) => {'Me'}) }
        	}
        	getFlatNavigation(){ return {} }

    	}
    	return new navStub()
    }		




}











