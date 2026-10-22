const books = [
  {id:1,title:"The Alchemist",author:"Paulo Coelho",year:1988,available:true},
  {id:2,title:"Wings of Fire",author:"A. P. J. Abdul Kalam",year:1999,available:true},
  {id:3,title:"Clean Code",author:"Robert C. Martin",year:2008,available:true},
  {id:4,title:"Introduction to Algorithms",author:"Thomas H. Cormen",year:2009,available:true}
];
const borrowed = [];
const booksContainer = document.querySelector("#books");
function renderBooks(query="") {
  const filtered = books.filter(b => (b.title+" "+b.author).toLowerCase().includes(query.toLowerCase()));
  booksContainer.innerHTML = filtered.length ? filtered.map(b => `
    <article class="book"><h3>${b.title}</h3><p>Author: ${b.author}</p><p>Year: ${b.year}</p>
    <p><strong>${b.available ? "Available" : "Issued"}</strong></p>
    <button data-id="${b.id}" ${!b.available ? "disabled" : ""}>Borrow book</button></article>`).join("") : "<p>No matching books found.</p>";
}
booksContainer.addEventListener("click", e => {
  if(e.target.matches("button[data-id]")) {
    const book = books.find(b => b.id === Number(e.target.dataset.id));
    if(book && book.available) { book.available=false; borrowed.push(book.title); renderBooks(document.querySelector("#search").value); document.querySelector("#borrowed").textContent="Borrowed books: "+borrowed.join(", "); }
  }
});
document.querySelector("#search").addEventListener("input", e => renderBooks(e.target.value));
document.querySelector("#contactForm").addEventListener("submit", e => {e.preventDefault();document.querySelector("#contactStatus").textContent="Thank you! Your message has been recorded for this demo.";e.target.reset();});
renderBooks();