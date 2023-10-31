# Book Management Application

This is a simple RESTful API for managing books using Node.js and Express. The API provides the following features:

- Create a new book with title, author, and summary.
- View a list of all books.
- View details of a specific book by its ID.
- Update a book's details.
- Delete a book.

## Technology Stack
- *Server Environment* - NodeJS
- *Framework* - ExpressJS
- *Database* - MongoDB
- *Cloud database service* - MongoDB Atlas
- *Backend Deployment* - DigitalOcean
- *Containerization* - Docker

## Installation

- First, fork this repository and follow the given instructions:

```
# clone the repository to your local machine
$ git clone `git clone https://github.com/<YOUR-GITHUB-USERNAME>/book-management-app.git`

# navigate to the project's directory and install all the relevant dev-dependencies as well as dependencies
$ npm i

# create a MongoDB Atlas instance and obtain the MongoDB URI
# create a .env file with the following fields according to the knowledge obtained
   MONGO_URI 

   
# Start application
$ npm start

# Make requests on http://localhost:PORT/ from Postman
```

## Routes

### Create a New Book
- **HTTP Method:** POST
- **Endpoint:** `/books`
- **Request Body:**
  - `title` (string): The title of the book.
  - `author` (string): The author of the book.
  - `summary` (string): A summary of the book.

#### Edge Cases Handled:
- Validation of the request body to ensure all required fields are provided.
- Check if a book with the same title and author already exists.

### View List of All Books
- **HTTP Method:** GET
- **Endpoint:** `/books`

#### Edge Cases Handled:
- None

### View Details of a Specific Book
- **HTTP Method:** GET
- **Endpoint:** `/books/:id`
- **Parameters:**
  - `id` (string): The unique identifier of the book.

#### Edge Cases Handled:
- Check if the book with the provided ID exists.

### Update a Book's Details
- **HTTP Method:** PATCH
- **Endpoint:** `/books/:id`
- **Parameters:**
  - `id` (string): The unique identifier of the book.
- **Request Body:**
  - `title` (string): (Optional) The new title of the book.
  - `author` (string): (Optional) The new author of the book.
  - `summary` (string): (Optional) The new summary of the book.

#### Edge Cases Handled:
- Validation of the request body to ensure updates are valid.
- Check if the book with the provided ID exists.
- Check if a book with the same title and author already exists (if title and author are provided for updates).

### Delete a Book
- **HTTP Method:** DELETE
- **Endpoint:** `/books/:id`
- **Parameters:**
  - `id` (string): The unique identifier of the book.

#### Edge Cases Handled:
- Check if the book with the provided ID exists.

## Error Handling
- Proper error responses with status codes and informative messages are provided for various edge cases, such as invalid input and duplicate book entries.


# Future Scope
```
1. Authorization and Authentication can be implemented.
2. Sharing lists with other users.

```

