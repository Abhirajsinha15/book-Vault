document.addEventListener("DOMContentLoaded" , function (){
   const storedUser = sessionStorage.getItem("loggedInUser");
  if (!storedUser) {
    window.location.href = "../html-pages/auth.html";
    return;
  }

  const userObj = JSON.parse(storedUser);
  document.getElementById("userName").innerText = `Hey! ${userObj.Name}`;

  const userId = userObj.id || userObj.ID || userObj.Id; // adjust this based on how you're storing the ID
  if (!userId) {
    console.error("User ID not found.");
    return;
  }

  localStorage.setItem("currentUserId", userId); // store for access on cart.js

  const container = document.getElementById('bookCardsContainer');

container.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-heart-o")) {
    e.target.classList.remove("fa-heart-o");
    e.target.classList.add("fa-heart");
        showToast("Added to cart");
  } else if (e.target.classList.contains("fa-heart")) {
    e.target.classList.remove("fa-heart");
    e.target.classList.add("fa-heart-o");
    showToast("Removed from  cart");
  }

  likedBooks(); // Update localStorage after every like/unlike
});

function likedBooks() {
  const currentUserId = localStorage.getItem("currentUserId");
  if (!currentUserId) return;

  const cards = document.querySelectorAll("#bookCardsContainer .card");
  const likedBooksArray = [];

  cards.forEach(card => {
    const isLiked = card.querySelector(".fa-heart");
    if (isLiked) {
      const title = card.querySelector("h2").textContent;
      const author = card.querySelector("h3").textContent;
      const image = card.querySelector("img").src;

      likedBooksArray.push({ title, author, image });
    }
  });

  localStorage.setItem(`likedBooks_${currentUserId}`, JSON.stringify(likedBooksArray));
}

 function logout(){
    const logOut = document.getElementById("logOut")

    logOut.addEventListener("click" , function (){
      sessionStorage.clear();
      window.location.href = "../html-pages/auth.html"
    })
  }
  logout()
 function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.visibility = "visible";
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.style.visibility = "hidden", 300);
  }, 2000); // Hide after 2 seconds
}



})