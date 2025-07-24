import React from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage(){
  const navigate =useNavigate();

  return(
    <div className="w-100 mb-4 shadow rounded overflow-hidden">
  {/* Header */}
          <h1 className="text-center mb-4" style={{color:'purple'}}>
            Welcome to the Book Management System
          </h1>
     <div
      className="w-100 mb-4 shadow rounded overflow-hidden mx-auto"
       style={{maxWidth:'900px',height:'400px'}}
      >
      <img
          src="https://thumbs.dreamstime.com/b/cozy-classic-bookstore-interior-wooden-shelves-full-books-warm-lighting-vintage-aesthetic-atmosphere-library-362438229.jpg?w=992"
          alt="Books"
          className="w-100 h-100 object-fit-cover"
        />
      </div>
       <div className="d-flex justify-content-center gap-4">
        <button
          className="btn btn-purple px-4 py-2"
          onClick={() => navigate('/books')}
        >
          📖 View Books
        </button>
        <button
          className="btn btn-purple px-4 py-2"
          onClick={() =>navigate('/add-book')}
        >
          ➕ Add Book
        </button>
      </div>
    </div>
  );
}

export default HomePage;
