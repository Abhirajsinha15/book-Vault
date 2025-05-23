document.addEventListener("DOMContentLoaded" , function(){

    const signUpForm = document.getElementById("signUpForm")
    const signInForm = document.getElementById("signInForm")
    const passwordInput = document.getElementById("userPassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const userAge = document.getElementById("userAge");
    const nameInput = document.getElementById("userName");
    const emailInput = document.getElementById("userEmail");
    const userId = document.getElementById("userId");
    const userPassword = document.getElementById("loginPassword")
    
    // -------------------------------------------VALIDATION OF SIGNUP FORM---------------------------------------------------------------------------\\
    // validate name live

    nameInput.addEventListener("input" ,function(e){
        const regex = /^[A-Za-z ]+$/;
        if (!regex.test(e.target.value)) {
            e.target.value = e.target.value.replace(/[^A-Za-z ]/g, "");
        }
        validateName(e.target);
    });

    nameInput.addEventListener("blur" , function(){
        validateName(nameInput)
    })

    function validateName(nameInput, onSubmit = false){
        const name = nameInput.value.trim();
        if(name.length < 3){
            showError(nameInput, "Name must be at least 3 characters.");

            return false;
        } else {
            showSuccess(nameInput)
            return true;
        }

    }

    // validte email (live)
    emailInput.addEventListener("input" , validateEmail);
    emailInput.addEventListener("blur" , validateEmail);


    function validateEmail(e, onSubmit = false) {
        const email = e.target.value;
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        if (!regex.test(email)) {
            // Only alert on submit or blur, not while typing
            if (onSubmit || e.type === "blur") {
                showError(emailInput , "Please enter a valid email")
            }
            return false;
        } else {
            showSuccess(emailInput)
            return true;
        }
    }
   

    // validate password

    passwordInput.addEventListener("blur", function(e){
        validatePassword(e);
    })

    function validatePassword(e = {}, onSubmit = false){
        const password = passwordInput.value;
        const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    
        if (!regex.test(password)) {
            showError(passwordInput, "Password must be at least 6 characters with one uppercase letter and one number.");
            return false;
        } else {
            showSuccess(passwordInput);
            return true;
        }
    }

    // validate confirm password

    confirmPassword.addEventListener("blur", function(e){
        validateConfirmPassword(e);
    })

    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
    
        if (confirmPassword !== password) {
            showError(confirmPasswordInput, "Passwords do not match");
            return false;
        } else {
            showSuccess(confirmPasswordInput);
            return true;
        }
    }

    
    
    
    signUpForm.addEventListener("submit" , function(e){
        e.preventDefault()
        const isNameValid = validateName(nameInput, true);
        const isEmailValid = validateEmail({ target: emailInput, type: "blur" }, true);
        const isPasswordValid = validatePassword({ target: passwordInput, type: "blur" }, true);
        const isconfirmPasswordValid = validateConfirmPassword();
        
        
        if (!isNameValid || !isEmailValid || !isPasswordValid || !isconfirmPasswordValid ) {
            return;
        }
        
        // storing data in local storage
        
        const userId = Date.now()
        // getting values from inputs
        
        const Name = nameInput.value;
        const email = emailInput.value;
        const password = confirmPasswordInput.value
        
        // create new user object
        const newUser = {id: userId , Name , email , password}

        // fetch existing users from localStorage
        let users = JSON.parse(localStorage.getItem("userList")) || [];

        // Add new user to the list
        users.push(newUser);
        
        //  Save updated list back to localStorage
        localStorage.setItem("userList" ,JSON.stringify(users));
        const lastUser = users[users.length-1];
        sessionStorage.setItem("loggedInUser" , JSON.stringify(lastUser));
        

        signUpForm.reset()
        
        window.location.href = "../html-pages/home.html";
        
        
        
        
    })
    // -------------------------------------------VALIDATION OF SIGNUP FORM--ENDS-------------------------------------------------------------------------\\
    // -------------------------------------------VALIDATION OF SIGNIN FORM--STARTS-------------------------------------------------------------------------\\


    //  const userId = document.getElementById("userId");
    // const userPassword = document.getElementById("loginPassword")


        if(userId){
            userId.addEventListener("input" , validateUserId);
            userId.addEventListener("blur" , validateUserId);
        }

        if(userPassword){
            userPassword.addEventListener("input" , validateUserPassword);
            userPassword.addEventListener("blur" , validateUserPassword);
        }

        function validateUserId(){
            const userEmail = userId.value.trim();
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if(userEmail === ""){
                showError(userId , "Email cannot be empty");
            }else if(!regex.test(userEmail)){
                showError(userId , "Invalid Email Format");

            } else{
                showSuccess(userId)
            }       
        }

        function validateUserPassword(){
          const userPassword = document.getElementById("loginPassword")
            const signinPassword = userPassword.value.trim();

            if(signinPassword === ""){
                showError(userPassword , "Password cannot be empty")
            }
            else{
                showSuccess(userPassword)
            }
        }


    signInForm.addEventListener("submit" ,function(e){
        e.preventDefault();

        validateUserId();
        validateUserPassword();
        
        const errorElements = document.querySelectorAll(".invalid");

        if(userId.value.trim() === "" || userPassword.value.trim() === "" ){
            alert("please fill in all fields before submittin");
            return;
        }

        

        if(errorElements.length > 0){
            alert("Please correct the errors before submitting the form.")
            return;
        }

        const loginSuccessful = storeLoggedInUserInSession();
    
        if (loginSuccessful) {
            window.location.href = "../html-pages/home.html";
        } else {
            alert("Incorrect email or password.");
        }
    })


    function storeLoggedInUserInSession(){
        const users = JSON.parse(localStorage.getItem("userList")) || [];
        const enteredEmail = userId.value.trim();
        const enteredPassword = userPassword.value;

        const matchedUser = users.find(user => user.email === enteredEmail);

        if(matchedUser && matchedUser.password === enteredPassword){
            sessionStorage.setItem("loggedInUser" , JSON.stringify(matchedUser));
            return true;
        }else{

            return false;
        }
    }
    



    function showError(input, message) {
        const errorSpan = input.nextElementSibling; // Target the span next to the input
        if (errorSpan && errorSpan.classList.contains("error")) {
            errorSpan.textContent = message;
            input.classList.add("invalid");
        }
    }
    
    function showSuccess(input) {
        const errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains("error")) {
            errorSpan.textContent = "";
        }
        input.classList.remove("invalid");
    }

    
} )