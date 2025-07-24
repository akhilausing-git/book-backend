import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom';
import './App.css';

function BookDetails(){
  const{id} = useParams();
  const navigate = useNavigate();
  const [book,setBook] = useState(null);
  const [googleData,setGoogleData] = useState(null);
  const [tab,setTab] = useState('basic');
// Fetch book details from Spring Boot API when component mounts or id changes
  useEffect(()=>{
    axios.get(`http://localhost:8080/api/books/${id}`)
      .then(res=>{
        setBook(res.data);
        fetchGoogleDetails(res.data.title);
      })
      .catch(err=>console.error("Book not found",err));
  },[id]);
// Fetch additional book info from Google Books API using title
  const fetchGoogleDetails=(title)=>{
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`)
      .then(res=>{
        if(res.data.items?.length){
          setGoogleData(res.data.items[0].volumeInfo);
        }
      })
      .catch(err=>console.error("Google Books error:",err));
  };

  if(!book)return <div className="text-center mt-5">Loading...</div>;

  return(
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="text-center text-purple mb-4" style={{ color: 'purple' }}>📓 Book Details</h3>
{/* Tabs */}
        <div className="d-flex justify-content-left my-3">
          <button
            className={`btn mx-2 ${tab ==='basic'?'btn-dark':''}`}
            style={{
              backgroundColor:tab==='basic'?'purple':'white',
              color:tab==='basic'?'white':'purple',
               bordercolor:'purple',
               border:'2px solid purple',
               borderRadius:'2px'
            }}
            onClick={()=>setTab('basic')}
          >
            Basic Details
          </button>
           <button
            className={`btn mx-2 ${tab==='more'?'btn-dark':''}`}
            style={{
              backgroundColor:tab==='more'?'purple':'white',
              color: tab==='more'?'white':'purple',
              bordercolor:'purple',
              borderRadius:'0px',
              border:'2px solid purple'
              }}
            onClick={()=>setTab('more')}
          >
            More Details
          </button>
        </div>
{/* Tab content */}
     <div className="mt-4 ">
       {tab==='basic'&&(
            <>
              <p><strong style={{color:'purple'}}>Title:</strong>{book.title}</p>
              <p><strong style={{color:'purple'}}>Author:</strong>{book.author}</p>
              <p><strong style={{color:'purple'}}>Genre:</strong>{book.genre}</p>
              <p><strong style={{color:'purple'}}>Publication Date:</strong>{book.publicationDate}</p>
              <p><strong style={{color:'purple'}}>ISBN:</strong>{book.isbn}</p>
              <p><strong style={{color:'purple'}}>Rating:</strong>{book.rating}</p>
            </>
          )}
{tab==='more'&& googleData &&(
            <>
              {googleData.imageLinks?.thumbnail && (
                <img src={googleData.imageLinks.thumbnail} alt="Cover" className="mb-3 img-thumbnail"/>
              )}
              <p><strong>Description:</strong>{googleData.description || 'Not available'}</p>
              <p><strong>Publisher:</strong>{googleData.publisher || 'N/A'}</p>
              <p><strong>Page Count:</strong>{googleData.pageCount || 'N/A'}</p>
            </>
          )}
        </div>
        <button
          className="btn"
          style={{
            backgroundColor:'purple',
            color:'white',
            border:'none',
            padding:'10px 20px',
            marginTop:'20px',
            borderRadius:'5px'
          }}
          onClick={()=>navigate('/books')}
        >
          ← Back to List
        </button>
  </div>
 </div>
  );
}
export default BookDetails;
