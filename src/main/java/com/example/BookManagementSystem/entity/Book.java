package com.example.BookManagementSystem.entity;

import jakarta.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="books")//MongoDB collection name
public class Book{
    @Id
    private String id;

    @NotBlank(message ="Title is required")
    @Size(max =100,message ="Title cannot exceed 100 characters")
    private String title;
    @NotBlank(message ="Author is required")
    @Size(max =50,message ="Author cannot exceed 50 characters")
    private String author;
    @NotNull(message ="Publication date is required")
    private String publicationDate;
    @NotBlank(message ="ISBN is required")
    @Pattern(regexp ="\\d{13}",message ="ISBN must be a 13-digit number")
    private String isbn;
    @NotBlank(message ="Genre is required")
    private String genre;
    @NotBlank(message ="Rating is required")
    @Pattern(regexp ="^[1-5]$",message ="Rating must be a number from 1 to 5")
    private String rating;

    //Constructors
    public Book() {
    }
    public Book(String title,String author,String publicationDate,String isbn,String genre,String rating){
        this.title= title;
        this.author= author;
        this.publicationDate= publicationDate;
        this.isbn= isbn;
        this.genre= genre;
        this.rating= rating;
    }
    //Getters & Setters
    public String getId(){return id;}
    public void setId(String id){this.id =id;}

    public String getTitle(){return title;}
    public void setTitle(String title) {this.title =title;}

    public String getAuthor() {return author;}
    public void setAuthor(String author) {this.author =author;}

    public String getPublicationDate() {return publicationDate;}
    public void setPublicationDate(String publicationDate) {this.publicationDate =publicationDate;}

    public String getIsbn() {return isbn;}
    public void setIsbn(String isbn) {this.isbn =isbn;}

    public String getGenre() {return genre;}
    public void setGenre(String genre) {this.genre =genre;}

    public String getRating() {return rating;}
    public void setRating(String rating) {this.rating=rating;}

}


