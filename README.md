# reservations
Reservation component on the Open Table restaurant page. 


### Initial Database Seeding

1. Run the following script in terminal with your MySQL password within this project's root directory. This script will create the `reservation` database in your mySQL server. 
    `mysql --max_allowed_packet=100M -u root -p < ./server/db/Schema.sql`

2. Login to your MySQL server and run the following script to increate the `max_allowed_packet` in MySQL server side. After running the script, log out from your MySQL server to reflect this new setting. 
    ` SET GLOBAL max_allowed_packet=1073741824;` 

3. Exist MySQL terminal, and run the following script after turning on the server in a separate terminal. This script will create `reservations_table` and will also generate 100 random restaurant data in this table.
    `npm run seed`


### Runing the App

1. Run the following script in the terminal to build webpack bundle:
    `npm run build`

2. Run the following script in the terminal to build server connection to connect to database: 
    `npm run start`