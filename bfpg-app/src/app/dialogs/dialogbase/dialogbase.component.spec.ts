import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogbaseComponent } from './dialogbase.component';

describe('DialogbaseComponent', () => {
  let component: DialogbaseComponent;
  let fixture: ComponentFixture<DialogbaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogbaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
