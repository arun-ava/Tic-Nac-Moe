import {createReducer, on} from '@ngrx/store';
import { notifySuccessfulSignInAccountActionCreator } from '../actions/account.actions';
import { IAccount } from '../../models/Account';

export const initialState:Readonly<IAccount> = {
    username: undefined,
    password: undefined
};

export const accountReducer = createReducer(
    initialState,
    on(notifySuccessfulSignInAccountActionCreator, (state, { account }) => {
        return { 
            ...state,
            username: account.username,
        }
    }),
);
