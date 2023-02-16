import {createReducer, on} from '@ngrx/store';
import { updateLastMovedByActionCreator, startGameActionCreator } from '../actions/game.actions';
import { IMatch } from '../../models/Match';
import { map } from 'rxjs';

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
    lastMovedBy: undefined,
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
                lastMovedBy: undefined,
            }
        ]
    }),

    on(updateLastMovedByActionCreator, (state, {player, gameid}) => {
        // return { ...state, movelist: [...state.movelist, move],  };
        return [...state].map((val) => { //TODO: READ THIS AGAIN. VErY IMPORTANT WAY TO CHANGE NESTED VALUES
            if(val.gameid === gameid) { 
                val = {
                    ...val,
                    lastMovedBy: {
                        name: player.name,
                        symbol: player.symbol,
                    }
                }
            }
            return val;
        });
    }),
);



function _getBoard(row: number, col: number) {
    let t = [];
    for(let i=0; i<row; i++) {
        t.push(new Array<string>(col).fill(initialCellValue));
    }
    return t;
}