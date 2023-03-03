import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { initiateSignInAccountActionCreator, notifySuccessfulSignInAccountActionCreator, notifyUnsuccessfulSignInAccountActionCreator } from '../actions/account.actions';
import { tap } from 'rxjs';
import { AWSService } from '../../service/aws.service';
import { IAccount } from '../../models/Account';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Local_Storage_Account, Local_Storage_Prefix } from 'src/app/enums/storage-keys';
import { fetchAllGamesByUserAction } from '../actions/game.actions';


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
                                account: action.account
                            }));
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
                localStorage.setItem(Local_Storage_Prefix+Local_Storage_Account, JSON.stringify(action.account));
                this._router.navigateByUrl('/home');
                this._store.dispatch(fetchAllGamesByUserAction({
                    username: action.account.username!,
                }));
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