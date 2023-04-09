import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Local_Storage_Account, Local_Storage_Prefix } from './enums/storage-keys';
import { initiateSignInAccountActionCreator } from './state/actions/account.actions';
import { Router, ParamMap, ActivatedRoute, NavigationStart } from '@angular/router';
import { applicationFirstRouteSelector } from './state/selectors/app-route.selector';
import { combineLatest, merge, mergeAll, pipe, tap } from 'rxjs';
import { setFirstUrlActionCreator } from './state/actions/app-route.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'NicNacNoe';

  constructor(
    private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer, 
    private _store: Store,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.matIconRegistry.addSvgIcon(
      "cross",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/cross.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "circle",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/circle.svg")
    );

    const storageValue = localStorage.getItem(Local_Storage_Prefix+Local_Storage_Account);
    if(storageValue) {
      this._store.dispatch(initiateSignInAccountActionCreator({
        account: JSON.parse(storageValue)
      }));
    }

    combineLatest([
      this._store.select(applicationFirstRouteSelector),
      this._router.events
    ]).subscribe((val) => {
      if(val[1] instanceof NavigationStart && !val[0]) {
        this._store.dispatch(setFirstUrlActionCreator({
          url: val[1].url
        }));
      }
    });
  }

  startGame() {}

  ngOnInit(): void {
    // const subject = webSocket('wss://iq9iajf7xc.execute-api.us-west-1.amazonaws.com/production');
 
    // subject.subscribe({
    //   next: msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
    //   error: err => console.log('websocket error ', err), // Called if at any point WebSocket API signals some kind of error.
    //   complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    //  });
    // Note that at least one consumer has to subscribe to the created subject - otherwise "nexted" values will be just buffered and not sent,
    // since no connection was established!
    
    // subject.next({ action: 'sendMessage', message: 'some message from angular 1' });
    // subject.next({ action: 'sendMessage', message: 'some message from angular 2' });
    // subject.next({ action: 'sendMessage', message: 'some message from angular 3' });
    // subject.next({ action: 'sendMessage', message: 'some message from angular 4' });
    // subject.unsubscribe();
  }
  
}
