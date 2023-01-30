import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AWSService } from '../service/aws.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  rows: number = 3;
  columns: number = 3;
  adjacents: number = 3;

  constructor(private _aws: AWSService) { }

  ngOnInit(): void {
  }

  startGame() {
    const text = 'Test message';
    const toBeShared = {
      text,
    };
    if (navigator.share) {
      navigator
        .share({
          ...toBeShared
        })
        .then(() => console.log("Share was successful."))
        .catch((error: DOMException) =>
          alert(
            `Sharing failed! Code: ${error.code} | Name: ${
              error.message
            } | Message: ${error.message}`
          )
        );
    } else {
      alert("Your browser doesn't support the Share Intent");
    }
  }

}
