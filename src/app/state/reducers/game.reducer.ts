import {createReducer, on} from '@ngrx/store';
import { startGameActionCreator } from '../actions/game.actions';
import { IGameManager } from '../../models/GameManager';
import { makeMoveActionCreator } from '../actions/board.actions';

export const initialState:Readonly<IGameManager> = {
    gameid: '',
    movelist: [],
    colSize: 0,
    rowSize: 0,
    adjacentElementsToWin: 0,
    winner: undefined as any,
};

export const gameReducer = createReducer(
    initialState,
    on(startGameActionCreator, (state, { gameid, adjacentElementsToWin, colSize, rowSize, movelist, winner }) => {
        return { 
            ...state,
            gameid: gameid,
            adjacentElementsToWin: adjacentElementsToWin ? adjacentElementsToWin : state.adjacentElementsToWin,
            colSize:  colSize ? colSize : state.colSize,
            rowSize:  rowSize ? rowSize : state.rowSize,
            movelist: movelist ? movelist : state.movelist,
            winner: winner ? winner : state.winner,
         }
    }),

    on(makeMoveActionCreator, (state, {move}) => {
        return { ...state, movelist: [...state.movelist, move],  };
    }),
);

