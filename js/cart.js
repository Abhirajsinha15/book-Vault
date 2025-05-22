document.addEventListener("DOMContentLoaded" , function (){
      const storedUser = sessionStorage.getItem("loggedInUser");
  
    const userObj = JSON.parse(storedUser);
    
       document.getElementById("userName").innerText = ` Hey! ${userObj.Name}`; 


        const likedBooks = JSON.parse(localStorage.getItem("likedBooks")) || [];
    const cartContainer = document.getElementById("cartContainer");

    likedBooks.forEach(book => {
     const col = document.createElement('div');
          col.className = 'col-md-6 col-lg-4 col-xl-4';

          col.innerHTML = `
            <div class="card mb-4">
              <div class="card-img">
                <img src="${book.image}" alt="${book.title}" class="img-fluid">
              </div>
              <div class="card-desc p-2">
              <div class = "d-flex justify-content-between">
                  <h2 style="font-size:1.2rem;">${book.title}</h2>  <i class="fa fa-heart" id="goToCartBtn" style="cursor: pointer;" title="Add to Cart" aria-hidden="true"></i>
              </div>
              
                <h3 style="font-size:1rem; color:gray;">${book.author}</h3>
              </div>
            </div>
          `;

          cartContainer.appendChild(col);
    });

    

cartContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-heart-o")) {
    e.target.classList.remove("fa-heart-o");
    e.target.classList.add("fa-heart");

  } else if (e.target.classList.contains("fa-heart")) {
    e.target.classList.remove("fa-heart");
    e.target.classList.add("fa-heart-o");
  }

});

    

  function logout(){
    const logOut = document.getElementById("logOut")

    logOut.addEventListener("click" , function (){
      sessionStorage.clear();
      window.location.href = "../html-pages/auth.html"
    })
  }
  logout()


})