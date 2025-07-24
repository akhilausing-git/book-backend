package com.example.BookManagementSystem.Service;

import com.example.BookManagementSystem.entity.Book;
import com.example.BookManagementSystem.repository.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookService{
    @Autowired
    private BookRepo bookRepo;

    public Book saveBook(Book book){
        return bookRepo.save(book);
    }

    public List<Book> getAllBooks(){
        return bookRepo.findAll();
    }

    public void deleteBook(String id){
        bookRepo.deleteById(id);
    }

    public Book getBookById(String id){
        return bookRepo.findById(id).orElse(null);
    }
}
