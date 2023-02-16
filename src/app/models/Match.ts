import { IMove, IBoard } from './Board';
import { IPlayer } from "./Player";

export interface IMatch {
    gameid: string;
    movelist: IMove[];
    rowSize: number;
    colSize: number;
    adjacentElementsToWin: number;
    winner: IPlayer | undefined;
    board: IBoard | undefined;
    challenger: IPlayer | undefined;
    challenged: IPlayer | undefined;
    lastMovedBy: IPlayer | undefined;
}

export interface WinPosition {
    row: number;
    col: number;
    windDirection: WinDirection;
}

export enum WinDirection {
    'major', 'minor', 'row', 'col'
}

// export class GameManager {

//     _players!: Player[];
//     _board!: Board;

//     constructor(row: number, col: number, match: number) {
//         this._board = new Board(row, col, match);
//         this._players = [];
//     }

//     addPlayer(name: string, symbol: string) {
//         this._players.push(new Player(name, symbol));
//     }

//     makeMove(symbol: string, row:number, col: number) {
//         this._board.makeMove(symbol, row, col);
//     }

//     getBoard() {
//         return this._board.getBoard();
//     }

//     getWinner() {
//         return this._board.getWinner();
//     }
// }