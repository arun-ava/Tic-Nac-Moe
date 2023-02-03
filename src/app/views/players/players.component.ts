import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IPlayer } from '../../models/Player';
import { selectAllPlayers } from '../../state/selectors/player.selector';
import { addPlayerActionCreator } from '../../state/actions/player.actions';
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

  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('symbolInput') symbolInput!: ElementRef;

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this.players$.subscribe((val) => {
      console.log(val);
    })
  }

  addPlayer() {
    // this.players.push(new Player(this._name, this._symbol));
    this._store.dispatch(addPlayerActionCreator({player: {
      name: this.nameInput.nativeElement.value,
      symbol: this.symbolInput.nativeElement.value
    } as IPlayer}));
  }

}
