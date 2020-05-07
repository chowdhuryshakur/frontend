import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../service/app.service';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  invalidLogin = false;
  showSpinner = false;
  constructor(private router: Router,
              private appservice: AppService) {
  }

  ngOnInit() {
  }

  checkLogin() {
    this.showSpinner = true;
    this.appservice.authenticate(this.username, this.password).subscribe(
        data => {
          if (sessionStorage.getItem('role') != null)
              this.router.navigate(['']);
          this.invalidLogin = false;
        },
        error => {
          this.invalidLogin = true;
          this.showSpinner = false; });
  }


}



