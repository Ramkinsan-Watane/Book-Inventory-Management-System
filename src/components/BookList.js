import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10
    ;

  const navigate = useNavigate();

  const loadBooks = async () => {
    const res = await api.get("/books");
    setBooks(res.data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const deleteBook = async (id) => {
    await api.delete(`/books/${id}`);
    loadBooks();
  };

  // 🔹 Pagination logic
  const lastIndex = currentPage * booksPerPage;
  const firstIndex = lastIndex - booksPerPage;
  const currentBooks = books.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div className="container">
      <div className=" H1 ">
        <h1>Book Inventory Management System  </h1>
      </div >
      <div className=" H2 ">
         <h2>Add  Book </h2>

      <button className="btn-add" onClick={() => navigate("/add")}>
        Add Book
      </button>
      </div >
     

      <div className="card table-container">
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Title</th>
              <th>Author</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentBooks.map((book, index) => (
              <tr key={book.id}>
                {/* Serial number across pages */}
                <td>{firstIndex + index + 1}</td>

                <td
                  onClick={() => navigate(`/book/${book.id}`)}
                  style={{ color: "#007bff", cursor: "pointer" }}
                >
                  {book.title}
                </td>

                <td>{book.author}</td>
                <td>{book.email}</td>
                <td>{book.age}</td>

                <td>
                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/edit/${book.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() => deleteBook(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination Buttons */}
<div className="pagination">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>

  <span>
    Page {currentPage} of {totalPages}
  </span>

  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>

    </div>
  );
}
