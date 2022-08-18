import { Component, OnInit, ViewChild } from '@angular/core';
import { IPlayer } from '../models/Player';
import { Store } from '@ngrx/store';
import { addPlayerActionCreator, getAllPlayersActionCreator } from '../state/actions/player.actions';
import { Observable } from 'rxjs';
import { selectAllPlayers } from '../state/selectors/player.selector';
/**
 * Events
 * 1> Add player
 */
@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  players: IPlayer[] = [];
  players$: Observable<readonly IPlayer[]> = this._store.select(selectAllPlayers);

  @ViewChild('nameInput') nameInput!: HTMLInputElement;
  @ViewChild('symbolInput') symbolInput!: HTMLInputElement;

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this.players$.subscribe((val) => {
      console.log(val);
    })
  }

  addPlayer() {
    // this.players.push(new Player(this._name, this._symbol));
    this._store.dispatch(addPlayerActionCreator({player: {
      name: this.nameInput.value,
      symbol: this.symbolInput.value 
    } as IPlayer}));
  }

}
