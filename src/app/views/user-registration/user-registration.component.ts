import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, finalize, map, of } from 'rxjs';
import { AWSService } from '../../service/aws.service';
import { initiateSignInAccountActionCreator } from '../../state/actions/account.actions';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  username: string = 'a';
  password: string = 'a';

  constructor(private _aws: AWSService, private _store: Store, private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this._aws.createUser(this.username, this.password)
    .pipe(
          map((val) => {
              console.log("component Success. User created ", val);
              return val;
          }),
          catchError(err => {
              console.log("component catchError Error during creating user ", err);
              return of(err);
          }),
          finalize(() => {
              console.log("component Request complete");
          })
      )
      .subscribe();
  }

  loginUser() {
    this._store.dispatch(initiateSignInAccountActionCreator({
      account: {
        username: this.username,
        password: this.password,
      }
    }));

  }
}
