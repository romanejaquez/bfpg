import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentslistComponent } from './paymentslist.component';

describe('PaymentslistComponent', () => {
  let component: PaymentslistComponent;
  let fixture: ComponentFixture<PaymentslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
