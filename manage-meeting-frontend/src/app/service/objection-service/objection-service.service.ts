import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Meeting} from '../../model/meeting.model';
import {Observable} from 'rxjs';
import {Objection} from '../../model/objection.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectionService {
  private _objection_url = 'https://shakurbackend.herokuapp.com/api/v1/objections';

  constructor(private http: HttpClient) { }

  public deleteObjection(objection) {
    let username='shakur'
    let password='1234'
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.delete<Objection>(this._objection_url + '/' + objection.objectId, {headers});
  }
  public createObjection(objection) {
    let username= 'shakur'
    let password= '1234'

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post<Objection>(this._objection_url, objection, {headers});
  }
  public updateObjection(objectionId: string, objection) {
    let username= 'shakur'
    let password= '1234'

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.put<Objection>(this._objection_url+ '/' + objectionId, objection, {headers});
  }
  getAll(): Observable<any> {
    let username = 'shakur';
    let password = '1234';
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(this._objection_url, { headers });
  }

  getById(objectionId: string): Observable<any> {
    let username = 'shakur';
    let password = '1234';
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get<Objection>(this._objection_url + '/' + objectionId, {headers});
  }
}
