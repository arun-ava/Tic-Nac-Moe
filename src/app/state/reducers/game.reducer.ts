import {createReducer, on} from '@ngrx/store';
import { startGameActionCreator } from '../actions/game.actions';
import { IGameManager } from '../../models/GameManager';
import { makeMoveActionCreator } from '../actions/board.actions';

export const initialState:Readonly<IGameManager> = {
    gameid: '',
    movelist: [],
    colSize: 0,
    rowSize: 0,
    adjacentElementsToWin: 2,
    winner: undefined as any,
};

export const gameReducer = createReducer(
    initialState,
    on(startGameActionCreator, (state, { gameid }) => {
        return { ...state, gameid: gameid }
    }),

    on(makeMoveActionCreator, (state, {move}) => {
        return { ...state, movelist: [...state.movelist, move],  };
    }),
);

