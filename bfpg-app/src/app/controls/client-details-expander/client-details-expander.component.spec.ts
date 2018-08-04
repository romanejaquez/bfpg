import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsExpanderComponent } from './client-details-expander.component';

describe('ClientDetailsExpanderComponent', () => {
  let component: ClientDetailsExpanderComponent;
  let fixture: ComponentFixture<ClientDetailsExpanderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDetailsExpanderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsExpanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
