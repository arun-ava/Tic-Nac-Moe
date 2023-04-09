import {createAction, props} from '@ngrx/store';
import { IMatch } from '../../models/Match';
import {  IBoard, IMove } from '../../models/Board';
import { IPlayer } from '../../models/Player';

export const createNewGameActionCreator = createAction(
    '[NewGame] Start Game',
    props<{match: IMatch}>(),
);

export const gameCreationSuccessfulNotifyingActionCreator = createAction(
    '[GameEffects] New Game Created Successfully',
    props<{match: IMatch}>(),
);

export const gameCreationUnsuccessfulNotifyingActionCreator = createAction(
    '[GameEffects] New Game Creation Failed',
    props<{match: IMatch}>(),
);

export const addGamesActionCreator = createAction(
    '[Game Effects] Add Matches',
    props<{matches: IMatch[]}>(),
);

export const checkBoardActionCreator = createAction(
    '[Game] Check board',
);

export const setWinnerActionCreator = createAction(
    '[Game] Set winner',
    props<IPlayer>(),
);

export const updateLastMovedByActionCreator = createAction(
    '[Board] Update Last Moved By',
    props<{player: IPlayer, gameid: string}>()
);

export const selectMatchActionCreator = createAction(
    '[New Game | Current Game ] Select Match',
    props<{gameid: string}>()
);

export const notifyNewGameCreationSuccessAction = createAction(
    '[New Game ] Create Match Successful',
    props<{gameid: string}>()
);

export const notifyNewGameCreationFailedAction = createAction(
    '[New Game ] Create Match Failed',
    props<{gameid: string}>()
);


export const fetchAllGamesByUserAction = createAction(
    '[ Game ] Fetch All Games By User',
    props<{username: string}>()
);


export const makeMoveActionCreator = createAction(
    '[Board] Make Move',
    props<{move: IMove, gameid: string, board: IBoard, username: string, lastMovedBy: IPlayer}>()
);

export const successfulMoveNotifyingActionCreator = createAction(
    '[Board] Move Succesful',
    props<{move: IMove, gameid: string}>()
);

export const unSuccessfulMoveNotifyingActionCreator = createAction(
    '[Board] Move Unsuccesful',
    props<{move: IMove, gameid: string}>()
);

export const joinGameActionCreator = createAction(
    '[Game] Join Game',
    props<{gameid: string, username: string}>()
);

export const successfullyJoinedGameNotifyingActionCreator = createAction(
    '[Game Effect] Game Joined Successfully',
    props<{gameid: string, username: string}>()
);

export const failedJoiningGameNotifyingActionCreator = createAction(
    '[Game Effect] Game Joining Unsuccessful',
    props<{gameid: string, username: string}>()
);

