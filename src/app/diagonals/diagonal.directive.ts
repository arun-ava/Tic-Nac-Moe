import { Directive, ElementRef, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { winningPositionsSelector } from '../state/selectors/game.selector';
import { DiagonalType } from "./diagonal.types";
import { distinctUntilChanged, filter, map } from 'rxjs';
import { WinDirection, WinPosition } from '../models/GameManager';
import { getMinorDiagonalLine } from './diagonal.utility';
import { ColLineComponent } from './col-line/col-line.component';
import { RowLineComponent } from './row-line/row-line.component';
import { MajorDiagonalComponent } from './major-diagonal/major-diagonal.component';
import { MinorDiagonalComponent } from './minor-diagonal/minor-diagonal.component';

@Directive({
    selector: '[appdiagonal]',
})
export class Diagonals implements OnInit {
    
    // // Row index
    // @Input()
    row!: number;

    // // Col index
    // @Input()
    col!: number;

    

    constructor(
        private el: ElementRef, 
        private templateRef: TemplateRef<any>, 
        private viewContainer: ViewContainerRef,
        private store: Store) {
        this.viewContainer.createEmbeddedView(this.templateRef);
    }

    @Input('appdiagonal') set appdiagonal(coords: any) {
        this.row = coords.row;
        this.col = coords.col;
    }

    ngOnInit(): void {
        this.store.select(winningPositionsSelector).
        pipe(
            distinctUntilChanged((p, c) => {
                return p.length !== c.length;
            }),
            map(val => val.filter( inner => inner.row === this. row && inner.col === this.col)),
            distinctUntilChanged(),
        ).subscribe((value: WinPosition[]) => {
            if(value.length) {
                if(value[0].windDirection === WinDirection.col) {
                    this.viewContainer.createComponent(ColLineComponent);
                } else if(value[0].windDirection === WinDirection.row) {
                    this.viewContainer.createComponent(RowLineComponent);
                } else if(value[0].windDirection === WinDirection.major) {
                    this.viewContainer.createComponent(MajorDiagonalComponent);
                } else if(value[0].windDirection === WinDirection.minor) {
                    this.viewContainer.createComponent(MinorDiagonalComponent);
                }
                
            }
        })
    }
}