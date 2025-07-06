import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuersBonds } from './issuers-bonds';

describe('IssuersBonds', () => {
  let component: IssuersBonds;
  let fixture: ComponentFixture<IssuersBonds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuersBonds]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuersBonds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
