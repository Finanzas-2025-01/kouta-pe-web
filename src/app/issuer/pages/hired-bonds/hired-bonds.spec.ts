import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiredBonds } from './hired-bonds';

describe('HiredBonds', () => {
  let component: HiredBonds;
  let fixture: ComponentFixture<HiredBonds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HiredBonds]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiredBonds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
