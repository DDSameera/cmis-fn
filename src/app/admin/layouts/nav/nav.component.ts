import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { decode } from 'js-base64';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  loggedUserName: any = '';
  constructor(private route: Router) {}

  ngOnInit(): void {
    let sessionLoggedUserName: any = sessionStorage.getItem('logged-user');
    this.loggedUserName = decode(sessionLoggedUserName);
  }

  userLogOut() {
    localStorage.removeItem('session-data');
    sessionStorage.clear();
    localStorage.removeItem('token');
    this.route.navigateByUrl('/login');
  }
}
