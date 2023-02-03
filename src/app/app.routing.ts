import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { UserRegistrationComponent } from './views/user-registration/user-registration.component';
import { HomeAuthGuard } from './service/home-auth-guard.service';
import { NewGameComponent } from './views/new-game/new-game.component';
import { NewGameAuthGuard } from './service/new-game-auth-guard.service';

const routes: Routes = [
    {
        path: 'auth',
        component: UserRegistrationComponent,
    },
    {
        path: 'newgame',
        component: NewGameComponent,
        canActivate: [HomeAuthGuard],
    },
    {
        path: '**',
        component: HomeComponent,
        canActivate: [HomeAuthGuard],
    }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
  })
  export class AppRoutingModule {
  }
  