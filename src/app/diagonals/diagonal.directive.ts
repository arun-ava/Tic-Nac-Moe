import { Directive, ElementRef, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from "@angular/core";
import { DiagonalType } from "./diagonal.types";

@Directive({
    selector: 'app-diagonal',
})
export class Diagonals implements OnChanges {
    
    @Input()
    diagonalType!: DiagonalType;

    constructor(private el: ElementRef, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {

        this.viewContainer.createEmbeddedView(this.templateRef);
    }

    ngOnChanges(changes: SimpleChanges): void {
        throw new Error("Method not implemented.");
    }
}