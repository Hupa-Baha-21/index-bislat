import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BislatInputComponent } from './bislat-input.component';

describe('BislatInputComponent', () => {
  let component: BislatInputComponent;
  let fixture: ComponentFixture<BislatInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BislatInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BislatInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
