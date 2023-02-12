import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { UserRegistrationComponent } from './views/user-registration/user-registration.component';
import { AuthGuard } from './service/auth-guard.service';
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
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        component: HomeComponent,
        canActivate: [AuthGuard],
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
  