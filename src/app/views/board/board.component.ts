import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { boardDataSelector } from '../../state/selectors/board.selector';
import { IPlayer } from '../../models/Player';
import { nextPlayerSelector } from '../../state/selectors/game.selector';
import { makeMoveActionCreator } from '../../state/actions/board.actions';

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

  currentPlayer!: IPlayer;

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this._store.select(nextPlayerSelector).subscribe((val) => {
      this.currentPlayer = val; // todo : see if something cleaner that local state can be done
    });
    
  }

  cellClicked(rowindex:number, colindex:number) {
    console.log(rowindex);
    console.log(colindex);

    

    this._store.dispatch(makeMoveActionCreator({
      move: {
        column: colindex,
        row: rowindex,
        symbol: this.currentPlayer!.symbol
      }
    }))
  }

}
