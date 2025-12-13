drop database system_exam;

create database system_exam;

use system_exam;

set foreign_key_checks = 0;

create table departments (
    department_id int auto_increment primary key,
    head_professor_id int,
    name varchar(100) not null,
    building varchar(100),
    floor int,
    phone varchar(15),
    level int,
    Foreign Key (head_professor_id) REFERENCES professors (professor_id)
);

create table students (
    student_id int auto_increment primary key,
    department_id int not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(100) unique not null,
    password varchar(100) not null,
    level int,
    degree varchar(50),
    enrollment_date date,
    date_of_birth date,
    gender enum('male', 'female'),
    city varchar(50),
    constraint fk_department foreign key (department_id) references departments (department_id)
);

create table professors (
    professor_id int auto_increment primary key,
    department_id int not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(100) unique not null,
    phone varchar(15),
    degree varchar(100),
    specialization varchar(100),
    office_number varchar(20),
    joining_date date,
    constraint fk_professor_department foreign key (department_id) references departments (department_id)
);

create table courses (
    course_id int auto_increment primary key,
    department_id int not null,
    name varchar(100) not null,
    code varchar(20) unique not null,
    credit_hours int,
    semester enum('Fall', 'Spring', 'Summer'),
    level int,
    description text,
    foreign key (department_id) references departments (department_id) on update cascade on delete cascade
);

create table questions (
    question_id int auto_increment primary key,
    professor_id int,
    text text not null,
    type enum(
        'MCQ',
        'True/False',
        'written'
    ) not null,
    marks int,
    creation_date date,
    Foreign Key (professor_id) REFERENCES professors (professor_id)
);

INSERT INTO questions (question_id, professor_id, text, type, marks, creation_date) VALUES
(1, 1, 'ما هو تعريف الخوارزمية؟ اذكر مثالاً عملياً.', 'written', 10, '2024-01-05'),
(2, 1, 'في لغة C++ أي نوع بيانات يستخدم لتخزين الأعداد الصحيحة؟\nA) int\nB) float\nC) string\nD) bool', 'MCQ', 5, '2024-01-06'),
(3, 2, 'SQL عبارة عن لغة تُستخدم لإدارة قواعد البيانات العلائقية. (True/False)', 'True/False', 2, '2024-01-07'),
(4, 3, 'اذكر الفرق بين compilation و interpretation مع مثال واحد لكل منهما.', 'written', 10, '2024-01-08'),
(5, 4, 'أي من التالي يمثل طريقة شائعة لتقييم نموذج تعلم الآلة؟\nA) Cross-Validation\nB) FTP\nC) DNS\nD) SSH', 'MCQ', 10, '2024-01-09'),
(6, 5, 'شبكات OSI و TCP/IP لديهما نفس عدد الطبقات. (True/False)', 'True/False', 3, '2024-01-10'),
(7, 6, 'اشرح بإيجاز مفهوم الـ "Threat model" في أمن المعلومات ولماذا هو مهم.', 'written', 15, '2024-01-11'),
(8, 7, 'ما نتيجة  ∫ x^2 dx ؟\nA) x^3/3 + C\nB) 2x + C\nC) ln(x) + C\nD) x^2 + C', 'MCQ', 5, '2024-01-12'),
(9, 8, 'في الحركة المستقيمة بتسارع ثابت، تكون السرعة الابتدائية تساوي الصفر دائماً. (True/False)', 'True/False', 2, '2024-01-13'),
(10, 9, 'صمم دائرة بسيطة لتقوية إشارة صغيرة واذكر مكوناتك الأساسية مع شرح موجز.', 'written', 20, '2024-01-14');

create table exams (
    exam_id int auto_increment primary key,
    professor_id int,
    course_id int not null,
    title varchar(100) not null,
    exam_date date,
    duration_minutes int,
    total_marks int,
    status enum(
        'scheduled',
        'completed',
        'canceled'
    ),
    foreign key (professor_id) references professors (professor_id),
    foreign key (course_id) references courses (course_id) on update cascade on delete cascade
);

create table student_course (
    student_id int,
    course_id int,
    enroll_date date,
    final_grade float,
    academic_year varchar(20),
    semester enum('Fall', 'Spring', 'Summer'),
    status enum(
        'enrolled',
        'completed',
        'dropped'
    ),
    primary key (student_id, course_id),
    foreign key (student_id) references students (student_id) on update cascade on delete cascade,
    foreign key (course_id) references courses (course_id) on update cascade on delete cascade
);

