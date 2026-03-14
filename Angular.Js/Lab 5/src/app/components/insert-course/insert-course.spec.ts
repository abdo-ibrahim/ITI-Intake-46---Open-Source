import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCourse } from './insert-course';

describe('InsertCourse', () => {
  let component: InsertCourse;
  let fixture: ComponentFixture<InsertCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertCourse],
    }).compileComponents();

    fixture = TestBed.createComponent(InsertCourse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
