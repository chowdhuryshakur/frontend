import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AppService} from '../service/app.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private appService: AppService,
    private router: Router) {

  }

  ngOnInit() {
    this.appService.logOut();
    this.router.navigate(['login']);
  }

}
