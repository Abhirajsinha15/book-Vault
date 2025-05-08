document.addEventListener("DOMContentLoaded" , function(){

    const signUpForm = document.getElementById("signUpForm")
    const signInForm = document.getElementById("signInForm")
    const signUpBtn = document.getElementById('signUp');
    const loginBtn = document.getElementById('logIn');
    const passwordInput = document.getElementById("userPassword");
    const ConfirmPasswordInput = document.getElementById("confirmPassword");
    const userAge = document.getElementById("userAge");
    
    const nameInput = document.getElementById("userName");
    const emailInput = document.getElementById("userEmail");
    
    
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
        const confirmPassword = ConfirmPasswordInput.value;
    
        if (confirmPassword !== password) {
            showError(ConfirmPasswordInput, "Passwords do not match");
            return false;
        } else {
            showSuccess(ConfirmPasswordInput);
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
        signUpForm.reset()
        // alert("Sign-up form submited")
    })

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



