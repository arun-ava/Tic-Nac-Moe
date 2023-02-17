import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { NewGameComponent } from '../new-game/new-game.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from '../../service/app.config.service';
import { setWinnerActionCreator } from '../../state/actions/game.actions';
import { selectAllGames, winnerNotifier } from '../../state/selectors/game.selector';
import { accountUsernameSelector } from '../../state/selectors/account.selector';
import { IMatch } from '../../models/Match';
/**
 * Events -
 * 1> Start game
 * 
 */
@Component({
  selector: 'app-games',
  templateUrl: './current-games.component.html',
  styleUrls: ['./current-games.component.scss']
})
export class CurrentGamesComponent implements OnInit {

  allGames$!: Observable<IMatch[]>;

  constructor(private _store: Store) {
    this.allGames$ = this._store.select(selectAllGames);
  }

  ngOnInit(): void {
  }

  startGame() {
  }
}
