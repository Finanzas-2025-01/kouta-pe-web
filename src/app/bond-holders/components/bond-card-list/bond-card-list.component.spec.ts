import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondCardListComponent } from './bond-card-list.component';

describe('BondCardListComponent', () => {
  let component: BondCardListComponent;
  let fixture: ComponentFixture<BondCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BondCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BondCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
