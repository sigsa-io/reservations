# reservations
Reservation component on the Open Table restaurant page. 


### Initial Database Seeding

1. Run the following script in terminal with your mysql password within this project's root directory. This script will create the `reservation` database in your mySQL server. 
    `mysql < ./server/db/Schema.sql -u root -p`

2. Exist mysql terminal, and run the following script after turning on the server in a separate terminal. This script will create `reservations_table` and will also generate 100 random restaurant data in this table.
    `npm run seed`
