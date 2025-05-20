
document.addEventListener("DOMContentLoaded" , function (){

    fetch('https://openlibrary.org/search.json?q=book')
  .then(response => response.json())
  .then(data => {
    const books = data.docs.slice(0, 20); // 3x3 grid, so 9 items
    const container = document.getElementById('bookCardsContainer');
    
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
            <img src="${coverImg}" alt="${title}" >
            </div>
          <div class="card-desc p-2">
          <h2 style="font-size:1.2rem;">${title}</h2>
            <h3 style="font-size:1rem; color:gray;">${author}</h3>
            </div>
        </div>
        `;
        
        container.appendChild(col);
      })
    })
    .catch(error => console.error('Error fetching book data:', error));


  
})

const storedUser = sessionStorage.getItem("loggedInUser");
  
    const userObj = JSON.parse(storedUser);
    
       document.getElementById("userName").innerText = ` Hey! ${userObj.Name}`; 
  

  function logout(){
    const logOut = document.getElementById("logOut")

    logOut.addEventListener("click" , function (){
      sessionStorage.clear();
      window.location.href = "../html-pages/auth.html"
    })
  }
  logout()

// style="width:100%; height:250px; object-fit:cover"