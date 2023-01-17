# Library REST API

This is an example API for a library's database. It manages the following items:

Books
* Title
* Genre
* Fiction/Non-fiction
* Author
* Stock
* Available stock

Authors
* Name
* Books they've written

Customers
* Name
* Phone number
* Email address
* Balance due
* Books currently checked out

Employees
* Name
* Username

In addition to basic CRUD functions for the above, the following functionality is also built in:
* Connections between books and their authors are automatically handled
* There is a check-out route, to allow a customer to check out a copy of a book
* There is a return route, to allow a customer to return a copy of a book

## Security

Security is acheived through the use of JWT tokens. Tokens are obtained with a valid username 
and password through the Login route. All routes but a few (GET author and book routes)
require tokens to access.

To add a new employee, the client must provide the EMPLOYEE_AUTH, a secret key stored in a 
.env file, along with the JWT Secret and the salt factor for pasword hashing.

## Install

    * Install yarn
    * In the root folder, create a .env file with the following fields:
      SALTFACTOR= Number
      JWT_SECRET= String
      EMPLOYEE_AUTH= String
      
      The first two can be any value, but the third value will be needed again to create new employees

## Run the app

    yarn start-dev

# Routes

## Login

### Get token (login)

`POST /employee/login`


### Response

    

## 

