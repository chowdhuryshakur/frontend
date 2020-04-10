import { Component, OnInit } from '@angular/core';
import {AddVenueComponent} from '../../add-venue/add-venue.component';

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
    { path: '/notifications', title: 'Invited Meeting',  icon:'ui-1_email-85', class: '' },
    { path: '/user-profile', title: 'Objection',  icon:'ui-2_chat-round', class: '' }

   /* { path: '/icons', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' }
*/
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

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
