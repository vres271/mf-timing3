import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacerSelectComponent } from './racer-select.component';

describe('RacerSelectComponent', () => {
  let component: RacerSelectComponent;
  let fixture: ComponentFixture<RacerSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RacerSelectComponent]
    });
    fixture = TestBed.createComponent(RacerSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
