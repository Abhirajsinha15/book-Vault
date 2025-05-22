
document.addEventListener("DOMContentLoaded" , function (){
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
  
  const container = document.getElementById('bookCardsContainer');

container.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-heart-o")) {
    e.target.classList.remove("fa-heart-o");
    e.target.classList.add("fa-heart");

  } else if (e.target.classList.contains("fa-heart")) {
    e.target.classList.remove("fa-heart");
    e.target.classList.add("fa-heart-o");
  }

  likedBooks(); // Call outside the if-block
});

function likedBooks() {
  const cards = document.querySelectorAll("#bookCardsContainer .card");
  const likedBooksArray = [];

  cards.forEach(card => {
    if (card.querySelector(".fa-heart")) {
      const title = card.querySelector("h2").textContent;
      const author = card.querySelector("h3").textContent;
      const image = card.querySelector("img").src;

      likedBooksArray.push({
        title: title,
        author: author,
        image: image
      });
    }
  });

  // Save to localStorage
  localStorage.setItem("likedBooks", JSON.stringify(likedBooksArray));
}




})