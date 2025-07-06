import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondDialogComponent } from './bond-dialog-component';

describe('BondDialogComponent', () => {
  let component: BondDialogComponent;
  let fixture: ComponentFixture<BondDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BondDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BondDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
