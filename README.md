# reservations
Reservation component on the Open Table restaurant page. 


### Initial Database Seeding

1. Run the following script in terminal with your mysql password with in this project's root directory. This script will create the `reservation` database in your mySQL server. 
    `mysql < ./server/db/Schema.sql -u root -p`

2. Exist mysql terminal, and run the following database seeding script. This script will create  `reservations_table` and `reservations_user` tables. 


3. It will also generate 100 random restaurant data in the `reservations_table` table. 
