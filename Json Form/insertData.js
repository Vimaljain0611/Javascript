
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
    
    let userId = document.querySelector(`[key="userId"]`).value;
    let updateIndex = existing.findIndex((obj => obj.userId == userId));
    if(updateIndex != -1){
        existing.splice(updateIndex, 1);   
        localStorage.setItem('Form_data', JSON.stringify(existing));
    }
    
    const data = {};
    elementsArray.forEach((myTarget, index) =>{

        // For check box        
        if(myTarget.type == 'checkbox' ){
            let inputElements = document.querySelectorAll(`[key="${myTarget.key}"]`);
            var checkedValue = [];  
            for(let i=0; inputElements[i]; ++i){
                if(inputElements[i].checked){
                    checkedValue.push(inputElements[i].value);
                }
            }  
                data[myTarget.key] = checkedValue; 
            }
        //for radio button    
        else if(myTarget.type == 'radio' ){
            rate_value = form.gender.value;
            data[myTarget.key] = rate_value;
        } 
        else{ 
            let value =document.querySelector(`[key="${myTarget.key}"]`).value;
            data[myTarget.key] = value;
        }
    });
    existing.push(data);
    localStorage.setItem('Form_data',JSON.stringify(existing));
    location.reload();
 
}
