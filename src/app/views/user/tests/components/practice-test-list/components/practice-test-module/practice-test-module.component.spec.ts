import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeTestModuleComponent } from './practice-test-module.component';

describe('PracticeTestModuleComponent', () => {
  let component: PracticeTestModuleComponent;
  let fixture: ComponentFixture<PracticeTestModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeTestModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeTestModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
