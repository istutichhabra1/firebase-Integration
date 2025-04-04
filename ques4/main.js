// Fetch Books
async function fetchBooks() {
    let res = await fetch("https://YOUR_PROJECT_ID.firebaseio.com/books.json");
    let data = await res.json();
    
    let booksArray = Object.entries(data || {}).map(([id, book]) => ({ id, ...book }));
    
    document.getElementById("books-list").innerHTML = booksArray
        .map(book => `<p>${book.title} by ${book.author} (${book.publishedYear}) <button onclick="deleteBook('${book.id}')">Delete</button></p>`)
        .join("");
}

// Add Book
async function addBook() {
    let title = document.getElementById("book-title").value;
    let author = document.getElementById("book-author").value;
    let genre = document.getElementById("book-genre").value;
    let year = document.getElementById("book-year").value;

    let book = { title, author, genre, publishedYear: parseInt(year), available: true };

    await fetch("https://YOUR_PROJECT_ID.firebaseio.com/books.json", {
        method: "POST",
        body: JSON.stringify(book),
        headers: { "Content-Type": "application/json" }
    });

    fetchBooks();
}

// Delete Book
async function deleteBook(bookId) {
    await fetch(`https://YOUR_PROJECT_ID.firebaseio.com/books/${bookId}.json`, {
        method: "DELETE"
    });
    fetchBooks();
}

// Fetch Members
async function fetchMembers() {
    let res = await fetch("https://YOUR_PROJECT_ID.firebaseio.com/members.json");
    let data = await res.json();
    
    let membersArray = Object.entries(data || {}).map(([id, member]) => ({ id, ...member }));
    
    document.getElementById("members-list").innerHTML = membersArray
        .map(member => `<p>${member.name} (Joined: ${member.membershipDate}) <button onclick="deleteMember('${member.id}')">Delete</button></p>`)
        .join("");
}

// Add Member
async function addMember() {
    let name = document.getElementById("member-name").value;
    let membershipDate = document.getElementById("member-date").value;

    let member = { name, membershipDate, active: true };

    await fetch("https://YOUR_PROJECT_ID.firebaseio.com/members.json", {
        method: "POST",
        body: JSON.stringify(member),
        headers: { "Content-Type": "application/json" }
    });

    fetchMembers();
}

// Delete Member
async function deleteMember(memberId) {
    await fetch(`https://YOUR_PROJECT_ID.firebaseio.com/members/${memberId}.json`, {
        method: "DELETE"
    });
    fetchMembers();
}
