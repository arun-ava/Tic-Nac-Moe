import {createAction, props} from '@ngrx/store';
import { IAccount } from '../../models/Account';

export const createAccountActionCreator = createAction(
    '[User Registration] Create Account',
    props<{player: IAccount}>()
);

export const initiateSignInAccountActionCreator = createAction(
    '[User Registration] SignIn Account',
    props<{account: IAccount}>()
);

export const notifySuccessfulSignInAccountActionCreator = createAction(
    '[User Registration] SignIn Account Successful',
    props<{username: string}>()
);

export const notifyUnsuccessfulSignInAccountActionCreator = createAction(
    '[User Registration] SignIn Account Unsuccessful',
);