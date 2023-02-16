import {createAction, props} from '@ngrx/store';
import { IMatch } from '../../models/Match';
import {  IBoard, IMove } from '../../models/Board';
import { IPlayer } from '../../models/Player';

export const startGameActionCreator = createAction(
    '[NewGame] Start Game',
    props<IMatch>(),
);

export const checkBoardActionCreator = createAction(
    '[Game] Check board',
);

export const setWinnerActionCreator = createAction(
    '[Game] Set winner',
    props<IPlayer>(),
)

export const updateLastMovedByActionCreator = createAction(
    '[Board] Update Last Moved By',
    props<{player: IPlayer, gameid: string}>()
);

export const selectMatchActionCreator = createAction(
    '[Game] Select Match',
    props<{gameid: string}>()
)
