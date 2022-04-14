import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserinfoComponent } from './get-userinfo.component';

describe('GetUserinfoComponent', () => {
  let component: GetUserinfoComponent;
  let fixture: ComponentFixture<GetUserinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetUserinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetUserinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
