1 . npm install
2  node app.js

This project Inmplemets conditonal validation with Joi library

Here is the cURL for only endpoint in this application to check conditional-validation

curl --location 'http://localhost:3001/conditional-validation' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"Neeraj Singh",
    "email":"neeraj190499@gmail.com",
    "occupation":"student",
    "organization":"",
    "salary":10000
}'


Here is the scenario in consideration

a. name,email and occupation are required 
b. valid values for occupation are - salaried/self/student
c. organization is of type string and is only allowed when occupation is salaried
d. salary is of type number and is only allowed when occupation is of type salaried or self# Conditional-Validation-In-NodeJs
