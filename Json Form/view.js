formView();
function formView() {

    var formView = document.getElementById('formView');
   
    var result = createElem('table',"table table-responsive-sm "); 

    let trCount = 1;
    
    elementsArray.forEach((myTarget, index) =>{
      
        let list ;
        if(trCount%2 == 0 )
        {
            list = createElem('tr',"odd-tr"); 
        }else{
            list = createElem('tr',"even-tr"); 
        }

        if(myTarget.type == 'null')
        {
            let cellInput = createElem("input"); //document.createElement("input");
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

            let cell2 = createElem("td"); //document.createElement("td"); 
                let cellInput = createElem(myTarget.type); // document.createElement(myTarget.type);
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
            let cell = createElem('th'); //document.createElement('th');
                cell.colSpan ="2";
                let btnNode = createElem('button'); //document.createElement("button");
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
function setLabel(label,elemClass)
{
    let cell = document.createElement('th');
        cell.className = elemClass;
        let labelNode = document.createElement("Label");
            labelNode.textContent = label;
    cell.appendChild(labelNode);    
    return cell;
}


function createElem(element,elemClass,label)
{
    let elem = document.createElement(element);
    elem.className = elemClass;
    if(label != '')
    {
        elem.textContent = label;
    }
    return elem;
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
        return cell2.appendChild(createElem('label','radioLabel',opt.innerHTML));
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
        let editCell = setLabel("Edit","view-th");
    list.appendChild(editCell);  

    for(i=0;i<fieldsArray.length;i++){
         let cell =  setLabel(fieldsArray[i] , "view-th")
        list.appendChild(cell);         
    };

    let deleteCell = setLabel("Delete","view-th");
    list.appendChild(deleteCell);  
    result.appendChild(list); 
}

function detailsView() {

    let result = document.getElementById('detailsView');
    result.innerHTML = ""; 
  
    usersData.forEach((data,index) =>{
        let list1 = document.createElement('tr'); 

            let editCell = createElem("td","view-td");
                let btn = createElem("i","fa fa-edit icon");
                    btn.onclick = function() { editDetails(dataBaseName,data.userId);  }
                editCell.appendChild(btn);
            list1.appendChild(editCell); 
        
     for(let i=0;i<fieldsArray.length;i++){
        let key =fieldsArray[i];
                let nameCell2 = createElem("td","view-td");
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

        let deleteCell =  createElem("td","view-td");
            let btnDelete = createElem("i","fa fa-trash icon");
                btnDelete.onclick = function() { deleteData(dataBaseName,data.userId);  }
                deleteCell.appendChild(btnDelete);
            list1.appendChild(deleteCell);

        result.appendChild(list1); 
    });    
    
}
