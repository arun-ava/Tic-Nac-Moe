import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, pipe } from 'rxjs';
import { setColumnActionCreator, setRowActionCreator } from '../state/actions/board.actions';
import { boardDataSelector } from '../state/selectors/board.selector';

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

  @ViewChild('rowSizeInput') rowElement!: ElementRef;
  @ViewChild('colSizeInput') colElement!: ElementRef;

  row = new FormControl();
  column = new FormControl();

  board$ = this._store.select(boardDataSelector);


  
  constructor(private _store: Store) { }

  ngOnInit(): void {
    this.row.valueChanges.pipe(
      debounceTime(400),
    ).subscribe((val: number) => {
      this._store.dispatch(setRowActionCreator({row: val}));
    });

    this.column.valueChanges.pipe(
      debounceTime(400),
    ).subscribe((val: number) => {
      this._store.dispatch(setColumnActionCreator({column: val}));
    });;
  }

}
