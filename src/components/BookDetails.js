import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import '../BookDetails.css';


export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    api.get(`/books/${id}`).then((res) => {
      setBook(res.data);
    });
  }, [id]);

  if (!book) return <p className="loading11">Loading...</p>;

  return (
    <div className="container11">
      <div className="card11">
        <h2 className="title11">Book Details</h2>

        {/* IMAGE */}
        <img
          src={book.image}
          alt={book.title}
          className="image11"
        />

        <p className="text11"><b>Title:</b> {book.title}</p>
        <p className="text11"><b>Author:</b> {book.author}</p>
        <p className="text11"><b>Email:</b> {book.email}</p>
        <p className="text11"><b>Age:</b> {book.age}</p>
        <p className="text11"><b>Publisher:</b> {book.publisher}</p>
        <p className="text11"><b>Published Date:</b> {book.publishedDate}</p>

        <p className="label11"><b>Description:</b></p>
        <p className="description11">{book.description}</p>

        <button
          className="button11"
          onClick={() => navigate("/")}
        >
          Back to List
        </button>
      </div>
    </div>
  );
}