create table course_professor (
    course_id int,
    professor_id int,
    assignment_date date,
    role enum(
        'lecturer',
        'assistant',
        'coordinator'
    ),
    semester enum('Fall', 'Spring', 'Summer'),
    year int,
    primary key (course_id, professor_id),
    foreign key (course_id) references courses (course_id) on update cascade on delete cascade,
    foreign key (professor_id) references professors (professor_id) on update cascade on delete cascade
);

create table exam_questions (
    exam_id int,
    question_id int,
    question_order int,
    points int,
    primary key (exam_id, question_id),
    foreign key (exam_id) references exams (exam_id) on update cascade on delete cascade,
    foreign key (question_id) references questions (question_id) on update cascade on delete cascade
);

create table student_exams (
    student_id int,
    exam_id int,
    start_time datetime,
    end_time datetime,
    total_score float,
    status enum(
        'in_progress',
        'completed',
        'not_started'
    ),
    attempt_date date,
    time_taken int,
    primary key (student_id, exam_id),
    foreign key (student_id) references students (student_id) on update cascade on delete cascade,
    foreign key (exam_id) references exams (exam_id) on update cascade on delete cascade
);

create table exam_answer (
    student_id int,
    exam_id int,
    question_id int,
    answer_text text,
    is_correct boolean,
    marks_obtained float,
    primary key (
        student_id,
        exam_id,
        question_id
    ),
    foreign key (student_id) references students (student_id) on update cascade on delete cascade,
    foreign key (question_id) references questions (question_id) on update cascade on delete cascade
);

create table course_evaluation (
    student_id int,
    course_id int,
    rating int,
    comment text,
    evaluation_date date,
    primary key (student_id, course_id),
    foreign key (student_id) references students (student_id) on update cascade on delete cascade,
    foreign key (course_id) references courses (course_id) on update cascade on delete cascade
);

create table professor_evaluation (
    student_id int,
    professor_id int,
    course_id int,
    rating int,
    comment text,
    evaluation_date date,
    primary key (
        student_id,
        professor_id,
        course_id
    ),
    foreign key (student_id) references students (student_id) on update cascade on delete cascade,
    foreign key (professor_id) references professors (professor_id) on update cascade on delete cascade,
    foreign key (course_id) references courses (course_id) on update cascade on delete cascade
);

set foreign_key_checks = 0;

INSERT INTO departments (department_id, head_professor_id, name, building, floor, phone, level)
VALUES
(1, NULL, 'Computer Science', 'A', 2, '0123456789', 4),
(2, NULL, 'Information Systems', 'A', 3, '0123456790', 4),
(3, NULL, 'Software Engineering', 'B', 1, '0123456791', 4),
(4, NULL, 'AI Department', 'B', 2, '0123456792', 4),
(5, NULL, 'Network Engineering', 'C', 1, '0123456793', 4),
(6, NULL, 'Cyber Security', 'C', 2, '0123456794', 4),
(7, NULL, 'Mathematics', 'D', 1, '0123456795', 4),
(8, NULL, 'Physics', 'D', 2, '0123456796', 4),
(9, NULL, 'Electronics', 'E', 1, '0123456797', 4),
(10, NULL, 'Bioinformatics', 'E', 2, '0123456798', 4);


INSERT INTO professors (professor_id, department_id, first_name, last_name, email, phone, degree, specialization, office_number, joining_date)
VALUES
(1, 1, 'Ahmed', 'Samir', 'ahmed1@uni.com', '0101111111', 'PhD', 'AI', 'A201', '2018-01-01'),
(2, 2, 'Mona', 'Hassan', 'mona2@uni.com', '0102222222', 'PhD', 'IS', 'A305', '2019-02-02'),
(3, 3, 'Ali', 'Farouk', 'ali3@uni.com', '0103333333', 'MSc', 'Software', 'B120', '2020-03-03'),
(4, 4, 'Sara', 'Fathi', 'sara4@uni.com', '0104444444', 'PhD', 'ML', 'B215', '2020-04-04'),
(5, 5, 'Khaled', 'Zaki', 'khaled5@uni.com', '0105555555', 'PhD', 'Networks', 'C110', '2017-05-05'),
(6, 6, 'Nour', 'Hany', 'nour6@uni.com', '0106666666', 'PhD', 'Cyber', 'C220', '2021-06-06'),
(7, 7, 'Youssef', 'Saleh', 'youssef7@uni.com', '0107777777', 'MSc', 'Math', 'D101', '2016-07-07'),
(8, 8, 'Mai', 'Kamal', 'mai8@uni.com', '0108888888', 'PhD', 'Physics', 'D204', '2015-08-08'),
(9, 9, 'Hassan', 'Sayed', 'hassan9@uni.com', '0109999999', 'MSc', 'Electronics', 'E102', '2022-09-09'),
(10, 10, 'Laila', 'Adel', 'laila10@uni.com', '0100000000', 'PhD', 'Bioinfo', 'E210', '2018-10-10');

