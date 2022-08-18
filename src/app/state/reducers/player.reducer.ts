import {createReducer, on} from '@ngrx/store';
import {IPlayer} from '../../models/Player';
import {getAllPlayersActionCreator, addPlayerActionCreator } from '../actions/player.actions';

export const initialState: ReadonlyArray<IPlayer> = [];

export const playerReducer = createReducer(
    initialState,
    on(getAllPlayersActionCreator, (state) => state),
    on(addPlayerActionCreator, (state, {player}) => { return [...state, player] }),
);