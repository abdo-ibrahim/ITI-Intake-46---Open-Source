
drop database test;
create database test;
use test;

create table Departments (
    DNum int primary key,
    Dname varchar(255),
    MGRSSN int,
    MGRStart date
);

create table Employees (
	SSN int primary key,
	Fname varchar(50),
	Lname varchar(50),
	email varchar(100) unique,
	Address text,
	Salary float,
	BDATE date,
	Sex char(1) check (sex = 'M' or sex = 'F'),
	Dno int,
	Superssn int,
	foreign key (Superssn) references Employees(SSN),
    foreign key (Dno) references Departments(DNum)
);

alter table Departments
Add constraint fk_mgrsn foreign key(MGRSSN)
references Employees(SSN);


create table Projects (
	Pnumber int primary key,
	Pname varchar(50),
	Plocation varchar(100),
	City varchar(100),
	Dnum int,
	foreign key (Dnum) references Departments(Dnum)
);

create table Works_for (
	ESSN int,
	Pno int,
	Hours int,
    primary key (ESSN, Pno),
	foreign key (ESSN) references Employees(SSN),
	foreign key (Pno) references Projects(Pnumber)
);

create table Dependent (
	ESSN int,
	Dependent_name varchar(255),
	Sex char(1) check (Sex = 'M' or Sex = 'F'),
	Bdate date,
	foreign key (ESSN) references Employees(SSN)
);

set foreign_key_checks = 0;

insert into Departments (DNum, Dname, MGRSSN, MGRStart) values
(10, 'dp1', 223344, '2005-01-01'),
(20, 'dp2', 968574, '2006-03-01'),
(30, 'dp3', 512463, '2006-06-01');

insert into Employees (SSN, Fname, Lname, BDATE, Address, Sex, Salary, Superssn, Dno, email) values
(321654, 'amr', 'omran', '1963-09-14', '44 heliopolis cairo', 'M', 2500, null, null, 'amr.omran@email.com'),
(223344, 'kamel', 'mohamed', '1970-10-15', '38 mohy el dien abo el ezz st. cairo', 'M', 1800, 321654, 10, 'kamel.mohamed@email.com'),
(112233, 'ahmed', 'ali', '1965-01-01', '15 ali fahmy st. giza', 'M', 1300, 223344, 10, 'ahmed.ali@email.com'),
(123456, 'hanaa', 'sobhy', '1973-03-18', '38 abdel khalik tharwat st. downtown cairo', 'F', 800, 223344, 10, 'hanaa.sobhy@email.com'),
(968574, 'noha', 'mohamed', '1975-02-01', '55 orabi st. el mohandiseen cairo', 'F', 1600, 321654, 20, 'noha.mohamed@email.com'),
(512463, 'edward', 'hanna', '1972-08-19', '18 abaas el 3akaad st. nasr city cairo', 'M', 1500, 321654, 30, 'edward.hanna@email.com'),
(669955, 'mariam', 'adel', '1982-06-12', '269 el-haram st. giza', 'F', 750, 512463, 20, 'mariam.adel@email.com'),
(521634, 'maged', 'raoof', '1980-04-06', '18 kholosi st. shobra cairo', 'M', 1000, 968574, 30, 'maged.raoof@email.com');


insert into Projects (Pnumber, Pname, Plocation, City, Dnum) values
(100, 'al solimaniah', 'cairo_alex road', 'alex', 10),
(200, 'al rabwah', '6th of october city', 'giza', 10),
(300, 'al rawdah', 'zaied city', 'giza', 10),
(400, 'al rowad', 'cairo_faiyom road', 'giza', 20),
(500, 'al rehab', 'nasr city', 'cairo', 30),
(600, 'pitcho american', 'maady', 'cairo', 30),
(700, 'ebad el rahman', 'ring road', 'cairo', 20);

insert into Works_for (ESSN, Pno, Hours) values
(223344, 100, 10),
(223344, 200, 10),
(223344, 300, 10),
(112233, 100, 40),
(968574, 400, 15),
(968574, 700, 15),
(968574, 300, 10),
(669955, 400, 20),
(223344, 500, 10),
(669955, 700, 7),
(669955, 300, 10),
(512463, 500, 10),
(512463, 600, 25),
(521634, 500, 10),
(521634, 600, 20),
(521634, 300, 6),
(521634, 400, 4);

insert into Dependent (ESSN, Dependent_name, Sex, Bdate) values
(112233, 'hala saied ali', 'F', '1970-10-18'),
(223344, 'ahmed kamel shawki', 'M', '1998-03-27'),
(223344, 'mona adel mohamed', 'F', '1975-04-25'),
(321654, 'ramy amr omran', 'M', '1990-01-26'),
(321654, 'omar amr omran', 'M', '1993-03-30'),
(321654, 'sanaa gawish', 'F', '1973-05-16'),
(512463, 'sara edward', 'F', '2001-09-15'),
(512463, 'nora ghaly', 'F', '1976-06-22');

