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
  if (
    e.target.classList.contains("fa-heart-o") ||
    e.target.classList.contains("fa-heart")
  ) {
    const card = e.target.closest(".card");
    const title = card.querySelector("h2").textContent;
    const author = card.querySelector("h3").textContent;
    const image = card.querySelector("img").src;

    const currentUserId = localStorage.getItem("currentUserId");
    if (!currentUserId) return;

    const key = `likedBooks_${currentUserId}`;
    let likedBooksArray = JSON.parse(localStorage.getItem(key)) || [];

    const bookIndex = likedBooksArray.findIndex(
      book => book.title === title && book.author === author
    );

    if (e.target.classList.contains("fa-heart-o")) {
      e.target.classList.remove("fa-heart-o");
      e.target.classList.add("fa-heart");

      if (bookIndex === -1) {
        likedBooksArray.push({ title, author, image });
        showToast("Added to cart");
      }
    } else {
      e.target.classList.remove("fa-heart");
      e.target.classList.add("fa-heart-o");

      if (bookIndex !== -1) {
        likedBooksArray.splice(bookIndex, 1);
        showToast("Removed from cart");
      }
    }

    localStorage.setItem(key, JSON.stringify(likedBooksArray));
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
 function setActiveNavLink() {
    const navLinks = document.querySelectorAll(".nav-link");
    console.log(navLinks);
    
    const currentPath = window.location.pathname.split("/").pop(); // e.g., "cart.html"
    console.log(currentPath);
    
    navLinks.forEach(link => {
      const hrefPath = link.getAttribute("href").replace("./", ""); // e.g., "home.html"
      console.log(hrefPath);

    if (hrefPath === currentPath) {
      link.classList.add("active");
      console.log(link);
      
    } else {
      link.classList.remove("active");
    }
  });
}


setActiveNavLink()

 const toggle = document.getElementById('switchCheckDefault');
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
  });

})