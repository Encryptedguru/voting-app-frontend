import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspirantComponent } from './aspirant.component';

describe('AspirantComponent', () => {
  let component: AspirantComponent;
  let fixture: ComponentFixture<AspirantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AspirantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AspirantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
