import { Component, OnInit } from '@angular/core';
import {AddVenueComponent} from '../../add-venue/add-venue.component';
import {AppService} from '../../service/app.service';
import {delay} from 'rxjs/operators';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/meetings', title: 'Meetings',  icon:'business_briefcase-24', class: '' },
    { path: '/venue-list', title: 'Venue',  icon:'location_pin', class: '' },
    { path: '/employees', title: 'Employees',  icon:'users_single-02', class: '' },
    { path: '/invited-meeting', title: 'Invited Meeting',  icon:'ui-1_email-85', class: '' },
    { path: '/objection', title: 'Objection',  icon:'ui-2_chat-round', class: '' }

   /*
    { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' }
*/
];
export const UserROUTES: RouteInfo[] = [
  { path: '/user/invited-meeting', title: 'Invited Meeting',  icon:'ui-1_email-85', class: '' },
  { path: '/user/objection', title: 'Objection',  icon:'ui-2_chat-round', class: '' }
];
export const SecondROUTES: RouteInfo[] = [
  { path: '/venue', title: 'Add-Venue',  icon: '' , class: '' },
  { path: '/venue/:id', title: 'Edit-Venue',  icon: '' , class: '' },
  { path: '/employee', title: 'Add-Employee',  icon: '' , class: '' },
  { path: '/employee/:id', title: 'Edit-Employee',  icon: '' , class: '' },
  { path: '/meeting', title: 'Add-Meeting',  icon: '' , class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  role: string = 'USER';
  constructor(private appService: AppService) { }

  async delayWithRoleCheck(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms))
      .then(() =>
      { if ( sessionStorage.getItem('role') === 'ADMIN') {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
      } else { this.menuItems = UserROUTES.filter(menuItem => menuItem); }});
  }
  ngOnInit() {
    /*this.appService.getRole(sessionStorage.getItem('username'), sessionStorage.getItem('password')).subscribe(r => this.role = r );*/
    this.delayWithRoleCheck(500);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
