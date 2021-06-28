
//Data Insertion  
function insert_form(form)
{ 
       
    let existing = [];
    existing = localStorage.getItem('Form_data');
    if(existing != null){
      existing = JSON.parse(existing);
    }else{
        existing = [];
    }
 
    const data = {};
    elementsArray.forEach((myTarget, index) =>{
         
        // For check box        
        if(myTarget.type == 'checkbox' ){
            let inputElements = document.querySelectorAll(`[key="${myTarget.key}"]`);
            for(let i=0; inputElements[i]; ++i){
                let checkedValue = [];  
                if(inputElements[i].checked){
                    checkedValue.push(inputElements[i].value);
                }
            }
                data[myTarget.label] = checkedValue; 
            }
        //for radio button    
        else if(myTarget.type == 'radio' ){
            rate_value = form.gender.value;
            data[myTarget.label] = rate_value;
        } 
        else{ 
            let value =document.querySelector(`[key="${myTarget.key}"]`).value;
            data[myTarget.label] = value;
        }
     
    });
    existing.push(data);
    localStorage.setItem('Form_data',JSON.stringify(existing));
    location.reload();
 
}
