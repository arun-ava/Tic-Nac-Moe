import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, filter, map } from 'rxjs';
import { AWSService } from '../../service/aws.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { addGamesActionCreator, createNewGameActionCreator, failedJoiningGameNotifyingActionCreator, fetchAllGamesByUserAction, gameCreationSuccessfulNotifyingActionCreator, gameCreationUnsuccessfulNotifyingActionCreator, joinGameActionCreator, makeMoveActionCreator, selectMatchActionCreator, successfullyJoinedGameNotifyingActionCreator, successfulMoveNotifyingActionCreator, unSuccessfulMoveNotifyingActionCreator } from '../actions/game.actions';
import { concatMap } from 'rxjs/operators';
import { IMatch } from '../../models/Match';
import { IGame } from '../../models/Game';
import { IBoard } from '../../models/Board';


@Injectable()
export class GameEffects {

    fetchAllGamesByUser$ = createEffect(() => { 
        return this._actions$.pipe(
            ofType(fetchAllGamesByUserAction), // Works as a filter for a particular type of action. can also be done using rxjs filters
            tap(action => {
                this._aws.getAllGamesByPlayer(action.username!).pipe(
                    map((val: any) => {
                        return val.map((inv: any) => {
                            return inv.match;
                        });
                    }),
                    tap((games: any) => {
                        // this._store.dispatch(addGamesActionCreator({
                        //     matches: games
                        // }));
                    })
                ).subscribe({
                    next: (games) => {
                        this._store.dispatch(addGamesActionCreator({
                            matches: games
                        }));
                    },
                    error: (e) => {
                    //   this._store.dispatch(gameCreationUnsuccessfulNotifyingActionCreator(action));
                    },
                    complete: () => {
                        
                    }
                });
            })
        )
    },
    {
        dispatch: false, // TODO: check Why it is falling in endless loop with dispatch: true
    }
    );

    createNewGame$ = createEffect(() => { 
        return this._actions$.pipe(
            ofType(createNewGameActionCreator), // Works as a filter for a particular type of action. can also be done using rxjs filters
            tap(action => {
                this._aws.createGame(action.match)
                  .subscribe({
                    next: (n) => {},
                    error: (e) => {
                      this._store.dispatch(gameCreationUnsuccessfulNotifyingActionCreator(action));
                    },
                    complete: () => {
                        this._store.dispatch(gameCreationSuccessfulNotifyingActionCreator(action));
                        this._store.dispatch(selectMatchActionCreator({
                            gameid: action.match.gameid,
                        }));
                    }
                })
            })
        )},
        {
            dispatch: false, // TODO: check Why it is falling in endless loop with dispatch: true
        }
    );

    makeMoveForGame$ = createEffect(() => { 
        return this._actions$.pipe(
            ofType(makeMoveActionCreator), // Works as a filter for a particular type of action. can also be done using rxjs filters
            tap(action => {
                let board: IBoard = {
                    // board: new Array<Array<string>>(...action.board.board)
                    board: action.board.board.map((row, rindex) => {
                        return new Array<string>(...row)
                    })
                };

                console.log('board.board[action.move.row][action.move.column] ', board.board[action.move.row][action.move.column]);
                board.board[action.move.row][action.move.column] = action.move.symbol;

                // this._aws.makeMoveByGameID(action.gameid, action.move, board)
                // .subscribe({
                //     next: (n) => {
                //         this._store.dispatch(successfulMoveNotifyingActionCreator({gameid: action.gameid, move: action.move}));
                //     },
                //     error: (e) => {
                //       this._store.dispatch(unSuccessfulMoveNotifyingActionCreator({gameid: action.gameid, move: action.move}));
                //     },
                //     complete: () => {
                //         this._store.dispatch(successfulMoveNotifyingActionCreator({gameid: action.gameid, move: action.move}));
                //     }
                // });

                this._aws.makeMoveWS(action.username, action.gameid, board, action.lastMovedBy);
            })
        )},
        {
            dispatch: false, // TODO: check Why it is falling in endless loop with dispatch: true
        }
    );

    joinGame$ = createEffect(() => { 
        return this._actions$.pipe(
            ofType(joinGameActionCreator), // Works as a filter for a particular type of action. can also be done using rxjs filters
            tap(action => {
                this._aws.joinGame(action.username, action.gameid)
                  .subscribe({
                    next: (n) => {
                        // this._store.dispatch(successfullyJoinedGameNotifyingActionCreator({username: action.username, gameid: action.gameid}));
                        console.log("Game joined succefully");
                        this._store.dispatch(addGamesActionCreator({
                            matches: [n as IMatch]
                        }));
                    },
                    error: (e) => {
                        this._store.dispatch(failedJoiningGameNotifyingActionCreator({username: action.username, gameid: action.gameid}));
                        console.log("Game joined failed ", e);
                    },
                    complete: () => {
                        this._store.dispatch(successfullyJoinedGameNotifyingActionCreator({username: action.username, gameid: action.gameid}));
                        console.log("Game joined succefully");
                    }
                })
            })
        )},
        {
            dispatch: false, // TODO: check Why it is falling in endless loop with dispatch: true
        }
    );

    constructor(private _actions$: Actions,
        private _aws: AWSService,
        private _store: Store,
        private _router: Router){
    }
}