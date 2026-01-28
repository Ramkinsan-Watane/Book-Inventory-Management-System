Book Inventory Management System


Below is the working information of the Book Inventory Management System implemented as part of the assignment:

Users can add new books by entering all required book-related information through a form.

The book list is displayed in a table format with the following columns: Sr. No., Title, Author, Email, Age, and Actions.

The Actions column provides Edit and Delete options for each book.

Clicking (or double-clicking) on the book title opens the Book Details page, where complete book information is displayed along with Back and Save buttons.

The project supports pagination, displaying 10 books per page, with additional books shown on separate pages.

1️⃣ Create React App (one time)
npx create-react-app book-inventory
cd book-inventory

2️⃣ Install App Dependencies
npm install react-router-dom axios

3️⃣ Install Mock API (JSON Server)
npm install json-server --save-dev
OR (global – optional)

bash
Copy code
npm install -g json-server

✅ FINAL DEPENDENCY LIST
🔸 dependencies
react
react-dom
react-router-dom
axios
✅ Run 
json-server --watch db.json --port 5000
npm start