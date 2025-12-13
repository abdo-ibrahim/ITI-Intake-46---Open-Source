-- 2.	Display the Department id, name and id and the name of its manager.
select d.DNum , d.Dname , e.SSN , concat(e.Fname, ' ', e.Lname) as name
from departments d
join employees e on e.SSN = d.MGRSSN;

-- 3.	Display the (name of the (departments) and (the name of the (projects) under its control.
select p.Pname as "project name" , d.Dname  as "department name"
from departments d
join projects p on p.Dnum = d.DNum;

-- 4.	Display the (full data about all the (dependence) associated with the (name of the (employee)
--  they depend on him/her.
select concat(e.Fname ,' ',e.Lname) as full_name,  d.*
from employees e
join dependent d on e.SSN = d.ESSN;

-- 5.	Display (Using Union Function)
-- a.	 The name and the gender of the (dependence that's gender is Female) and depending on (Female Employee)
-- b.	 And the (male dependence) that depends on (Male Employee).
select d.Dependent_name , d.Sex as Dependent_Gender,
 concat(e.Fname ,' ',e.Lname) as full_name
from dependent d
join employees e on e.SSN = d.ESSN
where d.Sex = 'M' and e.Sex = 'M'

union

select d.Dependent_name , d.Sex as Dependent_Gender,
 concat(e.Fname ,' ',e.Lname) as full_name
from dependent d
join employees e on e.SSN = d.ESSN
where d.Sex = 'F' and e.Sex = 'F';

-- 6.	Display the (Id, name and location) of the (projects) --> Cairo or Alex city.
select Pnumber, Pname, Plocation
from projects
where City = 'Alex' or City = 'Cairo';


-- 7.	Display the (Projects full data) of the projects with a (name starts with "a" letter.)
select *
from projects
where Pname like 'a%';

-- 8.	display all the (employees) in (department = 30) whose (salary from 1000 to 2000) LE monthly
select *
from employees
where dno = 30 and Salary between 1000 and 2000;

-- 9.	Retrieve the (names of all (employees) in (department) = 10) (who works) more than or equal 10) hours per week
--  on "AL Rabwah" project.
-- emploee works for projects
 select concat(e.Fname ,' ',e.Lname) as full_name
 from employees e join works_for w on e.SSN = w.ESSN
 join projects p on p.Pnumber = w.Pno
 where e.dno = 10 and w.Hours >= 10 and Pname = 'Al Rabwah';
 
-- 10.	Find the (names of the (employees) who directly (supervised) with Kamel Mohamed)
select concat(x.Fname ,' ',x.Lname) as employer_name
from employees x join employees y
on y.SSN = x.Superssn and y.Fname = 'Kamel' and y.Lname = 'Mohamed';

-- 11.	(For each (project), list the (project name and the ((total hours)) (works for) per week
-- spent on that project.
 select p.Pname , sum(w.Hours) as total_hours
 from works_for w
 join projects p on p.Pnumber = w.Pno
 group by P.Pname;

-- 12.	Retrieve the (names of all (employees) and the (names of the (projects) they are ((working on)),
-- sorted by the project name.
 select concat(e.Fname ,' ',e.Lname) as full_name, p.Pname
 from employees e join works_for w on e.SSN = w.ESSN
 join projects p on p.Pnumber = w.Pno
 order by p.Pname;

-- 13.	Display the (full data of the (department) which has the ((smallest (employee ID) over all employees' ID.
select d.*
from departments d
join employees e on d.DNum = E.Dno
where e.SSN = (
  select min(SSN) from employees
);

-- 14.	(For each department), retrieve the (department name and the maximum, minimum and
-- average salary of its (employees).
select d.Dname, max(e.Salary) , min(e.Salary), avg(e.Salary)
from employees e
join departments d on e.Dno = d.DNum
group by d.Dname;

-- 15.	List the(last name) of all (managers->department) who have no dependents.
select m.Lname
from employees m
join departments d on m.SSN = d.MGRSSN
where m.SSN not in(select ESSN from dependent);

-- 16.	For each department-- if its average salary is less than the average salary 
-- of all employees-- display its number, name and number of its employees.
select d.Dname , d.DNum, count(e.SSN)
from employees e
join departments d on e.Dno = d.DNum
group by d.DNum, d.Dname
having avg(e.Salary) < (select avg(salary) from employees);

-- 17.	Retrieve a list of employees and the projects they are working 
-- on ordered by department and within each department, ordered alphabetically by last name, first name.
select concat(e.Fname ,' ',e.Lname) as full_name, p.Pname, d.Dnum
from employees e
join works_for w on e.SSN = w.ESSN
join projects p on w.Pno = p.Pnumber
join departments d on d.Dnum = p.Dnum
order by p.Dnum , Lname, Fname;

-- 18.	For each project located in Cairo City , find the project number, 
--  department name ,the department manager last name ,address and birthdate.
select p.Pnumber, d.Dname , e.Lname , e.Address , e.BDATE
from projects p
join departments d on p.Dnum = d.DNum
join employees e on e.SSN = d.MGRSSN
where p.City = 'Cairo';

