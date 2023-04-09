import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { accountUsernameSelector } from '../../state/selectors/account.selector';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private _store: Store) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this._store.select(accountUsernameSelector).pipe(
        
        map((val) => {
        return val !== undefined;
        // return true;
        }),
        tap((val) => {
          if(!val)
            this._router.navigateByUrl('/auth');
        }),
      )
    }
    
}