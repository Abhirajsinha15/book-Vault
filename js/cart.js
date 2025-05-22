document.addEventListener("DOMContentLoaded" , function (){
      const storedUser = sessionStorage.getItem("loggedInUser");
  
    const userObj = JSON.parse(storedUser);
    
       document.getElementById("userName").innerText = ` Hey! ${userObj.Name}`; 


        const likedBooks = JSON.parse(localStorage.getItem("likedBooks")) || [];
    const cartContainer = document.querySelector(".cart-container");

    likedBooks.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img src="${book.image}" />
        <h2>${book.title}</h2>
    `;
    cartContainer.appendChild(card);
    console.log(card)
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