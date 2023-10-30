import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetaspirantsComponent } from './getaspirants.component';

describe('GetaspirantsComponent', () => {
  let component: GetaspirantsComponent;
  let fixture: ComponentFixture<GetaspirantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetaspirantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetaspirantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
