function editDetails(key,id){
    let getData = JSON.parse(localStorage.getItem(key));
  getData.forEach((userData) =>{
      if(id == userData.userId)
      {
        elementsArray.forEach((myTarget, index) =>{   
            var label = myTarget.key;
            if(myTarget.type == 'submit' || myTarget.type == 'reset'  ){

            }else
            if(myTarget.type == 'radio')
            {
                myTarget.options.forEach((radio) =>{  
                    if(userData[label] == radio.attr.id)
                     {
                        document.getElementById(radio.attr.id).checked = true;
                     }
                });

            }else if(myTarget.type == 'checkbox')
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
                document.querySelector(`[key="${myTarget.key}"]`).value = userData[label];
            }
           
            
       });

       
      }
    });
}

function deleteData(key,id)
{
    
    let result = confirm("Are You Sure ,You want to Delete??");
    if(result){
      let userData = localStorage.getItem(key);
      userData = JSON.parse(userData);
  
      let updateIndex = userData.findIndex((obj => obj.userId == id));
      userData.splice(updateIndex, 1);
       localStorage.setItem(key, JSON.stringify(userData));
    }
    deatilsView();
}
