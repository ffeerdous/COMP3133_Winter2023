import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpacexapiServiceService } from '../network/spacexapi-service.service';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissionDetailsComponent implements OnInit {
  
  mission: Mission | undefined;

  constructor(private spacexapiService: SpacexapiServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const flightNumber = Number(this.route.snapshot.paramMap.get('flight_number'));
    this.spacexapiService.getMissions().subscribe(data => {
      this.mission = data.find((mission) => mission.flight_number === flightNumber);
    });
  }
}
