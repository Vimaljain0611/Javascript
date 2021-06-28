let elementsArray = [
    {
        type: 'null',
        key: 'userId',
        label: 'User Id',
        unique: true,
        getValue: function (elementsArray, obj) {
            return getRandomNumber();
        }
    }, {
        type: 'null',
        key: 'createdAt',
        label: 'Created At',
        getValue: function () {
            return new Date().getTime();
        }
    },
    {
        type: 'text',
        label: 'Name',
        key: 'name',
        value: '',
        attr: {
            id: 'txtName1',
            className: 'textInput',
            placeholder: 'Enter name',
            name: 'txtName',
            required: true,
            onchange: function (e) {

            }
        }
    },
    {
        type: 'email',
        label: 'Email',
        key: 'email',
        value: '',
        attr: {
            id: 'txtEmail',
            className: 'textInput',
            placeholder: 'Enter email',
            name: 'txtName',
            required: true,
            onchange: function (e) {

            }
        }
    },
    {
        type: 'tel',
        label: 'Phone',
        key: 'phone',
        value: '',
        attr: {
            id: 'txtPhone',
            className: 'textInput',
            placeholder: 'Enter phone number',
            name: 'txtName',
            required: true,
            onchange: function (e) {

            }
        }
    },
    {
        type: 'textarea',
        label: 'Address',
        key: 'address',
        value: '',
        attr: {
            id: 'txtAddress',
            className: 'textInput',
            placeholder: 'Enter Address',
            rows: '5',
            name: 'txtName',
            required: true,
            onchange: function (e) {

            }
        }
    },
    {
        type: 'text',
        label: 'Street Address',
        key: 'street_address',
        value: '',
        attr: {
            id: 'txtStreet',
            className: 'textInput',
            placeholder: 'Enter Street Address',
            name: 'txtName',
            required: true,
            onchange: function (e) {

            }
        }
    },
    {
        type: 'text',
        label: 'City',
        key: 'city',
        value: '',
        attr: {
            id: 'txtCity',
            className: 'textInput',
            placeholder: 'Enter City',
            name: 'txtName',
            required: true,
            onchange: function (e) {

            }
        }
    },
    {
        type: 'text',
        label: 'State',
        key: 'state',
        value: '',
        attr: {
            id: 'txtState',
            className: 'textInput',
            placeholder: 'Enter State',
            name: 'txtName',
            required: true,
            onchange: function (e) {

            }
        }
    },
    {
        type: 'number',
        label: 'Pin Code',
        key: 'pin_code',
        value: '',
        attr: {
            id: 'txtPincode',
            className: 'textInput',
            placeholder: 'Enter Pin Code',
            name: 'txtName',
            required: true,
            onchange: function (e) {

            }
        }
    },
    {
        type: 'select',
        label: 'Country',
        key: 'country',
        value: '',
        attr: {
            id: 'txtCountry',
            name: 'country',
            required: true,
            className: 'columns',
            onchange: function (e,d) {
                    console.log(e,d)
            }
        },
        options: [
            {
                innerHTML: 'Select Country',
                value: ''
            },
            {
                innerHTML: 'India',
                value: 'india'
            },
            {
                innerHTML: 'United States',
                value: 'united-states'
            },
            {
                innerHTML: 'Sri Lanka',
                value: 'sri-lanka'
            }
        ]
    },
    {
        type: 'radio',
        label: 'Gender',
        key: 'gender',
        value: '',
        options: [
            {
                innerHTML: 'Male',
                value: 'male',
                name: 'gender',
                attr: {
                    id: 'male',
                    className: 'radioGender',
                    required: true,
                    onchange: function (e) {

                    }
                }
            },
            {
                innerHTML: 'Female',
                value: 'female',
                name: 'gender',
                attr: {
                    id: 'female',
                    className: 'radioGender',
                    required: true,
                    onchange: function (e) {

                    }
                }
            }
        ]
    },
    {
        type: 'checkbox',
        label: 'Hobbies',
        key: 'hobbies',
        value: '',
        options: [
            {
                innerHTML: 'Swimming',
                value: 'swimming',
                attr: {
                    id: 'swimming',
                    className: 'radioHobbies',
                    onchange: function (e,d) {
                            console.log(e,d)
                    }
                }
            },
            {
                innerHTML: 'Singing',
                value: 'singing',
                attr: {
                    id: 'singing',
                    className: 'radioHobbies',
                    onchange: function (e) {

                    }
                }
            },
            {
                innerHTML: 'Writing',
                value: 'writing',
                attr: {
                    id: 'writing',
                    className: 'radioHobbies',
                    onchange: function (e) {

                    }
                }
            }
        ]
    },
    {
        type: 'submit',
        attr: {
            id: 'btnSubmit',
            name: 'btnSubmit',
            className: 'submit',
            value: 'Submit',
            onclick: (e, obj, array, dataObjArray) => {
                 createNewTable(dataObjArray, array);
            console.log(e, obj, array, dataObjArray)

                if (array.filter(function (d) {
                    if (d.type !== 'submit' && d.type !== 'null') {
                        return validate(obj, d.errorMsg, d.errorElement, d.value, d.type);
                    }
                }).length === 0) {
                    createNewTable(dataObjArray, array);
                }
            }
        }
    },
    {
        type: 'reset',
        attr: {
            id: 'btnReset',
            name: 'btnReset',
            className: 'reset',
            value: 'Reset',
            onclick: (e, obj, array, dataObjArray) => {

            }
        }
    }
];
var fieldsArray = [];



