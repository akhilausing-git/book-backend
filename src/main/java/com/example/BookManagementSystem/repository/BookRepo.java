package com.example.BookManagementSystem.repository;

import com.example.BookManagementSystem.entity.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepo extends MongoRepository<Book, String>{

}
