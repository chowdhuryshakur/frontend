import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ROUTES, UserROUTES} from '../components/sidebar/sidebar.component';

export class User {
  constructor(
    public status: string,
  ) {}
}

@Injectable({providedIn : 'root'})
export class AppService {
 private rrole = '';
  constructor(private http: HttpClient) {
  }

  authenticate(username, password) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get<User>('https://shakurbackend.herokuapp.com/api/v1/employees/validateLogin', {headers}).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('password', password);
          return userData;
        }));
    }
  getRole(): any {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get('https://shakurbackend.herokuapp.com/api/v1/employees/role', {headers , responseType: 'text'})
  }
  getUser() {
    const user = sessionStorage.getItem('username');
   return user;
  }
  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    return !(user === null);
  }
  isAdminLoggedIn() {
    this.getRole().subscribe(r =>  this.rrole = r);
    return (this.rrole === 'ADMIN');
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
  }

}
