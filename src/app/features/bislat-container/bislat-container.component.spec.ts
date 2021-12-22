import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BislatContainerComponent } from './bislat-container.component';

describe('BislatContainerComponent', () => {
  let component: BislatContainerComponent;
  let fixture: ComponentFixture<BislatContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BislatContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BislatContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
