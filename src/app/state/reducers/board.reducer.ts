import {createReducer, on} from '@ngrx/store';
import {IPlayer} from '../../models/Player';
import { makeMoveActionCreator, setColumnActionCreator, setRowActionCreator } from '../actions/board.actions';
import { IBoard } from '../../models/Board';

export const initialState:Readonly<IBoard> = {
    board: [],
    colSize: 0,
    rowSize: 0
};

export const boardReducer = createReducer(
    initialState,
    on(makeMoveActionCreator, (state, {move}) => {
        return {
            ...state,
            board: _markBoard(state.board, move.row, move.column, move.symbol),
        }
    }),
    on(setRowActionCreator, (state, {row}) => {
        return {
            ...state,
            rowSize: row,
        }
    }),
    on(setColumnActionCreator, (state, {column}) => {
        return {
            ...state,
            colSize: column,
        }
    }),
);


function _markBoard(board: string[][], row: number, col: number, symbol: string): string[][] {
    return board.map((value: string[], r: number) => {
        value.map((val: string, c: number) => {
            if(r === row && c === col) {
                return symbol
            } else {
                return val
            }
        })
    }) as any; //TODO : fix this. see why map does not return a string[][] even though it is working on a string [][]

}