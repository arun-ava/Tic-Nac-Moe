import {createAction, props} from '@ngrx/store';
import { IPlayer } from '../../models/Player';

export const addPlayerActionCreator = createAction(
    '[Players] Add Player',
    props<{player: IPlayer}>()
);

export const getAllPlayersActionCreator = createAction(
    '[Players] Get All Players'
);