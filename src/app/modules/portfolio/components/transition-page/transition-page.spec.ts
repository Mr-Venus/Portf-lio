import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionPage } from './transition-page';

describe('TransitionPage', () => {
  let component: TransitionPage;
  let fixture: ComponentFixture<TransitionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransitionPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TransitionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
