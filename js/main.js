// fetch('https://openlibrary.org/search.json?q=harry+potter')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data.docs); // array of books
//   });


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
})
