import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { PlayersComponent } from './players/players.component';
import { StoreModule } from '@ngrx/store';
import { playerReducer } from './state/reducers/player.reducer';
import { boardReducer } from './state/reducers/board.reducer';
import { BoardComponent } from './board/board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { gameReducer } from './state/reducers/game.reducer';
import { Diagonals } from './diagonals/diagonal.directive';
import { ColLineComponent } from './diagonals/col-line/col-line.component';
import { MajorDiagonalComponent } from './diagonals/major-diagonal/major-diagonal.component';
import { MinorDiagonalComponent } from './diagonals/minor-diagonal/minor-diagonal.component';
import { RowLineComponent } from './diagonals/row-line/row-line.component';
// import { FaceBookAccountService } from './service/authentication/facebook.auth.service';
import { facebookSDKInitializer } from './utility/app-initializer';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { AppConfigService } from './service/app.config.service';
import { NewGameComponent } from './new-game/new-game.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    PlayersComponent,
    BoardComponent,
    Diagonals,
    MajorDiagonalComponent,
    MinorDiagonalComponent,
    RowLineComponent,
    ColLineComponent,
    UserRegistrationComponent,
    LoginComponent,
    NewGameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      players: playerReducer,
      board: boardReducer,
      game: gameReducer,
    }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    // FaceBookAccountService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: () => facebookSDKInitializer(),
    //   multi: true
    // },
    {
      provide: APP_INITIALIZER,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.initAppConfig();
        }
      },
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
