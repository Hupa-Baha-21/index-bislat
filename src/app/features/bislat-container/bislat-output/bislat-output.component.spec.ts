import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BislatOutputComponent } from './bislat-output.component';

describe('BislatOutputComponent', () => {
  let component: BislatOutputComponent;
  let fixture: ComponentFixture<BislatOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BislatOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BislatOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
