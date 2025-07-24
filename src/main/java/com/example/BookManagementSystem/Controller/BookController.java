package com.example.BookManagementSystem.Controller;

import com.example.BookManagementSystem.entity.Book;
import com.example.BookManagementSystem.Service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")

public class BookController{
    @Value("${google.books.api.base-url}")
    private String baseUrl;

    @Value("${google.books.api.key}")
    private String apiKey;
    @Autowired
    private BookService bookService;
    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book){
        return ResponseEntity.ok(bookService.saveBook(book));
    }

    @GetMapping
    public List<Book> getBooks() {return bookService.getAllBooks();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id){
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id){
        return ResponseEntity.ok(bookService.getBookById(id));
    }
    @GetMapping("/external/{isbn}")
    public ResponseEntity<String> getBookFromGoogle(@PathVariable String isbn){
        String url= baseUrl+"?q=isbn:"+isbn+"&key="+apiKey;
        RestTemplate restTemplate= new RestTemplate();
        String response= restTemplate.getForObject(url,String.class);
        return ResponseEntity.ok(response);
    }

}

