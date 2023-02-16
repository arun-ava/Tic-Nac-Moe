import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'NicNacNoe';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    this.matIconRegistry.addSvgIcon(
      "cross",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/cross.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "circle",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/circle.svg")
    );
  }

  startGame() {}

  ngOnInit(): void {
    const subject = webSocket('wss://iq9iajf7xc.execute-api.us-west-1.amazonaws.com/production');
 
    subject.subscribe();
    // Note that at least one consumer has to subscribe to the created subject - otherwise "nexted" values will be just buffered and not sent,
    // since no connection was established!
    
    subject.next({ action: 'sendMessage', message: 'some message from angular 1' });
    subject.next({ action: 'sendMessage', message: 'some message from angular 2' });
    subject.next({ action: 'sendMessage', message: 'some message from angular 3' });
    subject.next({ action: 'sendMessage', message: 'some message from angular 4' });
    subject.unsubscribe();
  }
  
}
