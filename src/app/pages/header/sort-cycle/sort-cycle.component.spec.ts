import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortCycleComponent } from './sort-cycle.component';

describe('SortCycleComponent', () => {
  let component: SortCycleComponent;
  let fixture: ComponentFixture<SortCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortCycleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
