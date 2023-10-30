import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorsVotesComponent } from './competitors-votes.component';

describe('CompetitorsVotesComponent', () => {
  let component: CompetitorsVotesComponent;
  let fixture: ComponentFixture<CompetitorsVotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitorsVotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitorsVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
