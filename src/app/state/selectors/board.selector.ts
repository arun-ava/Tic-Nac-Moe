import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IPlayer } from '../../models/Player';
import { IBoard } from '../../models/Board';

export const selectBoard = createFeatureSelector<IBoard>('board');

export const boardDataSelector  = createSelector(
    selectBoard,
    (board) => {
        return board.board;
    }
);
