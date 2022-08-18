import { Component, Input, OnInit } from '@angular/core';
import { IBoard } from '../models/Board';

/**
 * Events -
 * 1> Start game
 * 
 */
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  startGame() {}

}
