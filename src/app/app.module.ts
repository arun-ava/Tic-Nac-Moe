import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { PlayersComponent } from './players/players.component';
import { StoreModule } from '@ngrx/store';
import { BoardComponent } from './board/board.component';
import { playerReducer } from './state/reducers/player.reducer';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    PlayersComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      players: playerReducer
    }, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
