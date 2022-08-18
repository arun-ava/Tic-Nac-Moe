import { Component, OnInit } from '@angular/core';

/**
 * Events - 
 * 1> Set row
 * 2> Set column
 * 3> Make move
 */
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board = [['1','1'], ['2','2']];
  
  constructor() { }

  ngOnInit(): void {
  }

}
