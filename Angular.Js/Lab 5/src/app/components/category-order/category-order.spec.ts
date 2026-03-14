import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryOrder } from './category-order';

describe('CategoryOrder', () => {
  let component: CategoryOrder;
  let fixture: ComponentFixture<CategoryOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryOrder],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
