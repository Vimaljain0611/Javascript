formView();
function formView() {

    var formView = document.getElementById('formView');
   
    var result = document.createElement('table');
        result.className ="table table-responsive-sm ";  
    let trCount = 1;
    
    elementsArray.forEach((myTarget, index) =>{
      
        let list = document.createElement('tr');
        if(trCount%2 == 0 )
        {
            list.className ="odd-tr";
        }else{
            list.className ="even-tr";
        }

        if(myTarget.type == 'null')
        {
            let cellInput = document.createElement("input");
            cellInput.setAttribute("hidden","hidden");
            cellInput.value = myTarget.getValue();
            //attr
            cellInput.attributes = setAttr(cellInput,myTarget);
            list.appendChild(cellInput);
            fieldsArray.push(myTarget.key);
        }

        // For text ,number ,email ,tel Input
        if(myTarget.type == 'text' || myTarget.type == 'number' || myTarget.type == 'email' 
        || myTarget.type == 'tel') {
           
            // appending Th and label
            list.appendChild(setLabel(myTarget.label));   
            // appending td/Input
            list.appendChild(textInput(myTarget,"input"));
            fieldsArray.push(myTarget.key);
        }

          // For textarea
        if(myTarget.type == 'textarea' ) {
            // appending Th and label
            list.appendChild(setLabel(myTarget.label)); 
            // appending td/Input
            list.appendChild(textInput(myTarget,myTarget.type));
            fieldsArray.push(myTarget.key);
        }

        // For select box
        if(myTarget.type == 'select' ) {
            // appending Th and label
            list.appendChild(setLabel(myTarget.label)); 

            let cell2 = document.createElement("td"); 
                let cellInput = document.createElement(myTarget.type);
                cellInput.attributes = setAttr(cellInput,myTarget);
             
                myTarget.options.forEach((opt, index) =>{
                    let optNode = document.createElement("option");
                        optNode.value = opt.value;
                        optNode.innerHTML = opt.innerHTML;
                    return cellInput.appendChild(optNode);
               });
            cell2.appendChild(cellInput);   
            cell2.appendChild(errorAppend(myTarget.key));  
           
            list.appendChild(cell2);
            fieldsArray.push(myTarget.key);
        }

        // For radio
        if(myTarget.type == 'radio' ) {
            // appending Th and label
            list.appendChild(setLabel(myTarget.label));
            //appending td/Input  
            list.appendChild(radioInput(myTarget));
            fieldsArray.push(myTarget.key);
        }

        // For checkbox
        if(myTarget.type == 'checkbox' ) {
           // appending Th and label
           list.appendChild(setLabel(myTarget.label));
           //appending td/Input 
            list.appendChild(radioInput(myTarget));
            fieldsArray.push(myTarget.key);
        }

        // For buttons
        if(myTarget.type == 'submit' || myTarget.type == 'reset'  ) {
            let cell = document.createElement('th');
                cell.colSpan ="2";
                let btnNode = document.createElement("button");
                    btnNode.type = myTarget.type;  
                    btnNode.setAttribute("Key",myTarget.key );
                    //attr
                    btnNode.attributes = setAttr(btnNode,myTarget.attr);
                    btnNode.textContent = myTarget.attr.value;
               
            cell.appendChild(btnNode);
            list.appendChild(cell);
        }
     result.appendChild(list); 
     trCount++;   
    });
    
    formView.appendChild(result);
}

//Set Label
function setLabel(label)
{
    let cell = document.createElement('th');
    let labelNode = document.createElement("Label");
    let textNode = document.createTextNode(label); 
        labelNode.appendChild(textNode);
    cell.appendChild(labelNode);    
    return cell;
}

// text input
function textInput(obj,type)
{        
    let cell2 = document.createElement("td"); 
        let cellInput = document.createElement(type);
        //attributes   
    cellInput.attributes = setAttr(cellInput,obj);   
    cell2.appendChild(cellInput);

    cell2.appendChild(errorAppend(obj.key));  
    return cell2;   
}

//radio checkbox label
function radioLabel(label)
{
    let textLabel = document.createElement("label");
        textLabel.textContent = label;
        textLabel.className = "radioLabel";
    return textLabel;
}

//radio checkbox td/input
function radioInput(object)
{
    let cell2 = document.createElement("td"); 
           
    object.options.forEach((opt, index) =>{
        let radioNode = document.createElement("input");
            //attributes  
            radioNode.value = opt.value;                  
            radioNode.attributes = setAttr(radioNode,object);          
            radioNode.attributes = setAttr(radioNode,opt);
        cell2.appendChild(radioNode);                
        return cell2.appendChild(radioLabel(opt.innerHTML));
    });
    return cell2
}

// setting attributes
function setAttr(cell,obj)
{
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            //for radio button
            if (key =='type' && obj[key] == 'radio' || obj[key] == 'checkbox')
            {
               // cell.setAttribute(key,obj[key])
                if(key == "className" )
                {
                    cell.setAttribute('class',obj[key]);
                } else if(typeof obj[key] === 'object')
                {
                    setAttr(cell,obj[key])
                }else
                {                
                    cell.setAttribute(key,obj[key])
                }  
            }
            else if( key =='onclick'||  key == "required" || key == "onchange" || key == 'label' || key == 'value')
            {
                
            }else{    //for all expect radio n checkbox
                if(key == "className" )
                {
                    cell.setAttribute('class',obj[key]);
                } 
                else if(typeof obj[key] === 'object')
                {
                    setAttr(cell,obj[key])
                }else
                {                
                    cell.setAttribute(key,obj[key])
                }  
            }

            

        }
    }
}

//appending error
function errorAppend(id){
    let errorMessage = document.createElement("p");
    errorMessage.id="error_"+id;
    errorMessage.className = "error";
    return errorMessage;
}

//Getting UUID
function getRandomNumber() {
    return 'xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 6 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(6);
    });
  }


  thead_View();
detailsView();

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
            let labelNode = document.createElement("Label");
            labelNode.textContent = fieldsArray[i]; 
          cell.appendChild(labelNode);
          list.appendChild(cell);         
    };
    let deleteCell = document.createElement('th');
    deleteCell.className = "view-th";
        let deleteLabel = document.createElement("Label");
        deleteLabel.textContent = "Delete";
        deleteCell.appendChild(deleteLabel);
        list.appendChild(deleteCell);  
    result.appendChild(list); 
    }

function detailsView() {

    let result = document.getElementById('detailsView');
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
                let nameCell2 = document.createElement("td"); 
                    nameCell2.className="view-td";
                    let cellText = document.createElement("label");
                    if(!key.hobbies){  
                        cellText.textContent = data[key];
                    }else{
                        let hobbies = data.hobbies.toString();
                        cellText.innerText = hobbies;
                    }    
                    nameCell2.appendChild(cellText);
                list1.appendChild(nameCell2);                
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