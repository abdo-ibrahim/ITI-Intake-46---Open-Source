-- Question 1
-- o Write a query that enables the students to view their results per course 

select s.student_id, concat(
        s.first_name, ' ', s.last_name
    ) as name, c.course_id, c.name as course_name, sc.final_grade, sc.academic_year, sc.semester
from
    students s
    join student_course sc on s.student_id = sc.student_id
    join courses c on sc.course_id = c.course_id;

-- Question 2
-- Write a query that enables the head of department to see evaluation of each course and professor.
select
    d.name AS department_name,
    c.name AS course_name,
    p.first_name AS professor_first_name,
    p.last_name AS professor_last_name,
    ce.rating AS course_rating,
    pe.rating AS professor_rating,
    ce.comment AS course_comment,
    pe.comment AS professor_comment
from
    departments d
    join professors p on p.department_id = d.department_id
    join course_professor cp on cp.professor_id = p.professor_id
    join courses c on cp.course_id = c.course_id
    left join course_evaluation ce on ce.course_id = c.course_id
    left join professor_evaluation pe on pe.professor_id = p.professor_id
    and pe.course_id = c.course_id
where
    d.head_professor_id = 1;


-- Question 3
-- o Write a query that enables you to get top 10 high scores per course 

select 
    se.student_id,
    CONCAT(st.first_name, ' ', st.last_name) as student_name,
    se.exam_id,
    se.total_score
from student_exams se
join exams e on se.exam_id = e.exam_id
join students st on se.student_id = st.student_id
where e.course_id = 1 -- course_id
order BY se.total_score desc
limit 10;

-- Question 4
-- Write a query to get the highest evaluation professor from the set of  professors teaching the same course
SELECT 
    pe.professor_id,
    CONCAT(p.first_name, ' ', p.last_name) AS professor_name,
    AVG(pe.rating) AS avg_rating
FROM professor_evaluation pe
JOIN professors p ON pe.professor_id = p.professor_id
WHERE pe.course_id = 1 -- coure_id
GROUP BY pe.professor_id
ORDER BY avg_rating DESC
LIMIT 1;






-- get all data
select * from departments;
select * from professors;
select * from students;
select * from courses;
select * from questions;
select * from exams;
select * from student_course;
select * from course_professor;
select * from exam_questions;
select * from student_exams;
select * from course_evaluation;
select * from professor_evaluation;
select * from exam_answer;