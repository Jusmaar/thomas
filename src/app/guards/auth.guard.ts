import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    @Inject(DOCUMENT) private document: any
  ) {
  }

  canActivate(): boolean {

    if (this._authService.islogged()) {
      this.document.body.scrollTop = 0;
      return true;
    } else {
      this.document.body.scrollTop = 0;
      this._router.navigate(['/login']);
      return false;
    }
  }
}