import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCounsellingSessionComponent } from './admin-counselling-session.component';

describe('AdminCounsellingSessionComponent', () => {
  let component: AdminCounsellingSessionComponent;
  let fixture: ComponentFixture<AdminCounsellingSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCounsellingSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCounsellingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
