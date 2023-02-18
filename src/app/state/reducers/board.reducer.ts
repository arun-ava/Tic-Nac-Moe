import {createReducer, on} from '@ngrx/store';
import { makeMoveActionCreator } from '../actions/board.actions';
import { startGameActionCreator } from '../actions/game.actions';
import { IBoard } from '../../models/Board';

export const initialState:Readonly<IBoard> = {
    board: [],
};

export const initialCellValue = '';

export const boardReducer = createReducer(
    initialState,
    // on(makeMoveActionCreator, (state, {move}) => {
    //     return {
    //         ...state,
    //         board: _markBoard(state.board, move.row, move.column, move.symbol),
    //     }
    // }),
    on(startGameActionCreator, (state, gamestate) => {
        return {
            ...state,
            board: getBoard(gamestate.rowSize, gamestate.colSize),
        }
    }),
);




function getBoard(row: number, col: number) {
    let t = [];
    for(let i=0; i<row; i++) {
        t.push(new Array<string>(col).fill(initialCellValue));
    }

    console.log("Created board array ", t);
    return t;
}