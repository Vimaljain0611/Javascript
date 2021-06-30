
var formView = document.getElementById('formView');
formView.appendChild(tableView(elementsArray));

function tableView(obj) {

  var result = document.createElement('table');
  result.className ="table table-responsive-sm ";  
    let trCount = 1;
    
    obj.forEach((myTarget, index) =>{
      
        let list = document.createElement('tr');
        if(trCount%2 == 0 )
        {
            list.className ="odd-tr";
        }else{
            list.className ="even-tr";
        }

        if(myTarget.type == 'null')
        {
            let cellinput = document.createElement("input");
                cellinput.setAttribute("hidden","hidden");
                cellinput.value = myTarget.getValue();
                //attr
                cellinput.attributes = setAttr(cellinput,myTarget);
            list.appendChild(cellinput);
            fieldsArray.push(myTarget.key);
        }

        // For text ,number ,email ,tel Inpiuts
        if(myTarget.type == 'text' || myTarget.type == 'number' || myTarget.type == 'email' || myTarget.type == 'tel') {
            let cell = document.createElement('th');
                let lablNode = document.createElement("Label");
                let Textnode = document.createTextNode(myTarget.label); 
                lablNode.appendChild(Textnode);
            cell.appendChild(lablNode);
            list.appendChild(cell);   
            
            let cell2 = document.createElement("td"); 
                let cellinput = document.createElement("input");
                //attr
                cellinput.attributes = setAttr(cellinput,myTarget);   
            cell2.appendChild(cellinput);
           
           let error_msg = errorAppend(myTarget.attr.id); 
                cell2.appendChild(error_msg);
            list.appendChild(cell2);
            fieldsArray.push(myTarget.key);
        }

          // For textarea
        if(myTarget.type == 'textarea' ) {
            let cell = document.createElement('th');
                let lablNode = document.createElement("Label");
                let Textnode = document.createTextNode(myTarget.label); 
                lablNode.appendChild(Textnode);
            cell.appendChild(lablNode);
            list.appendChild(cell);   

            let cell2 = document.createElement("td"); 
                let cellinput = document.createElement(myTarget.type);
                //attr
                    cellinput.attributes = setAttr(cellinput,myTarget);
            cell2.appendChild(cellinput);
            
            let error_msg = errorAppend(myTarget.attr.id); 
                cell2.appendChild(error_msg);                 
             
            list.appendChild(cell2);
            fieldsArray.push(myTarget.key);
        }

        // For select box
        if(myTarget.type == 'select' ) {
            let cell = document.createElement('th');
                let lablNode = document.createElement("Label");
                    let Textnode = document.createTextNode(myTarget.label); 
                lablNode.appendChild(Textnode);
            cell.appendChild(lablNode);
            list.appendChild(cell);   

            let cell2 = document.createElement("td"); 
                let cellinput = document.createElement(myTarget.type);
                cellinput.attributes = setAttr(cellinput,myTarget);
             
                myTarget.options.forEach((opt, index) =>{
                    let optNode = document.createElement("option");
                        optNode.value = opt.value;
                        optNode.innerHTML = opt.innerHTML;
                    
                    return cellinput.appendChild(optNode);
               });
            cell2.appendChild(cellinput);   
            
            let error_msg = errorAppend(myTarget.attr.id); 
                cell2.appendChild(error_msg);
           
            list.appendChild(cell2);
            fieldsArray.push(myTarget.key);
        }

        // For rdaio
        if(myTarget.type == 'radio' ) {
            let cell = document.createElement('th');
                let lablNode = document.createElement("Label");
                let Textnode = document.createTextNode(myTarget.label); 
                     lablNode.appendChild(Textnode);
                cell.appendChild(lablNode);
                list.appendChild(cell);   

            let cell2 = document.createElement("td"); 
             
                myTarget.options.forEach((opt, index) =>{
                
                    let radioNode = document.createElement("input");
                    radioNode.type = myTarget.type;  
                    radioNode.value = opt.value;
                    radioNode.name = opt.name;
                    radioNode.setAttribute("Key",myTarget.key );
                
                    radioNode.attributes = setAttr(radioNode,opt.attr);
            
                    cell2.appendChild(radioNode);

                    let textLabel = document.createElement("label");
                        textLabel.textContent = opt.innerHTML;
                        textLabel.className = "radioLabel";

                return cell2.appendChild(textLabel);
               });
            list.appendChild(cell2);
            fieldsArray.push(myTarget.key);
        }

        // For checkbox
        if(myTarget.type == 'checkbox' ) {
            let cell = document.createElement('th');
                let lablNode = document.createElement("Label");
                let Textnode = document.createTextNode(myTarget.label); 
                    lablNode.appendChild(Textnode);
                cell.appendChild(lablNode);
                list.appendChild(cell);   

            let cell2 = document.createElement("td"); 
           
                myTarget.options.forEach((opt, index) =>{
                    let radioNode = document.createElement("input");
                        radioNode.type = myTarget.type;  
                        radioNode.value = opt.value;
                        radioNode.setAttribute("Key",myTarget.key );
                    
                        radioNode.attributes = setAttr(radioNode,opt.attr);
                    
                    cell2.appendChild(radioNode);
                    
                    let textLabel = document.createElement("label");
                        textLabel.textContent = opt.innerHTML;
                        textLabel.className = "checkboxLabel";
                    
                    return cell2.appendChild(textLabel);
                });
              
              list.appendChild(cell2);
              fieldsArray.push(myTarget.key);
        }

        // For buttons
        if(myTarget.type == 'submit' || myTarget.type == 'reset'  ) {
            let cell = document.createElement('th');
                cell.colSpan ="2";
                let btnNode = document.createElement("button");
                    btnNode.setAttribute("Key",myTarget.key );
                    btnNode.type = myTarget.type;  
                    if(myTarget.type == 'reset')
                    {
                        btnNode.onclick = myTarget.attr.onclick;              
                    }
                    //attr
                    btnNode.id = myTarget.attr.id;
                    btnNode.name = myTarget.attr.name;
                    btnNode.textContent = myTarget.attr.value;
                    btnNode.className = myTarget.attr.className;
                    btnNode.value = myTarget.attr.value;
               
            cell.appendChild(btnNode);
            list.appendChild(cell);

        }

     result.appendChild(list); 
     trCount++;
     
    });
    
  return result;
}

// setting attributes
function setAttr(cell,obj)
{
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if( key == "required" || key == "onchange" || key == 'label' || key == 'value' || key =='onclick')
            {
                
            }else if(key == "className" )
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
    }
}

//appending error
function errorAppend(id){
    let error_msg = document.createElement("p");
    error_msg.id="error_"+id;
    error_msg.className = "error";
    return error_msg;
}

//Getting UUID
function getRandomNumber() {
    return 'xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 6 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(6);
    });
  }


