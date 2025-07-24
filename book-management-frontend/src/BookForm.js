import './App.css';
import {React,useState} from 'react';
import axios from 'axios';
//State for book input fields
function BookForm(){
  const[book,setBook] = useState({
    title:'',
    author:'',
    publicationDate:'',
    isbn:'',
    genre:'',
    rating:''
  });
//State for form validation errors
  const [errors,setErrors]=useState({});
  const genres =[
    'Fiction','Non-Fiction','Mystery','Fantasy','Romance','Sci-Fi','Others'
  ];
//Handle input changes
  const handleChange =(e)=>{
    setBook({...book,[e.target.name]:e.target.value});
  };
//Validate Form
  const validate=()=>{
    const newErrors={};
    const titleRegex = /^[A-Za-z0-9 .,:;!?'"()\*-]+$/;
    const authorRegex = /^[A-Za-z .]+$/;
    const isbnRegex=/^\d{13}$/;
//Title
    if(!book.title.trim()){
      newErrors.title='Title is required';
    }else if(book.title.length>100){
      newErrors.title='Maximum 100 characters';
    }else if(!titleRegex.test(book.title)){
      newErrors.title='Invalid';
    }
//Author
    if(!book.author.trim()){
      newErrors.author='Author is required';
    }else if(book.author.length>50){
      newErrors.author='Maximum 50 characters';
    }else if(!authorRegex.test(book.author)){
      newErrors.author='Invalid';
    }
//Publication Date
    if(!book.publicationDate){
      newErrors.publicationDate='Publication date is required';
    }
//ISBN
    if(!book.isbn){
      newErrors.isbn='ISBN is required';
    }else if(!isbnRegex.test(book.isbn)){
      newErrors.isbn='ISBN must be exactly 13 digits';
    }
//Genre
    if(!book.genre){
      newErrors.genre='Genre is required';
    }
//Rating
    const rating=Number(book.rating);
            if(!rating){
              newErrors.rating='Rating is required';
            }else if(rating<1 || rating>5){
              newErrors.rating='Rating must be between 1 and 5';
            }
    setErrors(newErrors);//Update error state
        return Object.keys(newErrors).length === 0;//Return true if no errors
      };
//Handle form submit
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!validate()) return;
//Send book data to backend
    try {
      await axios.post('http://localhost:8080/api/books', book);
      alert('Book added successfully!');
      //Reset form
      setBook({
        title:'',
        author:'',
        publicationDate:'',
        isbn:'',
        genre:'',
        rating:''
      });
      setErrors({});
    }catch(error){
      console.error('Error adding book:',error.response?.data || error.message);
      alert('Error adding book.');
    }
 };


  return(
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="card-title text-center mb-4" style= {{color:'purple'}}>🟪 Add a New Book</h3>
        {/* Form starts here */}
        <form onSubmit={handleSubmit}>
          <div className="row">
{/* Title Input */}
            <div className="col-md-6 mb-3" style= {{color:'purple'}} >
              <label className="form-label fw-bold">✒️Title</label>
              <input
                type="text"
                name="title"
                className={`form-control ${errors.title ?'is-invalid':''}`}
                value={book.title}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
{/* Author Input */}
            <div className="col-md-6 mb-3" style={{color:'purple'}} >
              <label className="form-label fw-bold">👤Author</label>
              <input
                type="text"
                name="author"
                className={`form-control ${errors.author ? 'is-invalid':''}`}
                value={book.author}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.author && <div className="invalid-feedback">{errors.author}</div>}
            </div>
          </div>

          <div className="row">
{/* Publication Date */}
            <div className="col-md-6 mb-3" style={{color:'purple' }}>
              <label className="form-label fw-bold">🗓️Publication Date</label>
              <input
                type="date"
                name="publicationDate"
                className={`form-control ${errors.publicationDate ? 'is-invalid' :''}`}
                value={book.publicationDate}
                onChange={handleChange}
              />
              {errors.publicationDate && <div className="invalid-feedback">{errors.publicationDate}</div>}
            </div>
{/* ISBN */}
            <div className="col-md-6 mb-3" style= {{color:'purple'}}>
             <label className="form-label fw-bold">🔢ISBN</label>
              <input
                type="text"
                name="isbn"
                className={`form-control ${errors.isbn ? 'is-invalid':''}`}
                value={book.isbn}
                onChange={handleChange}
                autoComplete="off"
                inputMode="numeric"
             />
              {errors.isbn && <div className="invalid-feedback">{errors.isbn}</div>}
            </div>
            </div>
<div className="row">
{/* Genre */}
            <div className="col-md-6 mb-3" style= {{color:'purple'}}>
              <label className="form-label fw-bold">🎭Genre</label>
              <select
                name="genre"
                className={`form-control ${errors.genre ? 'is-invalid' :''}`}
                value={book.genre}
                onChange={handleChange}
              >
                <option value="">Select a genre</option>
                {genres.map((g,i)=>(
                  <option key={i} value={g}>{g}</option>
                ))}
              </select>
              {errors.genre && <div className="invalid-feedback">{errors.genre}</div>}
            </div>
{/* Rating */}
            <div className="col-md-6 mb-3" style={{color:'purple'}}>
              <label className="form-label fw-bold">💜Rating</label>
              <input
                type="text"
                name="rating"
                step="0.1"
                className={`form-control ${errors.rating ? 'is-invalid':''}`}
                value={book.rating}
                onChange={handleChange}
                min="1"
                max="5"
                autoComplete="off"
                inputMode="numeric"
              />
              {errors.rating && <div className="invalid-feedback">{errors.rating}</div>}
            </div>
          </div>
{/* Submit Button */}
        <button type="submit" className="btn btn-purple w-100 mt-3">
          ✔️ Add Book
        </button>
        </form>
      </div>
    </div>
  );
}


export default BookForm;


