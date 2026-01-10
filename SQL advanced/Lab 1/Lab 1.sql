use sakila;
select * from actor;
select * from film;
select * from payment;
select * from customer;
select * from rental;
select * from inventory;
select * from city;
select * from country;

-- 1. Select the title, description, and length of all films that are longer than 120  minutes. Sort them from the longest to the shortes
select title, description, length
from film
where length > 120
order by length desc;

-- 2. Find all films that have a rental_rate of 0.99 or 2.99, but their replacement_cost is greater than 20.00

select *
from film
where ( rental_rate = 0.99  or rental_rate = 2.99 ) and replacement_cost > 20.00;

-- 3. Count the total number of films available in each rating (G, PG, R, etc.).
select rating, count(*) as number_of_films
from film
group by rating;


-- 4. List the customer_ids who have made more than 30 separate payments in the payment table
select customer_id, count(*) as number_of_payments
from payment
group by customer_id
having count(*) > 30;

-- 5. Get all "Cities" in the database and the "Country" they belong to, but only for cities located in 'Egypt'
select city.city, country.country
from city
join country on city.country_id = country.country_id
where country.country = 'Egypt';

-- 6. Display a list of all films and the names of the actors who starred in them. (show film id, title and actor name)
select f.film_id, f.title, concat(a.first_name, ' ', a.last_name) as actor_name
from film f
join film_actor fa on f.film_id = fa.film_id
join actor a on fa.actor_id = a.actor_id;


-- 7. Find all customers who have rented a movie but haven't returned it yet. (show the customer name and the film title).
select concat(c.first_name, ' ', c.last_name) as customer_name, f.title
from customer c
join rental r on c.customer_id = r.customer_id
join inventory i on r.inventory_id = i.inventory_id
join film f on i.film_id = f.film_id
where r.return_date is null;

-- 8. List the titles of all films whose length is greater than the average length of all films in the database.
-- select avg(length) from film;
select title , length
from film
where length > (
  select avg(length)
  from film
);

-- 9. Write a query to find the first_name, last_name, and email of customers who have zero rental records
select c.first_name, c.last_name, c.email
from customer c
left join rental r on c.customer_id = r.customer_id
where r.rental_id is null;

-- 10.Create a view named customer_spending_summary. This view should display each customer's name, their total number of rentals, and the total amount of money they have paid.
create view customer_spending_summary as
select concat(c.first_name, ' ', c.last_name) as customer_name,
count(p.rental_id) as total_rentals,
IFNULL(sum(p.amount), 0) as total_amount_paid
from customer c
left join payment p on c.customer_id = p.customer_id
group by c.customer_id;

select * from customer_spending_summary;

-- 11.Use the previous view to find only customers who spent more than $100
select *
from customer_spending_summary
where total_amount_paid > 100;



-- Built-in Functions
-- 1. Display actor names in the format: LAST_NAME, First_name (e.g., GUINESS,Penelope).

select concat(upper(last_name), ', ', first_name) as full_name
from actor;


-- 2. Display all customer emails in lowercase and replace the domain @sakilacustomer.org with @iti-students.edu.
select replace(lower(email), '@sakilacustomer.org', '@iti-students.edu') as new_email
from customer;

-- 3. Display the first 50 characters of each film's description followed by "..." and call the column short_summary.
select concat(substring(description, 1, 50), '...') as short_summary
from film;

-- 4. Find all customers who registered in the month of February (any year).
select *
from customer
where month(create_date) = 2;

-- 5. Extract the Quarter (1, 2, 3, or 4) from the payment_date (payment table) to see which part of the year is most profitable.
-- select quarter(payment_date) as payment_quarter from payment;

select quarter(payment_date) as payment_quarter, sum(amount) as total_amount
from payment
group by payment_quarter;

-- 6. Use CASE to label rentals as 'Cheap' (under $2), 'Mid' ($2-$4.99), or 'Expensive' (above $5)

select rental_id, amount,
case
  when amount < 2 then 'Cheap'
  when amount between 2 and 4.99 then 'Mid'
  else 'Expensive'
end as label_rental
from payment;