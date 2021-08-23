import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {

  }

  canActivate() {

    var token = localStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
