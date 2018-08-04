import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewrelativeComponent } from './newrelative.component';

describe('NewrelativeComponent', () => {
  let component: NewrelativeComponent;
  let fixture: ComponentFixture<NewrelativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewrelativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewrelativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
