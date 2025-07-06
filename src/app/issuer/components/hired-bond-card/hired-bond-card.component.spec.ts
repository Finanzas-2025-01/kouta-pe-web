import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiredBondCardComponent } from './hired-bond-card.component';

describe('HiredBondCardComponent', () => {
  let component: HiredBondCardComponent;
  let fixture: ComponentFixture<HiredBondCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HiredBondCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiredBondCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
