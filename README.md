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
  SALTFACTOR= Number, JWT_SECRET= String, and EMPLOYEE_AUTH= String
      
  The first two can be any value, but the third value will be needed again to create new employees

## Run the app

    yarn start-dev

# Routes

## Get token (login)
Logs client into an employee account and provides a token
### Request
`POST /employee/login`

    'Accept: application/json'

    {
        "username" : String,
        "password" : String
    }
### Response
    Status: 
    Body:
    {
        "user": {
            "id": ObjectID,
            "username": String,
            "firstName": String,
            "lastName": String
        },
        "token": JWT Token
    }

## Check server status
### Request
`GET /admin`
### Response
    Status: 200 OK
    Body:
    {
        "serverResp": "Running"
    }

## Get author by ID
### Request
`GET /author/{ObjectID}`
### Response (if found)
    Status: 200 OK
    Body:
    {
        "_id": ObjectID,
        "firstName": String,
        "lastName": String,
        "books": List of ObjectIDs,
        "__v": Number
    }
### Response (if not found)
    Status: 404 Not Found
    Body:
    {
        "message": "Author not found"
    }

## Search author by URL query
### Request
`GET /author?{key}={value}`
### Response (if found)
    Status: 200 OK
    Body:
    {
        "_id": ObjectID,
        "firstName": String,
        "lastName": String,
        "books": List of ObjectIDs,
        "__v": Number
    }
### Response (if not found)
    Status: 404 Not Found
    Body:
    {
        "message": "Author not found"
    }

## Get all authors
### Request
`GET /author`
### Response (if authors found)
    Status: 200 OK
    Body:
    [
        {
            "_id": "63c6f231f8a637c705c7bac8",
            "firstName": "Hortense",
            "lastName": "Ullrich",
            "books": [],
            "__v": 0
        }
    ]
### Response (if none found)
    Status: 404 Not Found
    Body:
    {
        "message": "No authors found"
    }

## Add an author
### Request
`POST /author`

    'Accept: application/json'

    {
        "firstName" : String,
        "lastName" : String
    }
### Response
    Status: 201 Created
    Body:
    {
        "firstName": String,
        "lastName": String,
        "books": List of ObjectIDs,
        "_id": ObjectID,
        "__v": Number
    }

## Update an author 
Only the fields you wish to change need to be included
in the body.
### Request
`PUT /author/{ObjectID}`

    'Accept: application/json'

    {
        "firstName": String,
        "lastName": String,
        "books": List of ObjectIDs,
    }
### Response (if found)
    Status: 200 OK
    Body:
    {
        "message": "Success"
    }
### Response (if not found)
    Status: 404 Not Found
    Body:
    {
        "message": "Author not found"
    }

## Delete an author
It is suggested you reassign the 'author' value on any books that 
reference the author being deleted.
### Request
`DELETE /author/{ObjectID}`
### Response (if found)
    Status: 200 OK
    Body:
    {
        "message": "Success"
    }
### Response (if not found)
    Status: 404 Not Found
    Body:
    {
        "message": "Author not found"
    }
### Response (if books reference author)
    Status: 202 Accepted
    Body:
    {
        "message": "Success. The following books reference this author and need to be updated",
        "bookList": List of ObjectIDs
    }

## Get book by ID
### Request
`GET /book/{ObjectID}`
### Response (if found)
    Status: 200 OK
    Body:
    {
        "_id": ObjectID,
        "title": String,
        "author": ObjectID,
        "stock": Number,
        "available": Number,
        "fiction": Boolean,
        "genre": String,
        "__v": Number
    }
### Response (if not found)
    Status: 404 Not Found
    Body:
    {
        "message": "Book not found"
    }

## Search book by URL query
### Request
`GET /book?{key}={value}`
### Response (if found)
    Status: 200 OK
    Body:
    [
        {
            "_id": ObjectID,
            "title": String,
            "author": ObjectID,
            "stock": Number,
            "available": Number,
            "fiction": Boolean,
            "genre": String,
            "__v": Number
        }
    ]
### Response (if not found)
    Status: 404 Not Found
    Body:
    {
        "message": "No books found"
    }

