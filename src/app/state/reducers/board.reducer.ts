import {createReducer, on} from '@ngrx/store';
import { gameCreationSuccessfulNotifyingActionCreator } from '../actions/game.actions';
import { IBoard } from '../../models/Board';

export const initialState:Readonly<IBoard> = {
    board: [],
};

export const initialCellValue = '';

export const boardReducer = createReducer(
    initialState,
    on(gameCreationSuccessfulNotifyingActionCreator, (state, gamestate) => {
        return {
            ...state,
            board: getBoard(gamestate.match.rowSize, gamestate.match.colSize),
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