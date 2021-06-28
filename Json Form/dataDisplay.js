
thead_View();
deatilsView();

function thead_View() {
    let result = document.getElementById('theadView');
    result.innerHTML = "";  
    let list = document.createElement('tr');
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

function deatilsView() {

    let result = document.getElementById('deatilsView');
    result.innerHTML = ""; 
    let usersData = JSON.parse(localStorage.getItem('Form_data')); 
    
    usersData.forEach((data, index) =>{
        let list1 = document.createElement('tr'); 
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
                let hobbies = data.hobbies.toString();
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
