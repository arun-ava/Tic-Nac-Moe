import { IBoard, Board } from './Board';
import { IPlayer, Player } from "./Player";

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