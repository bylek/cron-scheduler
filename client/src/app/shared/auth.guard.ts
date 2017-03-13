import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.loggedIn() && this.isAuthRoute(state)) {
      this.router.navigate(['']);
      return false;

    } else if (!this.authService.loggedIn() && !this.isAuthRoute(state)) {
      this.router.navigate(['/login']);
      return false;

    }

    return true;
  }

  isAuthRoute(state): boolean {
    const url = state.url;
    return url === '/login' || url === '/register';
  }

}
