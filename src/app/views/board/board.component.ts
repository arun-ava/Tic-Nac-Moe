import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { boardDataSelector } from '../../state/selectors/board.selector';
import { IPlayer } from '../../models/Player';
import { nextPlayerSelector } from '../../state/selectors/game.selector';
import { makeMoveActionCreator } from '../../state/actions/board.actions';
import { currentMatchSelector, lastMovedByForCurrentMatchSelector, playerForCurrentMatchSelector } from '../../state/selectors/current-game.selector';
import { IMatch } from '../../models/Match';
import { updateLastMovedByActionCreator } from '../../state/actions/game.actions';

/**
 * Events - 
 * 1> Set row
 * 2> Set column
 * 3> Make move
 */
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  
  board$ = this._store.select(boardDataSelector);

  private _currentPlayer!: IPlayer;
  private _lastMovedBy!: IPlayer;
  currentMatch!: IMatch | undefined;

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this._store.select(playerForCurrentMatchSelector).subscribe((val) => {
      this._currentPlayer = val as IPlayer; // todo : see if something cleaner that local state can be done and why type assertion (as IPlayer) is needed
    });
    
    this._store.select(currentMatchSelector).subscribe((val) => {
      this.currentMatch = val;
    })

    this._store.select(lastMovedByForCurrentMatchSelector).subscribe((val) => {
      this._lastMovedBy = val as IPlayer;
    })
  }

  cellClicked(rowindex:number, colindex:number) {
    console.log(rowindex);
    console.log(colindex);


    if(this._currentPlayer?.name === this._lastMovedBy?.name) {
      console.log("cannot give move twice");
      return;
    }

    this._store.dispatch(makeMoveActionCreator({
      move: {
        column: colindex,
        row: rowindex,
        symbol: this._currentPlayer!.symbol
      },
      gameid: this.currentMatch?.gameid!,
    }));

    this._store.dispatch(updateLastMovedByActionCreator({
      player: this._currentPlayer!, gameid: this.currentMatch?.gameid!,
    }));
  }

}
