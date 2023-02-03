import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AWSService } from '../../service/aws.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { startGameActionCreator } from '../../state/actions/game.actions';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  rows: string = '3';
  columns: string = '3';
  adjacents: string = '3';

  constructor(private _aws: AWSService,
    private _router: Router,
    private _store: Store) { }

  ngOnInit(): void {
  }

  startGame() {

    console.log("createing new game with rows ", this.rows);
    console.log("createing new game with columns ", this.columns);


    //TODO REMOVE THIS AND USE EFFECTS AND FETCH STATUS FROM SERVER AND CREATE INSTEAD OF CREATING HERE

    let id = Date.now().toString();
    this._store.dispatch(startGameActionCreator({
      // gameid: 'id - ' + Math.trunc(Math.random() * 10000000000),
      gameid: id,
      adjacentElementsToWin: Number.parseInt(this.adjacents),
      colSize: Number.parseInt(this.columns),
      rowSize: Number.parseInt(this.rows),
      movelist: [],
      winner: undefined as any,
    }));

    // TODO: DO USING EFFECTS
    let loc = window.location.toString();
    let len = loc.length;
    let sub = loc.substring(0, len-1);
    const text = sub +'?gameid='+id;
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
