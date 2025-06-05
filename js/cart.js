document.addEventListener("DOMContentLoaded", function () {
  const storedUser = sessionStorage.getItem("loggedInUser");
  const userObj = JSON.parse(storedUser);
  document.getElementById("userName").innerText = ` Hey! ${userObj.Name}`;

  const currentUserId = localStorage.getItem("currentUserId");
  if (!currentUserId) return;

  let likedBooks = JSON.parse(localStorage.getItem(`likedBooks_${currentUserId}`)) || [];
  
  const cartContainer = document.getElementById("cartContainer");
  
  
  function renderCart() {
  cartContainer.innerHTML = ""; // Clear before re-rendering

  if (likedBooks.length === 0) {
    const message = document.createElement('div');
    message.className = "text-center w-100 my-5 message-div"; // Center the message
    message.innerHTML = `<h3>Add books to your cart</h3>`;
    cartContainer.appendChild(message);
    return; // Exit early if no books
  }

  likedBooks.forEach((book, index) => {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 col-xl-4';
    col.dataset.index = index;

    col.innerHTML = `
      <div class="card mb-4">
        <div class="card-img">
          <img src="${book.image}" alt="${book.title}" class="img-fluid">
        </div>
        <div class="card-desc p-2">
          <div class="d-flex justify-content-between">
            <h2 style="font-size:1.2rem;">${book.title}</h2>  
            <i class="fa fa-heart" style="cursor: pointer;" title="Remove from Cart"></i>
          </div>
          <h3s>${book.author}</h3s>
        </div>
      </div>
    `;

    cartContainer.appendChild(col);
  });
}
  renderCart();



  // Event delegation for removing books
  cartContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("fa-heart")) {
      const card = e.target.closest(".col-md-6");
      const index = parseInt(card.dataset.index);

      // Remove from array and update localStorage
      likedBooks.splice(index, 1);
      localStorage.setItem(`likedBooks_${currentUserId}`, JSON.stringify(likedBooks));

      // Re-render cart
      renderCart();
    }
  });

 const toggle = document.getElementById('switchCheckChecked');
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
  });

   function logout(){
    const logOut = document.getElementById("logOut")

    logOut.addEventListener("click" , function (){
      sessionStorage.clear();
      window.location.href = "../index.html"
    })
  }
  logout()

});