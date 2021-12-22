import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BislatListComponent } from './bislat-list.component';

describe('BislatListComponent', () => {
  let component: BislatListComponent;
  let fixture: ComponentFixture<BislatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BislatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BislatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
