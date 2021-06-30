
// calls on submit of form
const form  = document.querySelector('#myForm');
form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let istxtNameValid = checkInput('txtName1',"Enter Name");
        isEmailValid = checkInput('txtEmail',"Enter Email"),
        isAddressValid = checkInput('txtAddress',"Enter Address"),
        isPhoneValid = checkInput('txtPhone',"Enter Phone Number");
        isStreatValid = checkInput('txtStreet',"Enter Street");
        isCityValid = checkInput('txtCity',"Enter City");
        isStateValid = checkInput('txtState',"Enter State");
        isPincodeValid = checkInput('txtPincode',"Enter Pincode");
        isCountryValid = checkInput('txtCountry',"Select country");
       
    let isFormValid = istxtNameValid && isEmailValid && isAddressValid && isPhoneValid && isStreatValid && 
    isCityValid && isStateValid && isPhoneValid && isCountryValid && isPincodeValid ;

    if (isFormValid) {
        insert_form(form);
    }
});

// For check input 
function checkInput(inputId,massge){
  
    let valid = false;
    //let value = document.getElementById(inputKey);
    let value  = document.getElementById(inputId).value;

    if (value == "") {
        showError('error_'+inputId, massge);
    } else {
        showSuccess('error_'+inputId);
        valid = true;
    }
    return valid;
}

const isRequired = value => value === '' ? false : true;

// For showing error
const showError = (inputId, message) => {
    const error = document.getElementById(inputId);
    error.innerHTML = message+" *";
};

// For removing error
const showSuccess = (inputId) => {
    const error = document.getElementById(inputId);
    error.innerHTML = "";
}

// for remving error
const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
     
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
      
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'txtName1':
            checkInput('txtName1');
            break;
        case 'txtEmail':
            checkInput('txtEmail');
            break;
        case 'txtAddress':
            checkInput('txtAddress');
            break;
        case 'txtPhone':
            checkInput('txtPhone');
            break;
        case 'txtStreet':
            checkInput('txtStreet');
            break;    
        case 'txtCity':
            checkInput('txtCity');
            break;
        case 'txtPincode':
            checkInput('txtPincode');
            break;   
        case 'txtCountry':
        checkInput('txtCountry');
             break;
          
    }
}));
