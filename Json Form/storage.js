//getting Data from Local Storage
const dataBaseName = 'FormData';
var usersData = [];
usersData = localStorage.getItem(dataBaseName);
if(usersData != null){
usersData = JSON.parse(usersData);
}else{
    usersData = [];
}
const form  = document.querySelector('#myForm');
form.addEventListener('submit', function (e) {
   
    //var usersData = usersData;
    let userId = document.querySelector(`[key="userId"]`).value;
   
    //Used while updating Details 
    spliceData(userId,dataBaseName,usersData);
    
    const data = {};
    elementsArray.forEach((jsonData, index) =>{
       
         // For check box        
        if(jsonData.type == 'checkbox' ){
            let inputElements = document.querySelectorAll(`[key="${jsonData.key}"]`);
            var checkedValue = [];  
                
            for(let i=0; inputElements[i]; ++i){
                if(inputElements[i].checked){
                    checkedValue.push(inputElements[i].value);
                }
            }  
                data[jsonData.key] = checkedValue; 
        }
        //for radio button    
        else if(jsonData.type == 'radio' ){
            let value = form.gender.value;
            data[jsonData.key] = value;
        } 
        else{ 
            let value =document.querySelector(`[key="${jsonData.key}"]`).value;
            data[jsonData.key] = value;
        }
    });
    usersData.push(data); 
    setDataItem(dataBaseName,usersData);
    location.reload();
});
// Edit Details 
function editDetails(id){
   
    usersData.forEach((userData) =>{
      if(id == userData.userId)
      {
        elementsArray.forEach((jsonData, index) =>{   
            var label = jsonData.key;
            if(jsonData.type == 'submit' || jsonData.type == 'reset'  ){

            }else
            //for radio 
            if(jsonData.type == 'radio')
            {
                jsonData.options.forEach((radio) =>{  
                    if(userData[label] == radio.attr.id)
                     {
                        document.getElementById(radio.attr.id).checked = true;
                     }
                });
            }else if(jsonData.type == 'checkbox')  //for checkbox
            {
                let checkData = userData[label];
                for(let i=0; checkData[i]; ++i){
                    
                    elementsArray.forEach((jsonData) =>{ 
                        if(jsonData.type == 'checkbox')
                        {
                            jsonData.options.forEach((checkBox) =>{  
                           
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
                document.querySelector(`[key="${jsonData.key}"]`).value = userData[label];
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