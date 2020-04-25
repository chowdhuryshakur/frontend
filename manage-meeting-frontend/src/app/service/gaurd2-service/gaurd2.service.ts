import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AppService} from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class Gaurd2Service implements CanActivate {

  constructor(private router: Router,
              private appservice: AppService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.appservice.isAdminLoggedIn())
         return true;

    this.router.navigate(['user/invited-meeting']);
    return false;
  }
}
