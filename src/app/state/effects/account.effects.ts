import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { initiateSignInAccountActionCreator, notifySuccessfulSignInAccountActionCreator, notifyUnsuccessfulSignInAccountActionCreator } from '../actions/account.actions';
import { tap } from 'rxjs';
import { AWSService } from '../../service/aws.service';
import { IAccount } from '../../models/Account';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class AccountEffects {

    login$ = createEffect(() => { // createeffect has automatically subscribes. TODO (read more) it also has inbuild error ahndling and resubscribes to the observable if any error occurs
        return this._actions$.pipe(
            ofType(initiateSignInAccountActionCreator), // Works as a filter for a particular type of action. can also be done using rxjs filters
            tap(action => {
                this._aws.getUser(action.account.username!).pipe(
                    tap((val: IAccount) => {
                        if(val.password === action.account.password) {
                            this._store.dispatch(notifySuccessfulSignInAccountActionCreator({
                                username: action.account.username!
                            }))
                        } else {
                            this._store.dispatch(notifyUnsuccessfulSignInAccountActionCreator())
                        }
                    })
                ).subscribe();
            })
        )
    },
    {
        dispatch: false, // TODO: check Why it is falling in endless loop with dispatch: true
    }
    );

    signInSuccessful$ = createEffect(() => { // createeffect has automatically subscribes. TODO (read more) it also has inbuild error ahndling and resubscribes to the observable if any error occurs
        return this._actions$.pipe(
            ofType(notifySuccessfulSignInAccountActionCreator), // Works as a filter for a particular type of action. can also be done using rxjs filters
            tap(action => {
                this._router.navigateByUrl('/home');
            })
        )
    },
    {
        dispatch: false,
    }
    );

    

    constructor(private _actions$: Actions,
        private _aws: AWSService,
        private _store: Store,
        private _router: Router){
    }
}