## Get all books
### Request
`GET /book`
### Response (if books found)
    Status: 200 OK
    Body:
    [
        {
            "_id": ObjectID,
            "title": String,
            "author": ObjectID,
            "stock": Number,
            "available": Number,
            "fiction": Boolean,
            "genre": String,
            "__v": Number
        }
    ]
### Response (if none found)
    Status: 404 Not Found
    Body:
    {
        "message": "No books found"
    }

## Add a book
If author ID is included, the book will automatically be added to
the author's book list.
### Request
`POST /book`

    'Accept: application/json'

    {
        "title" : String,
        "author" : ObjectID,
        "fiction" : Boolean,
        "genre" : String,
        "stock" : Number,
        "available" : Number
    }
### Response
    Status: 201 Created
    Body:
    {
        "title" : String,
        "author" : ObjectID,
        "fiction" : Boolean,
        "genre" : String,
        "stock" : Number,
        "available" : Number
        "_id": ObjectID,
        "__v": Number
    }

## Update a book
Only the fields you wish to change need to be included
in the body.
### Request
`PUT /book/{ObjectID}`

    'Accept: application/json'

    {
        "title" : String,
        "author" : ObjectID,
        "fiction" : Boolean,
        "genre" : String,
        "stock" : Number,
        "available" : Number
    }
### Response (if found)
    Status: 200 OK
    Body:
    {
        "message": "Success"
    }
### Response (if not found)
    Status: 404 Not Found
    Body:
    {
        "message": "Book not found"
    }

## Delete a book
Will automatically remove the book from it's author's book list.
### Request
`DELETE /book/{ObjectID}`
### Response (if found)
    Status: 200 OK
    Body:
    {
        "message": "Success"
    }
### Response (if not found)
    Status: 404 Not Found
    Body:
    {
        "message": "Book not found"
    }

## Check out a book
First checks if there are books available and if customer balance is 
not over a certain amount (default 99).

Lowers the book's available count by 1 and adds the book to the 
customer's book list.
### Request
`POST /book/checkout`

    'Accept: application/json'

    {
        "book" : ObjectID,
        "customer" : ObjectID
    }
### Response (if successful)
    Status: 200 OK
    Body:
    {
        "message": "Success"
    }
### Response (if book not available)
    Status: 400 Bad Request
    Body:
    {
        "message": "No books available for checkout"
    }
### Response (if customer balance too high)
    Status: 400 Bad Request
    Body:
    {
        "message": "Customer not in good standing. ${balanceDue} currently due on account"
    }

## Return out a book
First checks if the book is in the customer's book list.

Raises the book's available count by 1 and removes the book from the
customer's book list.
### Request
`POST /book/return`

    'Accept: application/json'

    {
        "book" : ObjectID,
        "customer" : ObjectID
    }
### Response (if successful)
    Status: 200 OK
    Body:
    {
        "message": "Success"
    }
### Response (if book not in customer list)
    Status: 404 Bad Request
    Body:
    {
        "message": "This book was not checked out by this customer"
    }

## Get customer by ID
### Request
`GET /Customer/{ObjectID}`
### Response (if found)
    Status: 200 OK
    Body:
    {
        "firstName": String,
        "lastName": String,
        "phoneNumber": String,
        "emailAddress": String,
        "balanceDue": Number,
        "booksCheckedOut": List of ObjectIDs,
        "_id": ObjectID,
        "__v": Number
    }
### Response (if not found)
    Status: 404 Not Found
    Body:
    {
        "message": "Customer not found"
    }

## Search customer by URL query
### Request
`GET /customer?{key}={value}`
### Response (if found)
    Status: 200 OK
    Body:
    [
        {        
            "firstName": String,
            "lastName": String,
            "phoneNumber": String,
            "emailAddress": String,
            "balanceDue": Number,
            "booksCheckedOut": List of ObjectIDs,
            "_id": ObjectID,
            "__v": Number
        }
    ]
### Response (if not found)
    Status: 404 Not Found
    Body:
    {
        "message": "Customer not found"
    }

## Get all customers
### Request
`GET /customer`
### Response (if customers found)
    Status: 200 OK
    Body:
    [
        {        
            "firstName": String,
            "lastName": String,
            "phoneNumber": String,
            "emailAddress": String,
            "balanceDue": Number,
            "booksCheckedOut": List of ObjectIDs,
            "_id": ObjectID,
            "__v": Number
        }
    ]
