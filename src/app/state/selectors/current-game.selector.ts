import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IGame } from '../../models/Game';
import { selectAllGames } from './game.selector';
import { IMatch } from '../../models/Match';
import { selectAccount } from './account.selector';

export const selectCurrentGame = createFeatureSelector<IGame>('currentGame');

export const currentMatchSelector = createSelector(
    selectCurrentGame,
    selectAllGames,
    (currentgame, allgames) => {
        return allgames.find((game: IMatch) => {return game.gameid === currentgame.currentGameID});
    }
);

/**
 * Gives the player status for the currently selected match
 */
 export const playerForCurrentMatchSelector  = createSelector(
    selectAllGames,
    selectCurrentGame,
    selectAccount,
    (allgames, currentgame, account) => {
        let match = allgames.find((game: IMatch) => {return game.gameid === currentgame.currentGameID})!;
        return match.challenger!.name === account.username ? match.challenger: match.challenged;
    }
);

/**
 * Gives the player status for the currently selected match
 */
 export const lastMovedByForCurrentMatchSelector  = createSelector(
    selectAllGames,
    selectCurrentGame,
    (allgames, currentgame) => {
        return allgames.find((game: IMatch) => {return game.gameid === currentgame.currentGameID})!.lastMovedBy;
    }
);