
// Standard Angular items
import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

// Services
import { TeamsService } from 'app/main/services/teams.service';


// Models
import { Team } from 'app/main/models/team';
import { TeamMember } from 'app/main/models/teamMember';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

	userData : any;

	constructor(
        	private titleService	: Title,
        	public TeamsService 	: TeamsService
		) 
	{ 
	}

	ngOnInit(): void {

		// Get the user data
        this.userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

        // Set the title
		this.titleService.setTitle( 'Teams for user '+this.userData.userName );

	}

}
