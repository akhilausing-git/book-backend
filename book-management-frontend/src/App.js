import React from 'react';
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom';
import BookForm from './BookForm';
import BookList from './BookList';
import BookDetails from './BookDetails';
import HomePage from './HomePage';
import './App.css';

function App(){
  return(
    <Router>
      <div className="container mt-3">
        {/*Navigation Bar*/}
        <nav className="navbar navbar-expand-lg custom-navbar mb-4">
         <Link className="navbar-brand ms-3" to="/">Book Management</Link>
         <div className="collapse navbar-collapse">
           <ul className="navbar-nav ms-auto me-3">
             <li className="nav-item">
               <Link className="nav-link" to="/books">Books</Link>
              </li>
              <li className="nav-item">
               <Link className="nav-link" to="/add-book">Add Book</Link>
              </li>
            </ul>
          </div>
        </nav>
{/*Routes*/}
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/books" element={<BookList/>}/>
          <Route path="/add-book" element={<BookForm/>}/>
          <Route path="/books/:id" element={<BookDetails/>}/>
        </Routes>
      </div>
    </Router>
  );
}
export default App;



