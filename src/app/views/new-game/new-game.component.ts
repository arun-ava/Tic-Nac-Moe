import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AWSService } from '../../service/aws.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectMatchActionCreator, createNewGameActionCreator, notifyNewGameCreationSuccessAction, notifyNewGameCreationFailedAction } from '../../state/actions/game.actions';
import { accountUsernameSelector } from '../../state/selectors/account.selector';
import { catchError, finalize, map } from 'rxjs';
import { createEmptyBoard } from 'src/app/state/reducers/game.reducer';
import { IMatch } from '../../models/Match';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  rows: string = '3';
  symbol: string = 'X';
  adjacents: string = '3';

  private _username='';

  constructor(private _aws: AWSService,
    private _router: Router,
    private _store: Store) { }

  ngOnInit(): void {
    this._store.select(accountUsernameSelector).subscribe((val) => {
      if(val)
      this._username = val;
    })
  }

  startGame() {

    console.log("createing new game with rows ", this.rows);
    console.log("createing new game with symbol ", this.symbol);


    //TODO REMOVE THIS AND USE EFFECTS AND FETCH STATUS FROM SERVER AND CREATE INSTEAD OF CREATING HERE
    let id = Date.now().toString();
    let newgame: IMatch = {
      gameid: id,
      adjacentElementsToWin: Number.parseInt(this.adjacents),
      colSize: Number.parseInt(this.rows),
      rowSize: Number.parseInt(this.rows),
      movelist: [],
      winner: undefined,
      board: {
        board: createEmptyBoard(Number.parseInt(this.rows), Number.parseInt(this.rows)),
      },
      challenger: {
        name: this._username,
        symbol: this.symbol,
      },
      challenged: undefined,
      lastMovedBy: undefined,
    };
    this._store.dispatch(createNewGameActionCreator({match: newgame}));

    

    // TODO: DO USING EFFECTS
    let loc = window.location.toString();
    let len = loc.length;
    let sub = loc.substring(0, len-1);
    const text = sub +'/'+id;
    console.log("text to be shared ", text);
    const toBeShared = {
      text,
    };
    if (navigator.share) {
      navigator
        .share({
          ...toBeShared
        })
        .then(() => console.log("Share was successful."))
        .catch((error: DOMException) =>
          alert(
            `Sharing failed! Code: ${error.code} | Name: ${
              error.message
            } | Message: ${error.message}`
          )
        );
    } else {
      alert("Your browser doesn't support the Share Intent");
    }

    this._navigateHome();
  }

  closeDialog() {
    this._navigateHome();
  }

  private _navigateHome() {
    this._router.navigateByUrl('/home');
  }
}
