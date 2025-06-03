import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorPopupComponent } from './sensor-popup.component';

describe('SensorPopupComponent', () => {
  let component: SensorPopupComponent;
  let fixture: ComponentFixture<SensorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
