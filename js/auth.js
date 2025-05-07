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
            // showError(input, "Name must be at least 3 characters.");

            return false;
        } else {
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
                alert("invalid email");
            }
            return false;
        } else {

            return true;
        }
    }

    // validate password

    passwordInput.addEventListener("input", function(){
        validatePassword();
    })

    function validatePassword(){
        const password = passwordInput.value;
        const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;


        if (!regex.test(password)) {
            // Only alert on submit or blur, not while typing
            if (onSubmit || e.type === "blur") {
                alert("invalid password");
            }
            return false;
        } else {

            return true;
        }

    }


    

    signUpForm.addEventListener("submit" , function(e){
        e.preventDefault()
        const isNameValid = validateName(nameInput, true);
        const isEmailValid = validateEmail({ target: emailInput, type: "blur" }, true);
        const isPasswordValid = validatePassword({ target: passwordInput, type: "blur" }, true);
    
        
        if (!isNameValid || !isEmailValid || !isPasswordValid ) {
            alert("Please fix the errors before submitting.");
            return;
        }
        signUpForm.reset()
        // alert("Sign-up form submited")
    })

    // signInForm.addEventListener("submit" , function(e){
    //     alert("Sign-In form submited")
    // })

    
} )



