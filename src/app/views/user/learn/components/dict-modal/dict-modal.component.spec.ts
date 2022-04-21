import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictModalComponent } from './dict-modal.component';

describe('DictModalComponent', () => {
  let component: DictModalComponent;
  let fixture: ComponentFixture<DictModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