var formView = document.getElementById('formView');
formView.appendChild(tableView(elementsArray));

function tableView(obj) {

  var result = document.createElement('table');
  result.className ="table table-responsive-sm ";  
    var trCount = 1;
    
    obj.forEach((myTarget, index) =>{
      
        var list = document.createElement('tr');
        if(trCount%2 == 0 )
        {
            list.className ="odd-tr";
        }else{
            list.className ="even-tr";
        }

        // For text ,number ,email ,tel Inpiuts
        if(myTarget.type == 'text' || myTarget.type == 'number' || myTarget.type == 'email' || myTarget.type == 'tel') {
            let cell = document.createElement('th');
              let lablNode = document.createElement("Label");
              let Textnode = document.createTextNode(myTarget.label); 
              lablNode.appendChild(Textnode);
              cell.appendChild(lablNode);
              list.appendChild(cell);   
              let cell2 = document.createElement("td"); 
              let cellinput = document.createElement("input");
              cellinput.type= myTarget.type;
              cellinput.key=myTarget.key;
              cellinput.value = myTarget.value;
            //   cellinput.setAttribute = addEventListener('blur',function (e) {
            //     e.preventDefault;
            //     let tx = document.getElementById(myTarget.attr.id).value;    
            //     if(tx="")
            //         {
            //             showError('error_'+myTarget.attr.id, "Enter "+myTarget.label);
            //         }else{
            //             showSuccess('error_'+myTarget.attr.id);
            //         }
            //   });
              
            // attributes 
             cellinput.id = myTarget.attr.id;
             cellinput.className = myTarget.attr.className;
             cellinput.placeholder = myTarget.attr.placeholder;
             cellinput.name = myTarget.attr.name;
             
            cell2.appendChild(cellinput);
            let error_msg = document.createElement("p");
            error_msg.id="error_"+myTarget.attr.id;
            error_msg.className = "error";
            cell2.appendChild(error_msg);
              list.appendChild(cell2);
              fieldsArray.push(myTarget.label);
        }

          // For textarea
        if(myTarget.type == 'textarea' ) {
            let cell = document.createElement('th');
              let lablNode = document.createElement("Label");
              let Textnode = document.createTextNode(myTarget.label); 
              lablNode.appendChild(Textnode);
              cell.appendChild(lablNode);
              list.appendChild(cell);   

              let cell2 = document.createElement("td"); 
              let cellinput = document.createElement(myTarget.type);
              cellinput.key=myTarget.key;
              cellinput.value = myTarget.value;
              
           // attributes  
             cellinput.id = myTarget.attr.id;
             cellinput.className = myTarget.attr.className;
             cellinput.placeholder = myTarget.attr.placeholder;
             cellinput.name = myTarget.attr.name;
             cellinput.rows= myTarget.attr.rows;
            // cellinput.required = myTarget.attr.required;
             cellinput.onchange = myTarget.attr.onchange;
             let error_msg = document.createElement("p");
             error_msg.id="error_"+myTarget.attr.id;
             error_msg.className = "error";
             cell2.appendChild(error_msg);                 
              cell2.appendChild(cellinput);
              list.appendChild(cell2);
            fieldsArray.push(myTarget.label);
        }

        // For select box
        if(myTarget.type == 'select' ) {
            let cell = document.createElement('th');
              let lablNode = document.createElement("Label");
              let Textnode = document.createTextNode(myTarget.label); 
              lablNode.appendChild(Textnode);
              cell.appendChild(lablNode);
              list.appendChild(cell);   

              let cell2 = document.createElement("td"); 
              let cellinput = document.createElement(myTarget.type);
              cellinput.key=myTarget.key;
              
            // attributes  
            cellinput.id = myTarget.attr.id;
            cellinput.className = myTarget.attr.className;
            cellinput.name = myTarget.attr.name;
            
            cellinput.onchange = myTarget.attr.onchange;
             
              myTarget.options.forEach((opt, index) =>{
                let optNode = document.createElement("option");
                optNode.value = opt.value;
                optNode.innerHTML = opt.innerHTML;
                return cellinput.appendChild(optNode);
               });
               
                let error_msg = document.createElement("p");
                error_msg.id="error_"+myTarget.attr.id;
                error_msg.className = "error";
                cell2.appendChild(error_msg);

              cell2.appendChild(cellinput);
              list.appendChild(cell2);
            fieldsArray.push(myTarget.label);
        }

        // For rdaio
        if(myTarget.type == 'radio' ) {
            let cell = document.createElement('th');
              let lablNode = document.createElement("Label");
              let Textnode = document.createTextNode(myTarget.label); 
              lablNode.appendChild(Textnode);
              cell.appendChild(lablNode);
              list.appendChild(cell);   

              let cell2 = document.createElement("td"); 
           
             
              myTarget.options.forEach((opt, index) =>{
                
                let radioNode = document.createElement("input");
                radioNode.type = myTarget.type;  
                radioNode.value = opt.value;
                radioNode.name = opt.name;
                //attr
                radioNode.id = opt.attr.id;
                radioNode.className = opt.attr.className;
               // radioNode.required = opt.attr.required;
                cell2.appendChild(radioNode);

                let textLabel = document.createElement("label");
                textLabel.textContent = opt.innerHTML;
                textLabel.className = "radioLabel";
              //  cell2.appendChild(textLabel);
                return cell2.appendChild(textLabel);
               });
            let error_msg = document.createElement("p");
            error_msg.id="error_"+myTarget.key;
            error_msg.className = "error";
            cell2.appendChild(error_msg);

              list.appendChild(cell2);
              fieldsArray.push(myTarget.label);
        }

        // For checkbox
        if(myTarget.type == 'checkbox' ) {
            let cell = document.createElement('th');
              let lablNode = document.createElement("Label");
              let Textnode = document.createTextNode(myTarget.label); 
              lablNode.appendChild(Textnode);
              cell.appendChild(lablNode);
              list.appendChild(cell);   

              let cell2 = document.createElement("td"); 
           
              myTarget.options.forEach((opt, index) =>{
                

                let radioNode = document.createElement("input");
                radioNode.type = myTarget.type;  
                radioNode.value = opt.value;
                radioNode.name = opt.key;
                //radioNode.
                //attr
                radioNode.id = opt.attr.id;
                radioNode.className = opt.attr.className;
                //radioNode.required = opt.attr.required;

                cell2.appendChild(radioNode);
                
                let textLabel = document.createElement("label");
                textLabel.textContent = opt.innerHTML;
                textLabel.className = "checkboxLabel";
                //cell2.appendChild(textLabel);
               
                return cell2.appendChild(textLabel);
               });
               let error_msg = document.createElement("p");
               error_msg.id="error_"+myTarget.key;
               error_msg.className = "error";
               cell2.appendChild(error_msg);
          
              list.appendChild(cell2);
              fieldsArray.push(myTarget.label);
        }

        // For buttons
        if(myTarget.type == 'submit' || myTarget.type == 'reset'  ) {
            let cell = document.createElement('th');
                cell.colSpan ="2";
                let btnNode = document.createElement("button");
                
                btnNode.type = myTarget.type;  
                if(myTarget.type == 'reset')
                {
                    btnNode.onclick = myTarget.attr.onclick;              
                }
                
                //attr
                btnNode.id = myTarget.attr.id;
                btnNode.name = myTarget.attr.name;
                btnNode.textContent = myTarget.attr.value;
                btnNode.className = myTarget.attr.className;
                btnNode.value = myTarget.attr.value;
               
                cell.appendChild(btnNode);
                list.appendChild(cell);

        }

     result.appendChild(list); 
     trCount++;
     
    });
    
  return result;
}

