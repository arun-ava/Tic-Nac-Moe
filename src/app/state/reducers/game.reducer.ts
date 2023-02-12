import {createReducer, on} from '@ngrx/store';
import { legalMoveActionCreator, startGameActionCreator } from '../actions/game.actions';
import { IMatch } from '../../models/Match';

export const initialStateMatch:Readonly<IMatch> = {
    gameid: '',
    movelist: [],
    colSize: 0,
    rowSize: 0,
    adjacentElementsToWin: 3,
    winner: undefined,
    board: undefined,
    challenger: undefined,
    challenged: undefined,
};

export const initialState:Readonly<IMatch[]> = [];

export const initialCellValue = '';

export const gameReducer = createReducer(
    initialState,
    on(startGameActionCreator, (state, { gameid, adjacentElementsToWin, colSize, rowSize, movelist, winner, challenger, challenged }) => {
        return [ 
            ...state, {
                gameid: gameid,
                // adjacentElementsToWin: adjacentElementsToWin ? adjacentElementsToWin : state.adjacentElementsToWin,
                // colSize:  colSize ? colSize : state.colSize,
                // rowSize:  rowSize ? rowSize : state.rowSize,
                // movelist: movelist ? movelist : state.movelist,
                // winner: winner ? winner : state.winner,
                adjacentElementsToWin: adjacentElementsToWin,
                colSize:  colSize,
                rowSize:  rowSize,
                movelist: movelist,
                winner: winner,
                board: {
                    board: _getBoard(colSize, rowSize),
                },
                challenger: challenger,
                challenged: challenged,
            }
        ]
    }),

    // on(legalMoveActionCreator, (state, {move}) => {
    //     // return { ...state, movelist: [...state.movelist, move],  };
    //     return { ...state, movelist: [...state.movelist, move],  };
    // }),
);



function _getBoard(row: number, col: number) {
    let t = [];
    for(let i=0; i<row; i++) {
        t.push(new Array<string>(col).fill(initialCellValue));
    }
    return t;
}