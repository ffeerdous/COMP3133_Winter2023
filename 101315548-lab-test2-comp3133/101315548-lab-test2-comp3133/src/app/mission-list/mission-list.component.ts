import { Component, OnInit } from '@angular/core';
import { Mission } from '../models/mission';
import { SpacexapiServiceService } from '../network/spacexapi-service.service';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css']
})
export class MissionListComponent implements OnInit {

  missions: Mission[] = [];
  launchYear: string = '';

  constructor(private missionService: SpacexapiServiceService) { }

  ngOnInit(): void {
    this.missionService.getMissions().subscribe((missions: Mission[]) => {
      this.missions = missions;
    });
  }

  // Filter
  get missionfilter() {
    if (this.launchYear.trim() === '') {
      return this.missions;
    } else {
      return this.missionService.filterMissionsByLaunchYear(this.missions, this.launchYear);
    }
  }
}