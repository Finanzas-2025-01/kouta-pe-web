import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bonds } from './bonds';

describe('Bonds', () => {
  let component: Bonds;
  let fixture: ComponentFixture<Bonds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bonds]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bonds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