### Response (if none found)
    Status: 404 Not Found
    Body:
    {
        "message": "No customers found"
    }

## Add a customer
### Request
`POST /customer`

    'Accept: application/json'

    {
        "firstName" : String,
        "lastName" : String,
        "phoneNumber" : String,
        "emailAddress" : String
    }
### Response
    Status: 201 Created
    Body:
    {
        "firstName": String,
        "lastName": String,
        "phoneNumber": String,
        "emailAddress": String,
        "balanceDue": Number,
        "booksCheckedOut": List of ObjectIDs,
        "_id": ObjectID,
        "__v": Number
    }

## Update a customer
Only the fields you wish to change need to be included
in the body.
### Request
`PUT /customer/{ObjectID}`

    'Accept: application/json'

    {
        "firstName" : String,
        "lastName" : String,
        "phoneNumber" : String,
        "emailAddress" : String
    }
### Response (if found)
    Status: 200 OK
    Body:
    {
        "message": "Success"
    }
### Response (if not found)
    Status: 404 Not Found
    Body:
    {
        "message": "Customer not found"
    }

## Delete a customer
If the client has books currently checked out, customer will be
deleted and a list of checked out books will be returned
### Request
`DELETE /customer/{ObjectID}`
### Response (if found)
    Status: 200 OK
    Body:
    {
        "message": "Success"
    }
### Response (if not found)
    Status: 404 Not Found
    Body:
    {
        "message": "Customer not found"
    }
### Response (if customer still has books checked out)
    Status: 202 Accepted
    Body:
    {
        "message": "Success. The following books are currently checked out by this customer",
        "bookList": List of ObjectIDs
    }

## Get employee by ID
### Request
`GET /employee/{ObjectID}`
### Response (if found)
    Status: 200 OK
    Body:
    {
        "_id": ObjectID,
        "username": String,
        "password": Hashed String,
        "firstName": String,
        "lastName": String,
        "__v": Number
    }
### Response (if not found)
    Status: 404 Not Found
    Body:
    {
        "message": "Employee not found"
    }

## Search employee by URL query
### Request
`GET /employee?{key}={value}`
### Response (if found)
    Status: 200 OK
    Body:
    [
        {
            "_id": ObjectID,
            "username": String,
            "password": Hashed String,
            "firstName": String,
            "lastName": String,
            "__v": Number
        }
    ]
### Response (if not found)
    Status: 404 Not Found
    Body:
    {
        "message": "Employee not found"
    }

## Get all employees
### Request
`GET /employee`
### Response (if employees found)
    Status: 200 OK
    Body:
    [
        {
            "_id": ObjectID,
            "username": String,
            "password": Hashed String,
            "firstName": String,
            "lastName": String,
            "__v": Number
        }
    ]
### Response (if none found)
    Status: 404 Not Found
    Body:
    {
        "message": "No employees found"
    }

## Add an employee
Employee authorization password needs to be provided
### Request
`POST /employee`

    'Accept: application/json'

    {
        "username" : String,
        "password" : String,
        "firstName" : String,
        "lastName" : String,
        "authorization" : String
    }
### Response (if successful)
    Status: 201 Created
    Body:
    {
        "_id": ObjectID,
        "username": String,
        "password": Hashed String,
        "firstName": String,
        "lastName": String,
        "__v": Number
    }
### Response (if authorization not provided)
    Status: 400 Bad Request
    Body:
    {
        "message": "Authorization needed to add employee."
    }
### Response (if username already exists)
    Status: 404 Bad Request
    Body:
    {
        "message": "Username already exists."
    }

## Update an employee
Only the fields you wish to change need to be included
in the body.
### Request
`PUT /employee/{ObjectID}`

    'Accept: application/json'

    {
        "username" : String,
        "password" : String,
        "firstName" : String,
        "lastName" : String,
    }
### Response (if found)
    Status: 200 OK
    Body:
    {
        "message": "Success"
    }
### Response (if not found)
    Status: 404 Not Found
    Body:
    {
        "message": "Employee not found"
    }

## Delete an employee
### Request
`DELETE /employee/{ObjectID}`
### Response (if found)
    Status: 200 OK
    Body:
    {
        "message": "Success"
    }
### Response (if not found)
    Status: 404 Not Found
    Body:
    {
        "message": "Employee not found"
    }