set foreign_key_checks = 1;



-- 1.	Insert your personal data to the employee table as a new employee in department number 30, SSN = 102672, Superssn = 112233.
insert into Employees (SSN, Fname, Lname, BDATE, Address, Sex, Salary, Superssn, Dno, email) values
(102672, 'abdo', 'ibrahim', '2002-05-10', '12 el tahrir st. giza', 'M', 2000, 112233, 30, 'abdo.ibrahim@email.com');
-- 2.	Insert another employee with, personal data your friend as new employee in department number 30, SSN = 102660, but don’t enter any value for salary or supervisor number to him.
insert into Employees (SSN, Fname, Lname, BDATE, Address, Sex, Salary, Superssn, Dno, email) values
(102660, 'omar', 'mohamed', '2003-07-15', '25 el haram st. giza', 'M', null, null, 30, 'omar.mohamed@email.com');
-- 3.	In the department table insert new department called "DEPT IT", with id 100, employee with SSN = 112233 as a manager for this department. The start date for this manager is '1-11-2006');
insert into Departments (DNum, Dname, MGRSSN, MGRStart) values
(100, 'DEPT IT', 112233, '2006-11-1');

-- 4.	Do what is required if you know that: Mrs.Noha Mohamed(SSN=968574) moved to be the manager of the new department (id = 100), and they give you (use your SSN from question1) her position (Dept. 20 manager) 
-- a.	First try to update her record in the department table
update Departments SET MGRSSN = 968574
where DNum = 100;
-- b.	Update your record to be department 20 manager.
update Departments SET MGRSSN = 102672
where DNum = 20;
-- c.	Update your friend data (entered in question2) to be in your teamwork (supervised by you)
update Employees SET Superssn = 102672
where SSN = 102660;


-- 5.	Unfortunately, the company ended the contract with Mr. Kamel Mohamed (SSN=223344) so try to delete his data from your database in case you know that your friend will be temporarily in his position.
-- Hint: (Check if Mr. Kamel has dependents, works as a department manager, supervises any employees or works in any projects and handle these cases).

-- Delete its Dependent
delete from Dependent 
where ESSN = 223344;
-- Delete its Departments
update Departments
set MGRSSN = 102660
where DNum = 10; -- manage dep 10
-- is manage Employees
update Employees
set Superssn = 102660
where Superssn = 223344;
-- Delete projects work in 
delete from Works_for
where ESSN = 223344;

delete from Employees where SSN = 223344;


-- 6.	And your salary has been upgraded by 20 percent of its last value.
update Employees
set Salary = Salary + Salary * 0.20
where SSN = 102672;

-- Queries
-- 1.	Display all the employees Data.
select *
from Employees;
-- 2.	Display the employee First name, last name, Salary and Department number.
select
	Fname ,Lname, Salary, Dno
from Employees;
-- 3.	Display all the projects names, locations and the department which is responsible about it.
select Pname, Plocation, Dnum from Projects;
-- 4.	If you know that the company policy is to pay an annual commission for each employee with specific percent equals 10% of his/her annual salary. Display each employee full name and his annual commission in an ANNUAL COMM column (alias).
select
	concat(Fname, ' ', Lname) AS 'full name',
    Salary * 12 * 0.10 AS 'ANNUAL COMM'
from Employees;

-- 5.	Display the employees Id, name who earns more than 1000 LE monthly.
select
	SSN, concat(Fname, ' ', Lname) AS 'full name' , Salary
from Employees
where Salary > 1000;

-- 6.	Display the employees Id, name who earns more than 10000 LE annually.
select
	SSN, concat(Fname, ' ', Lname) AS 'full name' , Salary * 12 as "Salary Annually"
from Employees
where Salary * 12 > 10000;
-- 7.	Display the names and salaries of the female employees 
select
	SSN, concat(Fname, ' ', Lname) AS 'full name' , Salary
from Employees
where Sex = 'F';
-- 8.	Display each department id, name which managed by a manager with id equals 968574.
select
	DNum, Dname, MGRSSN
from Departments
where MGRSSN = 968574;

-- 9.	Display the IDs, names and locations of the pojects which controlled with department 10.
select
	Pnumber, Plocation, Dnum
from Projects
where Dnum = 10;



-- all
select * from Employees;
select * from Departments;
select * from Projects;
select * from Dependent;
select * from Works_for;




