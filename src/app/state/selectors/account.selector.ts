import { createSelector, createFeatureSelector, select } from '@ngrx/store';
import { IAccount } from '../../models/Account';

export const selectAccount = createFeatureSelector<IAccount>('account');

export const accountUsernameSelector  = createSelector(
    selectAccount,
    (account) => {
        return account.username;
    }
);
