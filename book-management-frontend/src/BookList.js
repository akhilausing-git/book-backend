import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './App.css';
//State to store books fetched from the backend
function BookList(){
  const[books,setBooks]= useState([]);
  const[currentPage,setCurrentPage]= useState(1);
  const booksPerPage=10;
  const navigate= useNavigate();
// Fetch books from backend
  useEffect(() =>{
    axios.get('http://localhost:8080/api/books')
      .then(res=>setBooks(res.data))
      .catch(err=>console.error("Error fetching books:",err));
  },[]);
// Delete book
  const deleteBook =(id) =>{
    axios.delete(`http://localhost:8080/api/books/${id}`)
      .then(() =>{
        const updated =books.filter(book =>book.id!== id);
        setBooks(updated);
      })
      .catch(err =>console.error("Error deleting:", err));
  };
// Sort books
  const sortByTitle = ()=>{
    const sorted = [...books].sort((a, b)=> a.title.localeCompare(b.title));
    setBooks(sorted);
  };
 const sortByRating =() =>{
    const sorted =[...books].sort((a,b) =>b.rating - a.rating);
    setBooks(sorted);
  };

  // Pagination
  const lastIndex = currentPage * booksPerPage;
  const firstIndex = lastIndex - booksPerPage;
  const currentBooks = books.slice(firstIndex,lastIndex);
  const totalPages = Math.ceil(books.length/booksPerPage);

  return(
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4" style={{color:'purple'}}>🟣 Book List</h2>
{/* Sort Buttons */}
        <div className="mb-3 d-flex gap-3">
          <button
            className="btn btn-sm"
            style={{backgroundColor:'purple',color:'white'}}
            onClick={sortByTitle}
          >
            Sort by Title
          </button>
          <button
            className="btn btn-sm"
            style={{ backgroundColor:'purple',color:'white'}}
            onClick={sortByRating}
          >
            Sort by Rating
          </button>
        </div>
{/* Table */}
        <table className="table table-bordered table-hover">
         <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map(book =>(
              <tr
                key={book.id}
                onClick={() =>navigate(`/books/${book.id}`)}
                style={{cursor:'pointer'}}
              >
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.rating}</td>
                <td>
                  <button
                    className="btn btn-sm"
                    style={{backgroundColor:'purple',color:'white'}}
                    onClick={(e) =>{
                      e.stopPropagation(); //avoid navigation on delete
                      deleteBook(book.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
{/* Pagination */}
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({length:totalPages },(_,i) =>(
              <li
                key={i}
                className={`page-item ${i+1 === currentPage ? 'active' : ''}`}
              >
                <button
                  className={`page-link`}
                  onClick={() =>setCurrentPage(i + 1)}
                  style={{
                    color:i+1 === currentPage ?'white':'purple',
                    backgroundColor:i+1=== currentPage ? 'purple':'white',
                    borderColor:'purple',
                    boxShadow:'none',
                    outline:'none'
                  }}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
       </div>
    </div>
  );
  }
export default BookList;