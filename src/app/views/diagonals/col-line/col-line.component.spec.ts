import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColLineComponent } from './col-line.component';

describe('ColLineComponent', () => {
  let component: ColLineComponent;
  let fixture: ComponentFixture<ColLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
