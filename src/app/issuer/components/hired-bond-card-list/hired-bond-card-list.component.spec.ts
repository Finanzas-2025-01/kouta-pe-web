import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiredBondCardListComponent } from './hired-bond-card-list.component';

describe('HiredBondCardListComponent', () => {
  let component: HiredBondCardListComponent;
  let fixture: ComponentFixture<HiredBondCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HiredBondCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiredBondCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
