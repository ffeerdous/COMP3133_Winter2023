import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class SpacexapiServiceService {

  private apiURL = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) { }

  // gets all the missions
  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.apiURL);
  }

  //filter mission by year
  filterMissionsByLaunchYear(missions: Mission[], launchYear: string): Mission[] {
    return missions.filter((mission) => mission.launch_year === launchYear);
  }

  // gets mission details
  getMissionByFlightNumber(flightNumber: string): Observable<Mission> {
    const url = `${this.apiURL}/${flightNumber}`;
    return this.http.get<Mission>(url);
  }
}