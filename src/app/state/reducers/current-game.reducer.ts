import {createReducer, on} from '@ngrx/store';
import { updateLastMovedByActionCreator, startGameActionCreator } from '../actions/game.actions';
import { IMatch } from '../../models/Match';
import { IGame } from '../../models/Game';

export const initialStateMatch:Readonly<IGame> = {
    currentGameID: '',
};

export const initialState:Readonly<IGame> = {
    currentGameID: '',
};

export const currentGameReducer = createReducer(
    initialState,
    on(startGameActionCreator, (state, { gameid }) => {
        return {
            ...state, 
            currentGameID: gameid,
        }
    }),
);
