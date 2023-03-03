import {createReducer, on} from '@ngrx/store';
import { updateLastMovedByActionCreator, addGamesActionCreator, successfulMoveNotifyingActionCreator, gameCreationSuccessfulNotifyingActionCreator } from '../actions/game.actions';
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
    lastMovedBy: undefined,
};

export const initialState:Readonly<IMatch[]> = [];

export const initialCellValue = '';

export const gameReducer = createReducer(
    initialState,
    on(gameCreationSuccessfulNotifyingActionCreator, (state, { match }) => {
        return [ 
            ...state, {
                gameid: match.gameid,
                // adjacentElementsToWin: adjacentElementsToWin ? adjacentElementsToWin : state.adjacentElementsToWin,
                // colSize:  colSize ? colSize : state.colSize,
                // rowSize:  rowSize ? rowSize : state.rowSize,
                // movelist: movelist ? movelist : state.movelist,
                // winner: winner ? winner : state.winner,
                adjacentElementsToWin: match.adjacentElementsToWin,
                colSize:  match.colSize,
                rowSize:  match.rowSize,
                movelist: match.movelist,
                winner: match.winner,
                board: {
                    board: createEmptyBoard(match.colSize, match.rowSize),
                },
                challenger: match.challenger,
                challenged: match.challenged,
                lastMovedBy: undefined,
            }
        ]
    }),

    on(addGamesActionCreator, (state, { matches }) => {
        return [ 
            ...state, 
            ...matches
            // ...matches.map((val) => {
            //     return {
            //         ...val,
            //         board: {
            //             board: _getBoard(val.colSize, val.rowSize),
            //         }
            //     };
            // })
        ];
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

    on(successfulMoveNotifyingActionCreator, (state, {gameid, move}) => {
        return state
        .map((val) => {
            if(val.gameid === gameid) {
                val = {
                    ...val,
                    board : {
                        board: _markBoard(val?.board?.board!, move.row, move.column, move.symbol)
                    }
                }
            }
            return val;
        })
    }),
);


// TODO: Move to util
export function createEmptyBoard(row: number, col: number) {
    let t = [];
    for(let i=0; i<row; i++) {
        t.push(new Array<string>(col).fill(initialCellValue));
    }
    return t;
}

function _markBoard(board: string[][], row: number, col: number, symbol: string): string[][] {
    return board.map((value: string[], r: number) => {
        return value.map((val: string, c: number) => {
            if(r === row && c === col && val === initialCellValue) {
                return symbol
            } else {
                return val
            }
        })
    }) as any; //TODO : fix this. see why map does not return a string[][] even though it is working on a string [][]
}