function uuidv4() {
    return 'xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 6 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(6);
    });
  }

function insert_form(form)
{ 
    var checkedValue = []; 
    var inputElements = document.getElementsByClassName('radioHobbies');
    for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked){
            checkedValue.push(inputElements[i].value);
        }
    }
    let existing = [];
    existing = localStorage.getItem('Form_data');
    if(existing != null){
      existing = JSON.parse(existing);
    }else{
        existing = [];
    }
 
    const data = {};
    data['id']=uuidv4();
    elementsArray.forEach((myTarget, index) =>{
        if(myTarget.type == 'textarea' || myTarget.type == 'text' || myTarget.type == 'number' || myTarget.type == 'email' || myTarget.type == 'tel' || myTarget.type == 'checkbox' ||myTarget.type == 'radio' || myTarget.type == 'select') {
          
            if(myTarget.type == 'checkbox' ){
                 data[myTarget.label] = checkedValue; 
                }
            else if(myTarget.type == 'radio' ){
                 rate_value = form.gender.value;
                 data[myTarget.label] = rate_value;
            } 
            else{ 
                console.log(myTarget.attr.id);
              
               let value = document.getElementById([myTarget.attr.id]).value;
                data[myTarget.label] = value;
            }
        }
        });
    existing.push(data);
    localStorage.setItem('Form_data',JSON.stringify(existing));
    location.reload();
 
}

