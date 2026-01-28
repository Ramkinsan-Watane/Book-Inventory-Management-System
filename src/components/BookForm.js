import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function BookForm() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    email: "",
    age: "",
    publisher: "",
    publishedDate: "",
    description: ""
  });

  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  /* ---------- LOAD BOOK FOR EDIT ---------- */
  useEffect(() => {
    if (id) {
      api.get(`/books/${id}`).then(res => setBook(res.data));
    }
  }, [id]);

  /* ---------- VALIDATION ---------- */
  const validate = () => {
    let err = {};

    if (!book.title.trim()) err.title = "Title is required";
    if (!book.author.trim()) err.author = "Author is required";

    if (!book.email.trim()) {
      err.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(book.email)) {
      err.email = "Invalid email format";
    }

    if (!book.age) {
      err.age = "Age is required";
    } else if (isNaN(book.age) || Number(book.age) <= 0) {
      err.age = "Age must be a positive number";
    }

    if (!book.publisher.trim()) err.publisher = "Publisher is required";
    if (!book.publishedDate) err.publishedDate = "Published date is required";
    if (!book.description.trim()) err.description = "Description is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ---------- HANDLE CHANGE ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (id) {
      await api.put(`/books/${id}`, book);
    } else {
      await api.post("/books", book);
    }

    navigate("/");
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "500px", margin: "auto" ,height:"109%" }}>
        <h2>{id ? "Edit Book" : "Add Book"}</h2>

        <input name="title" placeholder="Title" value={book.title} onChange={handleChange} />
        {errors.title && <small className="error">{errors.title}</small>}

        <input name="author" placeholder="Author" value={book.author} onChange={handleChange} />
        {errors.author && <small className="error">{errors.author}</small>}

        <input name="email" placeholder="Email" value={book.email} onChange={handleChange} />
        {errors.email && <small className="error">{errors.email}</small>}

        <input name="age" placeholder="Age" value={book.age} onChange={handleChange} />
        {errors.age && <small className="error">{errors.age}</small>}

        <input name="publisher" placeholder="Publisher" value={book.publisher} onChange={handleChange} />
        {errors.publisher && <small className="error">{errors.publisher}</small>}

        <input type="date" name="publishedDate" value={book.publishedDate} onChange={handleChange} />
        {errors.publishedDate && <small className="error">{errors.publishedDate}</small>}

        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          value={book.description}
          onChange={handleChange}
        />
        {errors.description && <small className="error">{errors.description}</small>}

        <button
          className="btn-add12"
          style={{ width: "100%", marginTop: "10px" }}
          onClick={handleSubmit}
        >
          Save
        </button>

        <button
          className="btn-delete"
          style={{ width: "100%", marginTop: "8px" }}
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
}
