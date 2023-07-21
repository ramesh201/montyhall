import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorPageComponent } from './door-page.component';

describe('DoorPageComponent', () => {
  let component: DoorPageComponent;
  let fixture: ComponentFixture<DoorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoorPageComponent]
    });
    fixture = TestBed.createComponent(DoorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
