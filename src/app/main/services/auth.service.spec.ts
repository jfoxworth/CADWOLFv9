
// Testing Stuff
import { TestBed } from '@angular/core/testing';


// Standard Angular Items
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";


// Models
import { User } from "app/main/models/users";


// Services
import { AuthService } from './auth.service';
import { ProfileService } from './profile.service';
import { mockItems } from 'app/main/services/mockItems';


// Firebase
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';


// Mocks
import { mockRouteService } from 'app/main/services/mocks/mockRouteService';
import { mockFirestore } from 'app/main/services/mocks/mockFirestore';
import { mockFirestorage } from 'app/main/services/mocks/mockFirestorage';
import { mockFireAuth } from 'app/main/services/mocks/mockFireAuth';



describe('AuthService', () => {
	let service: AuthService;

	// Mock items unique to this page
	let router : Router;
	let NgZone : NgZone;

	let MockGroup = new mockFirestore();
	const mockFirestoreService = MockGroup.mockFirestoreStub();

	let MockGroupFirestorage = new mockFirestorage();
	const mockFirestorageService = MockGroupFirestorage.mockFirestorageStub();

	let MockGroupFireAuth = new mockFireAuth();
	const mockFireAuthService = MockGroupFireAuth.mockFireAuthStub();

	let MockGroupRoutes = new mockRouteService();
	const mockRouteServ = MockGroupRoutes.AuthRouteStub();



	beforeEach(() => {

		TestBed.configureTestingModule({
			providers: [ { provide : AngularFirestore, 	useValue : mockFirestoreService },
						 { provide : AngularFireAuth, 	useValue : mockFireAuthService }, 
						 { provide : Router, 			useValue : mockRouteServ },
						 { provide : NgZone, 			useValue : NgZone },
						 { provide : ProfileService, 	useValue : {} } ]
		});

		service = TestBed.inject(AuthService);
	});






	it('should be created - auth service', () => {
		expect(service).toBeTruthy();
	});



});

