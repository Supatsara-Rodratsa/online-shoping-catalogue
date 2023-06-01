import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationArrowComponent } from './pagination-arrow.component';

describe('PaginationArrowComponent', () => {
  let component: PaginationArrowComponent;
  let fixture: ComponentFixture<PaginationArrowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationArrowComponent],
    });
    fixture = TestBed.createComponent(PaginationArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
