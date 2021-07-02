//getting Data from Local Storage
var usersData = [];
usersData = localStorage.getItem('FormData');
if(usersData != null){
usersData = JSON.parse(usersData);
}else{
    usersData = [];
}


//Data Insertion  
function insert_form(form)
{    
    existing = usersData;
   
    let userId = document.querySelector(`[key="userId"]`).value;
    spliceData(userId,'FormData',existing);
    
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
    setDataItem('FormData',existing);
    location.reload();
}

//for deleting data
function deleteData(key,id)
{
    let result = confirm("Are You Sure ,You want to Delete??");
    if(result){
        spliceData(id,key,usersData);
    }
    detailsView();
}

// set data in local storage
function setDataItem(key,obj)
{
    localStorage.setItem(key, JSON.stringify(obj));
}

//Delete Array from Object
function spliceData(id,key,obj)
{
    let updateIndex = usersData.findIndex((obj => obj.userId == id));
    if(updateIndex != -1){
      usersData.splice(updateIndex, 1);
      setDataItem(key,obj);
    }
}