import {createReducer, on} from '@ngrx/store';
import { makeMoveActionCreator } from '../actions/board.actions';
import { startGameActionCreator } from '../actions/game.actions';
import { IBoard } from '../../models/Board';

export const initialState:Readonly<IBoard> = {
    board: [],
};

export const boardReducer = createReducer(
    initialState,
    on(makeMoveActionCreator, (state, {move}) => {
        return {
            ...state,
            board: _markBoard(state.board, move.row, move.column, move.symbol),
        }
    }),
    on(startGameActionCreator, (state, gamestate) => {
        return {
            ...state,
            board: getBoard(gamestate.rowSize, gamestate.colSize),
        }
    }),
);


function _markBoard(board: string[][], row: number, col: number, symbol: string): string[][] {
    return board.map((value: string[], r: number) => {
        return value.map((val: string, c: number) => {
            if(r === row && c === col) {
                return symbol
            } else {
                return val
            }
        })
    }) as any; //TODO : fix this. see why map does not return a string[][] even though it is working on a string [][]
}

function getBoard(row: number, col: number) {
    let t = [];
    for(let i=0; i<row; i++) {
        t.push(new Array<string>(col).fill('x'));
    }
    return t;
}