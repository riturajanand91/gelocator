import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPointsComponent } from './map-points.component';

describe('MapPointsComponent', () => {
  let component: MapPointsComponent;
  let fixture: ComponentFixture<MapPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapPointsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
