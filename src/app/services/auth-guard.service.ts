import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { decode } from 'js-base64';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    let sessionDataEnocdedString: any = localStorage.getItem('session-data');

    if (sessionDataEnocdedString) {
      let sessionDataStringDecoded = decode(sessionDataEnocdedString);
      let sessionDataJSON: any = JSON.parse(sessionDataStringDecoded);

      if (sessionDataJSON && sessionDataJSON.logged) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  checkAlreadyLog() {
    let sessionDataEnocdedString: any = localStorage.getItem('session-data');

    if (sessionDataEnocdedString) {
      let sessionDataStringDecoded = decode(sessionDataEnocdedString);
      let sessionDataJSON: any = JSON.parse(sessionDataStringDecoded);

      if (sessionDataJSON && sessionDataJSON.logged) {
        this.router.navigateByUrl('/dashboard/ticket');
      }
    }
  }
}
