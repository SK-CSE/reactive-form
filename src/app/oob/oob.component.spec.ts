import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OobComponent } from './oob.component';

describe('OobComponent', () => {
  let component: OobComponent;
  let fixture: ComponentFixture<OobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
