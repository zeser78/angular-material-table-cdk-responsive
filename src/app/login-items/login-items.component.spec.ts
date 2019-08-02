import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginItemsComponent } from './login-items.component';

describe('LoginItemsComponent', () => {
  let component: LoginItemsComponent;
  let fixture: ComponentFixture<LoginItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
