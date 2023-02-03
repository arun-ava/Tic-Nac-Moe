import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { playerReducer } from './state/reducers/player.reducer';
import { boardReducer } from './state/reducers/board.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { gameReducer } from './state/reducers/game.reducer';
import { facebookSDKInitializer } from './utility/app-initializer';
import { UserRegistrationComponent } from './views/user-registration/user-registration.component';
import { MaterialModule } from './material.module';
import { AppConfigService } from './service/app.config.service';
import { NewGameComponent } from './views/new-game/new-game.component';
import { PlayersComponent } from './views/players/players.component';
import { BoardComponent } from './views/board/board.component';
import { MajorDiagonalComponent } from './views/diagonals/major-diagonal/major-diagonal.component';
import { Diagonals } from './views/diagonals/diagonal.directive';
import { MinorDiagonalComponent } from './views/diagonals/minor-diagonal/minor-diagonal.component';
import { RowLineComponent } from './views/diagonals/row-line/row-line.component';
import { ColLineComponent } from './views/diagonals/col-line/col-line.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { GameComponent } from './views/game/game.component';
import { AppRoutingModule } from './app.routing';
import { HomeAuthGuard } from './service/home-auth-guard.service';
import { NewGameAuthGuard } from './service/new-game-auth-guard.service';

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
    NewGameComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
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
    },
    HomeAuthGuard,
    NewGameAuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
