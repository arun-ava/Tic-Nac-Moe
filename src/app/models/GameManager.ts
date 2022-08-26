import { IBoard, Board, IMove } from './Board';
import { IPlayer, Player } from "./Player";

export interface IGameManager {
    gameid: string;
    movelist: IMove[];
    rowSize: number;
    colSize: number;
    adjacentElementsToWin: number;
    winner: Player | undefined;
}

export interface WinPosition {
    row: number;
    col: number;
}
export class GameManager {

    _players!: Player[];
    _board!: Board;

    constructor(row: number, col: number, match: number) {
        this._board = new Board(row, col, match);
        this._players = [];
    }

    addPlayer(name: string, symbol: string) {
        this._players.push(new Player(name, symbol));
    }

    makeMove(symbol: string, row:number, col: number) {
        this._board.makeMove(symbol, row, col);
    }

    getBoard() {
        return this._board.getBoard();
    }

    getWinner() {
        return this._board.getWinner();
    }
}