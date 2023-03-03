import {createReducer, on} from '@ngrx/store';
import { selectMatchActionCreator, gameCreationSuccessfulNotifyingActionCreator } from '../actions/game.actions';
import { IGame } from '../../models/Game';

export const initialStateMatch:Readonly<IGame> = {
    currentGameID: '',
};

export const initialState:Readonly<IGame> = {
    currentGameID: '',
};

export const currentGameReducer = createReducer(
    initialState,
    on(gameCreationSuccessfulNotifyingActionCreator, (state, { match }) => {
        return {
            ...state, 
            currentGameID: match.gameid,
        }
    }),

    on(selectMatchActionCreator, (state, {gameid}) => {
        return {
            ...state, 
            currentGameID: gameid,
        };
    }),
);
