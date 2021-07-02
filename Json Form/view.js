function createForm() {

    var formView = document.getElementById('formView');
   
    var table = createElem('table',"table table-responsive-sm"); 
    let trCount = 1;
    
    elementsArray.forEach((jsonData, index) =>{
      
        let list ;
        if(trCount%2 == 0 )
        {
            list = createElem('tr',"odd-tr"); 
        }else{
            list = createElem('tr',"even-tr"); 
        }

        if(jsonData.type == 'null')
        {
            let cellInput = createElem("input"); //document.createElement("input");
            cellInput.setAttribute("hidden","hidden");
            cellInput.value = jsonData.getValue();
            //attr
            cellInput.attributes = setAttr(cellInput,jsonData);
            list.appendChild(cellInput);
            fieldsArray.push(jsonData.key);
        }

        // For text ,number ,email ,tel Input
        if(jsonData.type == 'text' || jsonData.type == 'number' || jsonData.type == 'email' 
        || jsonData.type == 'tel') {
           
            // appending Th and label
            list.appendChild(setLabel(jsonData.label));   
            // appending td/Input
            list.appendChild(textInput(jsonData,"input"));
            fieldsArray.push(jsonData.key);
        }

          // For textarea 
        if(jsonData.type == 'textarea' ) {
            // appending Th and label
            list.appendChild(setLabel(jsonData.label)); 
            // appending td/Input
            list.appendChild(textInput(jsonData,jsonData.type));
            fieldsArray.push(jsonData.key);
        }

        // For select box
        if(jsonData.type == 'select' ) {
            // appending Th and label
            list.appendChild(setLabel(jsonData.label)); 

            let cellTd = createElem("td"); //document.createElement("td"); 
                let cellInput = createElem(jsonData.type); // document.createElement(jsonData.type);
                cellInput.attributes = setAttr(cellInput,jsonData);
             
                jsonData.options.forEach((opt, index) =>{
                    let optNode = document.createElement("option");
                        optNode.value = opt.value;
                        optNode.innerHTML = opt.innerHTML;
                    return cellInput.appendChild(optNode);
                });
               cellTd.appendChild(cellInput);   
               cellTd.appendChild(errorAppend(jsonData.key));  
           
            list.appendChild(cellTd);
            fieldsArray.push(jsonData.key);
        }

        // For radio
        if(jsonData.type == 'radio' ) {
            // appending Th and label
            list.appendChild(setLabel(jsonData.label));
            //appending td/Input  
            list.appendChild(radioInput(jsonData));
            fieldsArray.push(jsonData.key);
        }

        // For checkbox
        if(jsonData.type == 'checkbox' ) {
           // appending Th and label
           list.appendChild(setLabel(jsonData.label));
           //appending td/Input 
            list.appendChild(radioInput(jsonData));
            fieldsArray.push(jsonData.key);
        }

        // For buttons
        if(jsonData.type == 'submit' || jsonData.type == 'reset'  ) {
            let cellTh = createElem('th'); //document.createElement('th');
                cellTh.colSpan ="2";
                let btnNode = createElem('button'); //document.createElement("button");
                    btnNode.type = jsonData.type;  
                    btnNode.setAttribute("Key",jsonData.key );
                    //attr
                    btnNode.attributes = setAttr(btnNode,jsonData.attr);
                    btnNode.textContent = jsonData.attr.value;
               
                cellTh.appendChild(btnNode);
            list.appendChild(cellTh);
        }
        table.appendChild(list); 
     trCount++;   
    });
    
    formView.appendChild(table);
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
    let cell = document.createElement("td"); 
        let cellInput = document.createElement(type);
        //attributes   
    cellInput.attributes = setAttr(cellInput,obj);   
    cell.appendChild(cellInput);

    cell.appendChild(errorAppend(obj.key));  
    return cell;   
}



//radio checkbox td/input
function radioInput(object)
{
    let cell = document.createElement("td"); 
           
    object.options.forEach((opt, index) =>{
        let radioNode = document.createElement("input");
            //attributes  
            radioNode.value = opt.value;                  
            radioNode.attributes = setAttr(radioNode,object);          
            radioNode.attributes = setAttr(radioNode,opt);
            cell.appendChild(radioNode);                
        return cell.appendChild(createElem('label','radioLabel',opt.innerHTML));
    });
    return cell
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

function thead_View() {
    let tableHead = document.getElementById('theadView');
    tableHead.innerHTML = "";  

    let row = document.createElement('tr');
        let editBtn = setLabel("Edit","view-th");
        row.appendChild(editBtn);  

    for(i=0;i<fieldsArray.length;i++){
         let cell =  setLabel(fieldsArray[i] , "view-th")
         row.appendChild(cell);         
    };

    let deleteBtn = setLabel("Delete","view-th");
    row.appendChild(deleteBtn);  
    tableHead.appendChild(row); 
}

function detailsView() {

    let tableBody = document.getElementById('detailsView');
    tableBody.innerHTML = ""; 
  
    usersData.forEach((data,index) =>{
        let row = document.createElement('tr'); 

            let editCell = createElem("td","view-td");
                let btn = createElem("i","fa fa-edit icon");
                    btn.onclick = function() { editDetails(data.userId);  }
                editCell.appendChild(btn);
                row.appendChild(editCell); 
        
     for(let i=0;i<fieldsArray.length;i++){
        let key =fieldsArray[i];
                let nameCell = createElem("td","view-td");
                    let labelCell = document.createElement("label");
                    if(!key.hobbies){  
                        labelCell.textContent = data[key];
                    }else{
                        let hobbies = data.hobbies.toString();
                        labelCell.innerText = hobbies;
                    }    
                    nameCell.appendChild(labelCell);
                    row.appendChild(nameCell);                
        }  

        let deleteCell =  createElem("td","view-td");
            let btnDelete = createElem("i","fa fa-trash icon");
                btnDelete.onclick = function() { deleteData(dataBaseName,data.userId);  }
                deleteCell.appendChild(btnDelete);
                row.appendChild(deleteCell);

        tableBody.appendChild(row); 
    });    
    
}

createForm();
thead_View();
detailsView();