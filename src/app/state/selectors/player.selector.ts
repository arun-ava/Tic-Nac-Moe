import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IPlayer } from '../../models/Player';

export const selectPlayers = createFeatureSelector<ReadonlyArray<IPlayer>>('players');
let a  = new Map<string, number>();

let r = Array.from(a.values());
console.log(r);

export const selectAllPlayers  = createSelector(
    selectPlayers,
    (players) => {
        return players;
    }
);
