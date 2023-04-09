import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { UserRegistrationComponent } from './views/user-registration/user-registration.component';
import { AuthGuard } from './service/guards/auth-guard.service';
import { NewGameComponent } from './views/new-game/new-game.component';

const routes: Routes = [
    
    {
        path: 'newgame',
        component: NewGameComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'home/:gameid',
        component: HomeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        component: UserRegistrationComponent,
    },
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: []
  })
  export class AppRoutingModule {
  }
  