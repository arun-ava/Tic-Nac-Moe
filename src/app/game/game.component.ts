import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, debounceTime, distinctUntilChanged, map, merge } from 'rxjs';
import { IPlayer } from '../models/Player';
import { startGameActionCreator, checkBoardActionCreator, setWinnerActionCreator } from '../state/actions/game.actions';
import { boardDataSelector } from '../state/selectors/board.selector';
import { selectGame, winnerNotifier } from '../state/selectors/game.selector';

/**
 * Events -
 * 1> Start game
 * 
 */
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  row = new FormControl();
  column = new FormControl();

  rowsize = 0;
  colsize = 0;

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this.row.valueChanges.pipe(
      debounceTime(400),
    ).subscribe((val: string) => {
      this.rowsize = Number.parseInt(val);
    });

    this.column.valueChanges.pipe(
      debounceTime(400),
    ).subscribe((val: string) => {
      this.colsize = Number.parseInt(val);
    });

    // combineLatest([
    //   this._store.select(selectGame).pipe(distinctUntilChanged()),
    //   this._store.select(boardDataSelector).pipe(distinctUntilChanged(),)
    // ]).pipe(
    //   map((results) => {return {game: results[0], board: results[1]}}),
    //   ).subscribe(({game, board}) => {
    //   console.log('game', game);
    //   console.log('board', board);
    //   this._store.dispatch(checkBoardActionCreator(
    //     // {
    //     // move: game.movelist[game.movelist.length-1],
    //     // adjacent: game.adjacentElementsToWin,
    //     // board: {board: board} as IBoard,
    //   // }
    //   ));
    // }); // TODO : the events are getting logged multiple times coudnlt fix with combinelates or any other rxjs ops. find other way

    this._store.select(winnerNotifier).pipe(distinctUntilChanged()).subscribe((val: IPlayer | undefined) => {
      console.log("Winner is : ", val);
      if(val) {
        this._store.dispatch(setWinnerActionCreator(val));
      }
      
    })

    this.row.setValue('8');
    this.column.setValue('8');
  }

  startGame() {
    this._store.dispatch(startGameActionCreator({
      gameid: 'id - ' + Math.trunc(Math.random() * 10000000000),
      adjacentElementsToWin: 0,
      colSize: this.colsize,
      rowSize: this.rowsize,
      movelist: [],
      winner: undefined as any,
    }));
  }

}
