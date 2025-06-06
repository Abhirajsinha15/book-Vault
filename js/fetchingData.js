
document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchBook");

  let currentPage = 1;
  let currentQuery = "books";
  let isLoading = false;

  function fetchBooks(query = "books", showLoader = false, append = false) {
    const container = document.getElementById('bookCardsContainer');
    const loader = document.getElementById('loader');

    if (!append) container.innerHTML = '';
    if (showLoader) loader.style.display = 'block';

    isLoading = true;

    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        if (showLoader) loader.style.display = 'none';

        const books = data.docs.slice(0, 100);

        if (!append && books.length === 0) {
          container.innerHTML = `<p>No results found for "${query}".</p>`;
          return;
        }
const currentUserId = localStorage.getItem("currentUserId");
const key = `likedBooks_${currentUserId}`;
const likedBooks = JSON.parse(localStorage.getItem(key)) || [];

books.forEach(book => {
  const title = book.title;
  const author = book.author_name ? book.author_name[0] : "Author not found";
  const coverId = book.cover_i;
  const coverImg = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : 'https://via.placeholder.com/150x200?text=No+Image';

  // ✅ Check if this book is liked
  const isLiked = likedBooks.some(
    liked => liked.title === title && liked.author === author
  );

  // ❌ Skip rendering if al
  if (isLiked) return;

  const col = document.createElement('div');
  col.className = 'col-md-6 col-lg-4 col-xl-4';

  col.innerHTML = `
    <div class="card mb-4">
      <div class="card-img">
        <img src="${coverImg}" alt="${title}" class="img-fluid">
      </div>
      <div class="card-desc p-2">
        <div class="d-flex justify-content-between">
          <h2 style="font-size:1.2rem;">${title}</h2>  
          <i class="fa fa-heart-o" id="goToCartBtn" style="cursor: pointer;" title="Add to Cart" aria-hidden="true"></i>
        </div>
        <h3>${author}</h3>
      </div>
    </div>
  `;

  container.appendChild(col);
});

        isLoading = false;
        currentPage++;
      })
      .catch(error => {
        if (showLoader) loader.style.display = 'none';
        console.error('Error fetching book data:', error);
        container.innerHTML = `<p class=" text-center book-error">Something went wrong. Refresh the page.</p>`;
        isLoading = false;
      });
  }

  // Load default books
  fetchBooks("books", true);

  // Search functionality
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query !== "") {
      currentQuery = query;
      currentPage = 1;
      fetchBooks(query, true, false);
    }
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchBtn.click();
    }
  });

  // ✅ Infinite Scroll
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !isLoading
    ) {
      fetchBooks(currentQuery, true, true);

    }
  });
});
