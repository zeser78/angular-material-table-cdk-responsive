import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserDataComponent } from './login-user-data.component';

describe('LoginUserDataComponent', () => {
  let component: LoginUserDataComponent;
  let fixture: ComponentFixture<LoginUserDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginUserDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