UPDATE departments SET head_professor_id = department_id;

INSERT INTO students (student_id, department_id, first_name, last_name, email, password, level, degree, enrollment_date, date_of_birth, gender, city)
VALUES
(1, 1, 'Omar', 'Ali', 'omar1@uni.com', 'pass', 1, 'BSc', '2023-09-01', '2005-01-01', 'male', 'Cairo'),
(2, 1, 'Nada', 'Mahmoud', 'nada2@uni.com', 'pass', 1, 'BSc', '2023-09-01', '2005-02-02', 'female', 'Giza'),
(3, 2, 'Karim', 'Fathi', 'karim3@uni.com', 'pass', 2, 'BSc', '2022-09-01', '2004-03-03', 'male', 'Alex'),
(4, 3, 'Mariam', 'Samy', 'mariam4@uni.com', 'pass', 2, 'BSc', '2022-09-01', '2004-04-04', 'female', 'Cairo'),
(5, 4, 'Ehab', 'Yasser', 'ehab5@uni.com', 'pass', 3, 'BSc', '2021-09-01', '2003-05-05', 'male', 'Mansoura'),
(6, 5, 'Salma', 'Othman', 'salma6@uni.com', 'pass', 3, 'BSc', '2021-09-01', '2003-06-06', 'female', 'Cairo'),
(7, 6, 'Ziad', 'Fouad', 'ziad7@uni.com', 'pass', 4, 'BSc', '2020-09-01', '2002-07-07', 'male', 'Tanta'),
(8, 7, 'Aya', 'Said', 'aya8@uni.com', 'pass', 4, 'BSc', '2020-09-01', '2002-08-08', 'female', 'Giza'),
(9, 8, 'Hany', 'Lotfy', 'hany9@uni.com', 'pass', 4, 'BSc', '2019-09-01', '2001-09-09', 'male', 'Cairo'),
(10, 9, 'Dina', 'Nabil', 'dina10@uni.com', 'pass', 4, 'BSc', '2019-09-01', '2001-10-10', 'female', 'Alex');

INSERT INTO courses (course_id, department_id, name, code, credit_hours, semester, level, description)
VALUES
(1, 1, 'Intro to Programming', 'CS101', 3, 'Fall', 1, 'Basics of programming'),
(2, 1, 'Data Structures', 'CS201', 3, 'Spring', 2, 'DS concepts'),
(3, 2, 'Database Systems', 'IS101', 3, 'Fall', 1, 'DB basics'),
(4, 3, 'Software Engineering', 'SE301', 3, 'Spring', 3, 'SE concepts'),
(5, 4, 'Machine Learning', 'AI401', 3, 'Fall', 4, 'ML intro'),
(6, 5, 'Networking I', 'NE101', 3, 'Fall', 1, 'Basics of networking'),
(7, 6, 'Cyber Security Intro', 'CY101', 3, 'Spring', 1, 'Cyber basics'),
(8, 7, 'Calculus I', 'MA101', 3, 'Fall', 1, 'Math basics'),
(9, 8, 'Physics I', 'PH101', 3, 'Fall', 1, 'Physics basics'),
(10, 9, 'Electronics I', 'EL101', 3, 'Spring', 1, 'Electronics basics');


INSERT INTO student_course (student_id, course_id, enroll_date, final_grade, academic_year, semester, status)
VALUES
(1,1,'2023-09-10',NULL,'2023','Fall','enrolled'),
(2,1,'2023-09-10',NULL,'2023','Fall','enrolled'),
(3,3,'2022-09-10',85,'2022','Fall','completed'),
(4,4,'2022-09-10',90,'2022','Spring','completed'),
(5,5,'2021-09-10',70,'2021','Fall','completed'),
(6,6,'2021-09-10',88,'2021','Fall','completed'),
(7,7,'2020-09-10',93,'2020','Spring','completed'),
(8,8,'2020-09-10',65,'2020','Fall','completed'),
(9,9,'2019-09-10',77,'2019','Fall','completed'),
(10,10,'2019-09-10',80,'2019','Spring','completed');

INSERT INTO course_professor (course_id, professor_id, assignment_date, role, semester, year)
VALUES
(1,1,'2023-09-01','lecturer','Fall',2023),
(2,1,'2024-02-01','lecturer','Spring',2024),
(3,2,'2023-09-01','lecturer','Fall',2023),
(4,3,'2024-02-01','lecturer','Spring',2024),
(5,4,'2023-09-01','lecturer','Fall',2023),
(6,5,'2023-09-01','lecturer','Fall',2023),
(7,6,'2024-02-01','lecturer','Spring',2024),
(8,7,'2023-09-01','lecturer','Fall',2023),
(9,8,'2023-09-01','lecturer','Fall',2023),
(10,9,'2024-02-01','lecturer','Spring',2024);