// For check input 
function checkInput(inputId,massge){
  
    let valid = false;
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
const showError = (input, message) => {
    const error = document.getElementById(input);
    error.innerHTML = message+" *";
};

// For removing error
const showSuccess = (input) => {
    const error = document.getElementById(input);
    error.innerHTML = "";
}

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

thead_View();
function thead_View() {
    var result = document.getElementById('theadView');
    result.innerHTML = "";  
    var list = document.createElement('tr');
    //console.log(fieldsArray);
    for(i=0;i<fieldsArray.length;i++){
         let cell = document.createElement('th');
            cell.className="view-th";
            let lablNode = document.createElement("Label");
            lablNode.textContent = fieldsArray[i]; 
            
          cell.appendChild(lablNode);
          list.appendChild(cell);         
    };
    result.appendChild(list); 
    }



deatilsView();

function deatilsView() {

    var result = document.getElementById('deatilsView');
    result.innerHTML = ""; 
    let usersData = JSON.parse(localStorage.getItem('Form_data')); 
    
    
    usersData.forEach((data, index) =>{
        var list1 = document.createElement('tr'); 
     for(let i=0;i<fieldsArray.length;i++){
        let label =fieldsArray[i];
       
            
            if(!data.hobbies){
                let nameCell2 = document.createElement("td"); 
                    nameCell2.className="view-td";
                    let celltext = document.createElement("lable");
                    celltext.innerText = data[label];
                    nameCell2.appendChild(celltext);
                list1.appendChild(nameCell2);
                
             }else{
                var hobbies = data.hobbies.toString();
                let nameCell2 = document.createElement("td"); 
                    nameCell2.className="view-td";
                    let celltext = document.createElement("lable");
                    celltext.innerText = hobbies;
                    nameCell2.appendChild(celltext);
                list1.appendChild(nameCell2);
             }
        }    
        result.appendChild(list1); 
    });    
    
}
