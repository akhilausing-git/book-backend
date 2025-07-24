## Book Management System
A full-stack web application to manage books using:
React(frontend)
Spring Boot(backend) and
MongoDB (database).

## Technologies Used
-React
-SpringBoot(Java)
-MongoDB
-Bootstrap/CSS
-Axios(HTTP client)
-Vercel(Frontend Hosting)
-Railway(Backend Hosting)

## Features
Add,Delete and View Books
Form Validations
MongoDB Document Storage
Pagination 

## Setting Up Project Locally
Open the root folder BookManagementSystem in IntelliJ:
You should see two main folders:
book-management-frontend/ -> React app  path: BookManagementSystem (1)\BookManagementSystem\book-management-frontend
BookManagementSystem/ -> Spring Boot  path: BookManagementSystem (1)\BookManagementSystem

--For FrontEnd--
 cd book-management-frontend
 npm install
Start the Frontend
 npm start
React app will run at:
 http://localhost:3000

--For BackEnd--
 cd BookManagementSystem
 mvn clean install
Start the Backend
 mvn spring-boot:run
SprinBoot app will run at:
http://localhost:8080

## Running the Applications
--FrontEnd--
  npm start

--For BackEnd--
  mvn spring-boot:run

## Installing Dependencies

--For FrontEnd--
npm install axios react-router-dom bootstrap

--For BackEnd--(pom.xml)
**Spring Web**
**Spring Boot Starter Data MongoDB** 
**Spring Boot Starter Validation** 
**Lombok** 
**DevTools**
**Spring Boot Starter Test**

## Environment variables

MongoDB configuration:
spring.data.mongodb.uri=mongodb://localhost:27017/bookdb

Google Books API Configuration:
google.books.api.base-url=https://www.googleapis.com/books/v1/volumes
google.books.api.key=YOUR_GOOGLE_BOOKS_API_KEY

## API Documentation

1. Get All Books
   URL: /api/books
   Method:GET
   Description:Retrieve a list of all books.
   Example Response: [
   {
   "id": 1,
   "title": "Atomic Habits",
   "author": "James Clear",
   "publicationDate": "2018-10-16",
   "isbn": "9780735211292",
   "genre": "Self-help",
   "rating": 4.5
   }
   ]

2. Add a new Book
   URL: /api/books
   Method:POST
   Description: Add a new book
   Input Payload: {
   "title": "Deep Work",
   "author": "Cal Newport",
   "publicationDate": "2016-01-05",
   "isbn": "9781455586691",
   "genre": "Productivity",
   "rating": 4.6
   }
   Example Response: {
   "id": 2,
   "title": "Deep Work",
   "author": "Cal Newport",
   "publicationDate": "2016-01-05",
   "isbn": "9781455586691",
   "genre": "Productivity",
   "rating": 4.6
   }

3. Delete Book
   URL: /api/books/{id}
   Method:DELETE
   Description:Delete a book by ID.
   Example Response:
   "Book with ID 2 has been deleted successfully."

4. View Book Details 
   URL: /api/books/{id} 
   Method:GET
   Description:View book by ID

## Database Schema(MongoDB)

  books (Collection):
  {
  "_id":String,
  "title":String,
  "author":String,
  "publicationDate":Date
  "isbn":String,
  "genre":String,
  "rating":String, 
  }

## Folder Structure

├──BookManagementSystem(1)/
   ├──BookManagementSystem/
   │   ├──book-management-frontend/      # React frontend
   │           ├── public/
   │           └── src/
   │                ├── App.css           # Define global styles
   │                ├── App.js            # Root component
   │                ├── BookDetails.js    # Book details
   │                ├── BookForm.js       # Form for adding books
   │                ├── BookList.js       # List of books
   │                ├── HomePage.js       # Welcome Page
   │                ├── index.css         # Primary stylesheet
   │                └── index.js          # React entry point 
   │   
   │
   ├── BookManagementSystem/        # Spring Boot backend
   │   ├── controller/              # REST controllers
   │        ├── BookController         
   │   ├── entity/                  # Book entity
   │        ├── Book
   │   ├── repository/              # MongoDB interface
   │        ├── BookRepo 
   │   ├── service/                 # Business Logic
   │        ├── BookService
   └── application.properties       # Config file
