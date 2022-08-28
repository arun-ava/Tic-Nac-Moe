import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinorDiagonalComponent } from './minor-diagonal.component';

describe('MinorDiagonalComponent', () => {
  let component: MinorDiagonalComponent;
  let fixture: ComponentFixture<MinorDiagonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinorDiagonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinorDiagonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