INSERT INTO exams (exam_id, professor_id, course_id, title, exam_date, duration_minutes, total_marks, status)
VALUES
(1,1,1,'Midterm CS101','2024-03-10',90,50,'scheduled'),
(2,1,2,'Final CS201','2024-06-20',120,100,'scheduled'),
(3,2,3,'Quiz 1 DB','2024-04-01',30,20,'completed'),
(4,3,4,'Midterm SE','2024-03-15',90,50,'completed'),
(5,4,5,'ML Final','2024-06-30',120,100,'scheduled'),
(6,5,6,'Networking Quiz','2024-03-22',20,15,'completed'),
(7,6,7,'Cyber Midterm','2024-03-18',60,40,'scheduled'),
(8,7,8,'Calc Final','2024-06-25',120,100,'completed'),
(9,8,9,'Physics Midterm','2024-03-12',60,40,'scheduled'),
(10,9,10,'Electronics Final','2024-06-27',120,100,'completed');

INSERT INTO exam_questions (exam_id, question_id, question_order, points)
VALUES
(1,1,1,5),
(1,2,2,5),
(2,3,1,10),
(3,4,1,5),
(4,5,1,10),
(5,6,1,20),
(6,7,1,5),
(7,8,1,10),
(8,9,1,20),
(9,10,1,10);

INSERT INTO student_exams (student_id, exam_id, start_time, end_time, total_score, status, attempt_date, time_taken)
VALUES
(1,1,'2024-03-10 10:00','2024-03-10 11:30',45,'completed','2024-03-10',90),
(2,1,'2024-03-10 10:00','2024-03-10 11:30',40,'completed','2024-03-10',90),
(3,3,'2024-04-01 09:00','2024-04-01 09:30',18,'completed','2024-04-01',30),
(4,4,'2024-03-15 10:00','2024-03-15 11:30',42,'completed','2024-03-15',90),
(5,5,NULL,NULL,NULL,'not_started',NULL,NULL),
(6,6,'2024-03-22 12:00','2024-03-22 12:20',12,'completed','2024-03-22',20),
(7,7,'2024-03-18 11:00','2024-03-18 12:00',30,'completed','2024-03-18',60),
(8,8,'2024-06-25 14:00','2024-06-25 16:00',80,'completed','2024-06-25',120),
(9,9,'2024-03-12 09:00','2024-03-12 10:00',35,'completed','2024-03-12',60),
(10,10,'2024-06-27 13:00','2024-06-27 15:00',90,'completed','2024-06-27',120);

INSERT INTO exam_answer (student_id, exam_id, question_id, answer_text, is_correct, marks_obtained)
VALUES
(1,1,1,'Answer A',1,5),
(1,1,2,'Answer B',1,5),
(2,1,1,'Answer C',0,0),
(2,1,2,'Answer A',1,5),
(3,3,4,'Answer A',1,5),
(4,4,5,'Answer B',1,10),
(6,6,7,'Ans',1,5),
(7,7,8,'Ans',1,10),
(8,8,9,'Ans',1,20),
(9,9,10,'Ans',1,10);

INSERT INTO course_evaluation (student_id, course_id, rating, comment, evaluation_date)
VALUES
(1,1,5,'Very good','2024-01-10'),
(2,1,4,'Good','2024-01-11'),
(3,3,5,'Excellent','2023-12-20'),
(4,4,4,'Nice','2024-01-05'),
(5,5,5,'Perfect','2024-02-01'),
(6,6,4,'Good','2024-02-02'),
(7,7,5,'Great','2024-02-05'),
(8,8,3,'Normal','2024-02-10'),
(9,9,4,'Good','2024-03-01'),
(10,10,5,'Excellent','2024-03-05');

INSERT INTO professor_evaluation (student_id, professor_id, course_id, rating, comment, evaluation_date)
VALUES
(1,1,1,5,'Great teaching','2024-01-10'),
(2,1,1,4,'Good explanation','2024-01-10'),
(3,2,3,5,'Excellent','2023-12-20'),
(4,3,4,4,'Good','2024-01-05'),
(5,4,5,5,'Perfect','2024-02-01'),
(6,5,6,4,'Nice','2024-02-02'),
(7,6,7,5,'Great','2024-02-05'),
(8,7,8,3,'Ok','2024-02-10'),
(9,8,9,4,'Good','2024-03-01'),
(10,9,10,5,'Excellent','2024-03-05');


set foreign_key_checks = 1;

