//getting Data from Local Storage
const dataBaseName = 'FormData';
var usersData = [];
usersData = localStorage.getItem(dataBaseName);
if(usersData != null){
usersData = JSON.parse(usersData);
}else{
    usersData = [];
}

//Data Insertion  
function insert_form(form)
{    
    //var usersData = usersData;
    let userId = document.querySelector(`[key="userId"]`).value;
   
    //Used while updating Details 
    spliceData(userId,dataBaseName,usersData);
    
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
    usersData.push(data); 
    setDataItem(dataBaseName,usersData);
    location.reload();
}

// Edit Details 
function editDetails(key,id){
   
    usersData.forEach((userData) =>{
      if(id == userData.userId)
      {
        elementsArray.forEach((myTarget, index) =>{   
            var label = myTarget.key;
            if(myTarget.type == 'submit' || myTarget.type == 'reset'  ){

            }else
            //for radio 
            if(myTarget.type == 'radio')
            {
                myTarget.options.forEach((radio) =>{  
                    if(userData[label] == radio.attr.id)
                     {
                        document.getElementById(radio.attr.id).checked = true;
                     }
                });
            }else if(myTarget.type == 'checkbox')  //for checkbox
            {
                let checkData = userData[label];
                for(let i=0; checkData[i]; ++i){
                    
                    elementsArray.forEach((myTarget) =>{ 
                        if(myTarget.type == 'checkbox')
                        {
                           myTarget.options.forEach((checkBox) =>{  
                           
                                if(checkData[i] == checkBox.value)
                                {
                                    document.getElementById(checkBox.attr.id).checked = true;
                                }
                            });
                        }
                    });
                }
            }else{
                 //for all data
                document.querySelector(`[key="${myTarget.key}"]`).value = userData[label];
            }
       });     
      }
    });
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