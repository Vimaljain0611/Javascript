
// calls on submit of form
const form  = document.querySelector('#myForm');
form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    let valid = [];

    elementsArray.forEach((myTarget, index) =>{
        if(myTarget.type != 'null' && myTarget.type != 'radio' && myTarget.type != 'checkbox' && myTarget.type != 'submit' && myTarget.type != 'reset')
        {
            let message ="";
            if(myTarget.type == 'select' ) {
                message = "Select "+myTarget.label;
            }else{
                message = "Enter "+myTarget.label;
            }
            let input =  checkInput(myTarget.key,message);
            valid.push(input);
        }
    });   
    
    if (!valid.includes(false)) {
        insert_form(form);
    }
});

// For check input 
function checkInput(inputId,message ){
  
    let valid = false;
   
   let value =document.querySelector(`[key="${inputId}"]`).value;
  
    if (value == "") {
        showError('error_'+inputId, message );
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

// for Removing error
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
    switch (e.target.key) {
        
        case 'name':
            checkInput('name');
            break;
        case 'email':
            checkInput('email');
            break;
        case 'phone':
            checkInput('phone');
            break;
        case 'address':
            checkInput('address');
            break;
        case 'street_address':
            checkInput('street_address');
            break;    
        case 'city':
            checkInput('city');
            break;
        case 'state':
            checkInput('state');
            break;   
        case 'pin_code':
        checkInput('pin_code');
             break;
        case 'country	':
        checkInput('country	');
                break;  
    }
}));
