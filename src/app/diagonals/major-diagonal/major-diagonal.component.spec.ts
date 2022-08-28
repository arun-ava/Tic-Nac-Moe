import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorDiagonalComponent } from './major-diagonal.component';

describe('MajorDiagonalComponent', () => {
  let component: MajorDiagonalComponent;
  let fixture: ComponentFixture<MajorDiagonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorDiagonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorDiagonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
