
thead_View();
deatilsView();

function thead_View() {
    let result = document.getElementById('theadView');
    result.innerHTML = "";  
    let list = document.createElement('tr');
    let editCell = document.createElement('th');
    editCell.className = "view-th";
        let editLabel = document.createElement("Label");
        editLabel.textContent = "Edit";
        editCell.appendChild(editLabel);
        list.appendChild(editCell);    
    for(i=0;i<fieldsArray.length;i++){
         let cell = document.createElement('th');
            cell.className="view-th";
            let lablNode = document.createElement("Label");
            lablNode.textContent = fieldsArray[i]; 
          cell.appendChild(lablNode);
          list.appendChild(cell);         
    };
    let delteCell = document.createElement('th');
    delteCell.className = "view-th";
        let deleteLabel = document.createElement("Label");
        deleteLabel.textContent = "Delete";
        delteCell.appendChild(deleteLabel);
        list.appendChild(delteCell);  
    result.appendChild(list); 
    }

function deatilsView() {

    let result = document.getElementById('deatilsView');
    result.innerHTML = ""; 
    let usersData = JSON.parse(localStorage.getItem('Form_data')); 
    
    usersData.forEach((data,index) =>{
        let list1 = document.createElement('tr'); 

            let editCell = document.createElement("td");
                editCell.className = " view-td";
                let btn = document.createElement("i");
                    btn.className = "fa fa-edit icon";
                    btn.onclick = function() { editDetails('Form_data',data.userId);  }
                editCell.appendChild(btn);
            list1.appendChild(editCell); 
        
     for(let i=0;i<fieldsArray.length;i++){
        let key =fieldsArray[i];

            if(!key.hobbies){
                let nameCell2 = document.createElement("td"); 
                    nameCell2.className="view-td";
                    let celltext = document.createElement("lable");
                    celltext.textContent = data[key];
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
        let deleteCell = document.createElement("td");
            deleteCell.className = " view-td";
            let btnDelete = document.createElement("i");
                btnDelete.className = "fa fa-trash icon";
                btnDelete.onclick = function() { deleteData('Form_data',data.userId);  }
                deleteCell.appendChild(btnDelete);
            list1.appendChild(deleteCell);

        result.appendChild(list1); 
    });    
    
}
