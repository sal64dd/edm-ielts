import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockModalComponent } from './mock-modal.component';

describe('MockModalComponent', () => {
  let component: MockModalComponent;
  let fixture: ComponentFixture<MockModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
