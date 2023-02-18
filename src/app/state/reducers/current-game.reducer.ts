import {createReducer, on} from '@ngrx/store';
import { startGameActionCreator, selectMatchActionCreator } from '../actions/game.actions';
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

    on(selectMatchActionCreator, (state, {gameid}) => {
        return {
            ...state, 
            currentGameID: gameid,
        };
    }),
);
