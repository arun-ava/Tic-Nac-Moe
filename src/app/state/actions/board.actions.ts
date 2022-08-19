import {createAction, props} from '@ngrx/store';
import { IMove } from '../../models/Board';

export const setRowActionCreator = createAction(
    '[Board] Set Row',
    props<{row: number}>()
);

export const setColumnActionCreator = createAction(
    '[Board] Set Column',
    props<{column: number}>()
);


export const makeMoveActionCreator = createAction(
    '[Board] Make Move',
    props<{move: IMove}>()
);
