import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCounsellingSessionComponent } from './user-counselling-session.component';

describe('UserCounsellingSessionComponent', () => {
  let component: UserCounsellingSessionComponent;
  let fixture: ComponentFixture<UserCounsellingSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCounsellingSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCounsellingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
