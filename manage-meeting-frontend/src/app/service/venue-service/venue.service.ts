import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Venue} from '../../model/venue.model';


@Injectable({
  providedIn: 'root'
})
export class VenueService {

  /*private baseUrl = 'localhost:8080/api/v1';*/

  private _venue_url = 'https://shakurbackend.herokuapp.com/api/v1/venues';

  constructor(private http: HttpClient) { }

  public deleteVenue(venue) {
    let username='shakur'
    let password='1234'
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.delete<Venue>(this._venue_url + '/' + venue.venueId, {headers});
  }
  public createVenue(venue) {
    let username= 'shakur'
    let password= '1234'

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post<Venue>(this._venue_url, venue, {headers});
  }
  public updateVenue(venueId: String, venue) {
    let username= 'shakur'
    let password= '1234'

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.put<Venue>(this._venue_url+ '/' + venueId, venue, {headers});
  }
  getAll(): Observable<any> {
    let username = 'shakur';
    let password = '1234';
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(this._venue_url, { headers });
  }

  getById(venueId: string): Observable<any> {
    let username = 'shakur';
    let password = '1234';
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get<Venue>(this._venue_url + '/' + venueId, {headers});
  }
}
