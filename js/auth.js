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
    // emailInput.addEventListener("input" , validateEmail);
    // emailInput.addEventListener("blur" , validateEmail);


    function validateEmail(emailInput , onSubmit = false){
        const email = emailInput.value;
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!regex.test(email)){
            // showError(emailInput , "invalid email address")
            alert("invalid email")
        }
        else{
            alert("valid email")
        }
    }


    signUpForm.addEventListener("submit" , function(e){
        e.preventDefault()
        const isNameValid = validateName(nameInput, true);
        const isEmailValid = validateEmail(emailInput, true);
    
        
        if (!isNameValid && !isEmailValid ) {
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



