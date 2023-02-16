import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IPlayer } from '../../models/Player';
import { selectAccount } from './account.selector';
import { selectCurrentGame } from './current-game.selector';
import { selectAllGames } from './game.selector';
import { IMatch } from '../../models/Match';

export const selectPlayers = createFeatureSelector<ReadonlyArray<IPlayer>>('players');

export const selectAllPlayers  = createSelector(
    selectPlayers,
    (players) => {
        return players;
    }
);


