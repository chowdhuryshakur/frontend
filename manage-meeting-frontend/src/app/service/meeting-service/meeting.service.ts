import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Employee} from '../../model/employee.model';
import {Observable} from 'rxjs';
import {Meeting} from '../../model/meeting.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private _meeting_url = 'https://shakurbackend.herokuapp.com/api/v1/meetings';

  constructor(private http: HttpClient) { }

  public deleteMeeting(meeting) {
    let username='shakur'
    let password='1234'
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.delete<Meeting>(this._meeting_url + '/' + meeting.meetingId, {headers});
  }
  public createMeeting(meeting) {
    let username= 'shakur'
    let password= '1234'

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post<Meeting>(this._meeting_url, meeting, {headers});
  }
  public updateMeeting(meetingId: String, meeting) {
    let username= 'shakur'
    let password= '1234'

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.put<Meeting>(this._meeting_url+ '/' + meetingId, meeting, {headers});
  }
  getAll(): Observable<any> {
    let username = 'shakur';
    let password = '1234';
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(this._meeting_url, { headers });
  }

  getById(meetingId: string): Observable<any> {
    let username = 'shakur';
    let password = '1234';
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get<Meeting>(this._meeting_url + '/' + meetingId, {headers});
  }
}
