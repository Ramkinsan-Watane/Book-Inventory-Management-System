import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import BookDetails from "./components/BookDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/add" element={<BookForm />} />
        <Route path="/edit/:id" element={<BookForm />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
