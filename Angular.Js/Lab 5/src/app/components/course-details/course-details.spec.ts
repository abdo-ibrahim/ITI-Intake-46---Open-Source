import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetails } from './course-details';

describe('CourseDetails', () => {
  let component: CourseDetails;
  let fixture: ComponentFixture<CourseDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
