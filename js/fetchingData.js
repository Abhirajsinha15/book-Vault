// document.addEventListener("DOMContentLoaded", function () {
//   function fetchBooks(query = "books" ,  showLoader = false) {
//     const container = document.getElementById('bookCardsContainer');
//     const loader = document.getElementById('loader');
    

//     container.innerHTML = '';
//       if (showLoader) loader.style.display = 'block';

//     fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
//       .then(response => response.json())
//       .then(data => {
//         if (showLoader) loader.style.display = 'none';
        
//         const books = data.docs.slice(0, 20);

//         if (books.length === 0) {
//           container.innerHTML = `<p>No results found for "${query}".</p>`;
//           return;
//         }

//         books.forEach(book => {
//           const title = book.title;
//           const author = book.author_name ? book.author_name[0] : "Author not found";
//           const coverId = book.cover_i;
//           const coverImg = coverId
//             ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
//             : 'https://via.placeholder.com/150x200?text=No+Image';

//           const col = document.createElement('div');
//           col.className = 'col-md-6 col-lg-4 col-xl-4';

//           col.innerHTML = `
//             <div class="card mb-4">
//               <div class="card-img">
//                 <img src="${coverImg}" alt="${title}" class="img-fluid">
//               </div>
//               <div class="card-desc p-2">
//                 <h2 style="font-size:1.2rem;">${title}</h2>
//                 <h3 style="font-size:1rem; color:gray;">${author}</h3>
//               </div>
//             </div>
//           `;

//           container.appendChild(col);
//         });
//       })
//       .catch(error => {
//              if (showLoader) loader.style.display = 'none';
//         console.error('Error fetching book data:', error);
//         container.innerHTML = `<p class="text-danger">Something went wrong. Please try again later.</p>`;
//       });
//   }

//   // Load default books
//   fetchBooks("books", true);



// });


document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchBook");



  function fetchBooks(query = "books", showLoader = false) {
    const container = document.getElementById('bookCardsContainer');
    const loader = document.getElementById('loader');

    container.innerHTML = '';
    if (showLoader) loader.style.display = 'block';
   

    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {

      
      
        if (showLoader) loader.style.display = 'none';

        const books = data.docs.slice(0, 20);

       

        if (books.length === 0) {
          container.innerHTML = `<p>No results found for "${query}".</p>`;
          return;
        }

        books.forEach(book => {
          const title = book.title;
          const author = book.author_name ? book.author_name[0] : "Author not found";
          const coverId = book.cover_i;
          const coverImg = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
            : 'https://via.placeholder.com/150x200?text=No+Image';

          const col = document.createElement('div');
          col.className = 'col-md-6 col-lg-4 col-xl-4';

          col.innerHTML = `
            <div class="card mb-4">
              <div class="card-img">
                <img src="${coverImg}" alt="${title}" class="img-fluid">
              </div>
              <div class="card-desc p-2">
                <h2 style="font-size:1.2rem;">${title}</h2>
                <h3 style="font-size:1rem; color:gray;">${author}</h3>
              </div>
            </div>
          `;

          container.appendChild(col);
        });
      })
      .catch(error => {
        if (showLoader) loader.style.display = 'none';
        console.error('Error fetching book data:', error);
        container.innerHTML = `<p class="text-danger">Something went wrong. Please try again later.</p>`;
      });
  }

  // Load default books
  fetchBooks("books", true);

  // Enable search functionality
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query !== "") {
      fetchBooks(query, true);
    }
  
  });

  // Optional: Trigger search on Enter key
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchBtn.click();
    }
  });
});

