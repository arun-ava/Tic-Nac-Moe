import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IGameManager } from '../../models/GameManager';
import { selectAllPlayers } from './player.selector';
import { selectBoard } from './board.selector';

export const selectGame = createFeatureSelector<IGameManager>('game');

export const nextPlayerSelector  = createSelector(
    selectGame,
    selectAllPlayers,
    (game, players) => {
        return players[game.movelist.length % players.length];
    }
);

export const currentPlayerSelector  = createSelector(
    selectGame,
    selectAllPlayers,
    (game, players) => {
        return players[(game.movelist.length-1) % players.length];
    }
);

export const winnerNotifier  = createSelector(
    selectGame,
    selectAllPlayers,
    selectBoard,
    currentPlayerSelector,
    (game, players, board, currentPlayer) => {
        return checkboard(game.movelist[game.movelist.length-1]?.row, 
            game.movelist[game.movelist.length-1]?.column, 
            game.movelist[game.movelist.length-1]?.symbol,
            board.board, game.adjacentElementsToWin) ? currentPlayer : undefined;
    }
);

function checkboard(row: number, col: number, symbol: string, board: string[][], match: number) {
    return checkRow(symbol, row, match, board) || checkCol(symbol, col, match, board) 
    || checkMajorDiagonal(symbol, row, col, match, board) || checkMinorDiagonal(symbol, row, col, match, board);
}

function checkRow(symbol: string, row: number, match: number, board: string[][]) {
    return hasKAdjacent(board[row], symbol, match);
}

function checkCol(symbol: string, col: number, match: number, board: string[][]) {
    let b = board.map((val) => {
        return val[col]
    }).filter((value) => { return value !== undefined});
    return hasKAdjacent(b, symbol, match);
}

function checkMajorDiagonal(symbol: string, row: number, col: number, match: number, board: string[][]) {
    let res = [];
    let r=row, c=col;

    while(r>0 && c>0) {
        r--;
        c--;
    }

    while(r<board.length && c<board[0].length){
        res.push(board[r][c]);
        r++;
        c++;
    }

    return hasKAdjacent(res, symbol, match);
}

function checkMinorDiagonal(symbol: string, row: number, col: number, match: number, board: string[][]) {
    let res = [];
    let r=row, c=col;

    while(r>0 && c<board[0].length) {
        r--;
        c++;
    }

    while(r<board.length && c>=0){
        res.push(board[r][c]);
        r++;
        c--;
    }

    return hasKAdjacent(res, symbol, match);
}

function hasKAdjacent(arr: string[]=[], symbol: string, match: number) {
    let counter = 0;

    for(let i=0; i<arr.length; i++) {
        if(counter >= match) {
            return true;
        } else if(arr[i] === symbol) {
            counter++;
        } else {
            counter=0;
        }
    }

    return false;
}