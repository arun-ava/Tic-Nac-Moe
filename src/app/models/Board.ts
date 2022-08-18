import { IPlayer } from "./Player";
export interface IBoard {
    board: string[][];
}

export class Board {
    private _match: number;
    private _board: string[][];
    private _rowmap: Array<Map<string, number>>;
    private _colmap: Array<Map<string, number>>;
    private _winningSymbol = '';

    constructor(row: number, col: number, match: number) {
        this._match = match;
        this._board = new Array<Array<string>>(row);
        this._rowmap = new Array<Map<string, number>>(row);
        this._colmap = new Array<Map<string, number>>(col);

        this._board.forEach((val: Array<string>) => {
            val = new Array<string>(col);
        });

        this._rowmap.forEach((val: Map<string, number>) => {
            val = new Map<string, number>();
        });

        this._colmap.forEach((val: Map<string, number>) => {
            val = new Map<string, number>();
        });
    }


    makeMove(symbol: string, row: number, col: number) {
        this._board[row][col] = symbol;
        if(this._checkRow(symbol, row) || this._checkCol(symbol, col)) {
            this._winningSymbol = symbol;
        }
        return this._winningSymbol;
    }

    getBoard() {
        return JSON.parse(JSON.stringify(this._board));
    }

    getWinner() {
        return this._winningSymbol;
    }

    _checkRow(symbol: string, row: number) {
        return this._hasKAdjacent(this._board[row], symbol);
    }

    _checkCol(symbol: string, col: number) {
        return this._hasKAdjacent(this._board.map((val) => {
            return val[col];
        }), symbol);
    }

    _hasKAdjacent(arr: string[], symbol: string) {
        let counter = 0;

        for(let i=0; i<arr.length; i++) {
            if(counter >= this._match) {
                return true;
            } else if(arr[i] === symbol) {
                counter++;
            } else {
                counter=0;
            }
        }

        return false;
    }

}