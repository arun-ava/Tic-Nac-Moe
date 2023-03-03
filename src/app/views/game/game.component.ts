import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { NewGameComponent } from '../new-game/new-game.component';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AppConfigService } from '../../service/app.config.service';
import { setWinnerActionCreator } from '../../state/actions/game.actions';
import { winnerNotifier } from '../../state/selectors/game.selector';
import { accountUsernameSelector } from '../../state/selectors/account.selector';

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

  // row = new FormControl();
  // column = new FormControl();
  // adjacent = new FormControl();

  // rowsize = 0;
  // colsize = 0;
  // adjsize = 0;

  accountusername$ = this._store.select(accountUsernameSelector);

  constructor(
    private _store: Store,
    private _dialog: MatDialog,
    private _appconfig: AppConfigService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    console.log(this._appconfig.getConfig());

    console.log("path param s", this._route.snapshot.queryParamMap.get('gameid'));
    this._route.queryParams.subscribe((val) =>{
      console.log('qp  ', val);
    })

    
    // this.row.valueChanges.pipe(
    //   debounceTime(400),
    // ).subscribe((val: string) => {
    //   this.rowsize = Number.parseInt(val);
    // });

    // this.column.valueChanges.pipe(
    //   debounceTime(400),
    // ).subscribe((val: string) => {
    //   this.colsize = Number.parseInt(val);
    // });

    // this.adjacent.valueChanges.pipe(
    //   debounceTime(400),
    // ).subscribe((val: string) => {
    //   this.adjsize = Number.parseInt(val);
    // });

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

    this._store.select(winnerNotifier).pipe(
      distinctUntilChanged(),
      filter((val) => {
        return val !== undefined
      })
      ).subscribe((val: any) => {
      console.log("Winner is : ", val);
      this._store.dispatch(setWinnerActionCreator(val));
    });

    // legalMoveNotifier.

    this._store.subscribe()

    // this.row.setValue('8');
    // this.column.setValue('8');

    // setTimeout(() => {
    //   this.startGame();
    // }, 500);
  }

  // startGame() {
    
  // }

  fblogin() {
    FB.login(function(response) {
      if (response.authResponse) { 
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response: any) {
        console.log('Good to see you, ' + (response as any).name + '.');
      });
      } else {
      console.log('User cancelled login or did not fully authorize.');
      }
    });
  }

  fbfriends() {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me/friends', function(response: any) {
        console.log('Good to see you, ' + (response as any).name + '.');
      });
  }

  openRegisterComponent() {
    this._dialog.open(UserRegistrationComponent);
  }

  openNewGameComponent() {
    this._router.navigateByUrl('/newgame');
  }
}
