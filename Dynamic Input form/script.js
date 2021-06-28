function uuidv4() {
    return 'xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 6 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(6);
    });
  }

function insert_input(form)
{       
    if(form.inputId.value != "" && form.inputType.value !="")
    {
     
   

        var id = uuidv4();
        var inputId = form.inputId.value;
        var inputType = form.inputType.value;
        var inputlabel = form.inputlabel.value;
        let tbl = document.getElementById("input-view");
        let row = document.createElement("tr");
        row.id = id;
            
              let textcell = document.createElement("td"); 
              let labelNode = document.createElement("Label");
              textcell.className="dyn-label";
              let textNode = document.createTextNode(inputlabel); 
              labelNode.appendChild(textNode);
              textcell.appendChild(labelNode);
              row.appendChild(textcell); 
               
              let idcell = document.createElement("td"); 
              let idNode = document.createElement("Label");
              idcell.className="input-id";
              let idText = document.createTextNode(inputId); 
              idNode.appendChild(idText);
              idcell.appendChild(idNode);
              row.appendChild(idcell);   

              let cell = document.createElement("td"); 
              let cellinput = document.createElement("input");
              cellinput.type= inputType;
              cellinput.className="form-control";
              cellinput.id=inputId;
              cell.appendChild(cellinput);
              row.appendChild(cell);
               
              let editCell = document.createElement("td");
              let btn = document.createElement("button");
              let btnText = document.createTextNode("Save");
              btn.type="button";
              btn.appendChild(btnText);
              btn.className="btn btn-success";
              btn.onclick = function() { Submit_input(id,inputId,inputType,inputlabel); }
              editCell.appendChild(btn);
              row.appendChild(editCell); 
    
              let deleteCell = document.createElement("td");
              let delteBtn = document.createElement("button");
              let delteBtnText = document.createTextNode("Remove");
              delteBtn.type="button";
              delteBtn.appendChild(delteBtnText);
              delteBtn.className="btn btn-danger";
              delteBtn.onclick = function() { delete_input(id); }
              deleteCell.appendChild(delteBtn);
              row.appendChild(deleteCell); 

               tbl.appendChild(row);
       
               document.getElementById('inputId').value = " ";
               document.getElementById('inputlabel').value = " ";
              
    }    
}
show_data();
function show_data(){
    
    let tbl = document.getElementById("input-view");
    tbl.innerHTML = ""; 
    let Prmnt_data = JSON.parse(localStorage.getItem('Permanent_inputs'));
    
  
    if(Prmnt_data != null){
        Prmnt_data.forEach((Prmnt_data, index) =>{
          
              let row = document.createElement("tr");
              row.id=Prmnt_data.id;
              let textcell = document.createElement("td"); 
              let labelNode = document.createElement("Label");
              textcell.className="dyn-label";
              let textNode = document.createTextNode(Prmnt_data.label); 
              labelNode.appendChild(textNode);
              textcell.appendChild(labelNode);
              row.appendChild(textcell); 

              let idcell = document.createElement("td"); 
              let idNode = document.createElement("Label");
              idcell.className="input-id";
              let idText = document.createTextNode(Prmnt_data.inputId); 
              idNode.appendChild(idText);
              idcell.appendChild(idNode);
              row.appendChild(idcell); 

              let cell = document.createElement("td"); 
              let cellinput = document.createElement("input");
              cellinput.type= Prmnt_data.inputType;
              cellinput.value = Prmnt_data.values;
              cellinput.className="form-control";
              cellinput.id=Prmnt_data.inputId;
              cell.appendChild(cellinput);
              row.appendChild(cell); 

              let editCell = document.createElement("td");
              let btn = document.createElement("button");
              let btnText = document.createTextNode("Save");
              btn.type="button";
              btn.appendChild(btnText);
              btn.className="btn btn-success";
              btn.onclick = function() { update_values(Prmnt_data.id,Prmnt_data.label,Prmnt_data.inputId,Prmnt_data.inputType); }
              editCell.appendChild(btn);
              row.appendChild(editCell); 
    
              let deleteCell = document.createElement("td");
              let delteBtn = document.createElement("button");
              let delteBtnText = document.createTextNode("Remove");
              delteBtn.type="button";
              delteBtn.appendChild(delteBtnText);
              delteBtn.className="btn btn-danger";
              delteBtn.onclick = function() { delete_values(Prmnt_data.id); }
              deleteCell.appendChild(delteBtn);
              row.appendChild(deleteCell); 
    
              tbl.appendChild(row);
          });
      }  
}
function update_values(id,label,inputId,type)
{
    let existing = [];
    existing = localStorage.getItem('Permanent_inputs');
    existing = JSON.parse(existing);

    let updateIndex = existing.findIndex((obj => obj.id == id));
    existing.splice(updateIndex, 1);

    const data = { 
        id:id,     
        label:label,
        inputId :inputId,
        values:document.getElementById(inputId).value ,
        inputType: type,  
      };
      existing.push(data);
      localStorage.setItem('Permanent_inputs', JSON.stringify(existing));
}

function referesh(){
    location.reload();
}

function Submit_input(id,inputId,type,label)
{
    let existing = [];
        existing = localStorage.getItem('Permanent_inputs');
    if(existing != null){
        existing = JSON.parse(existing);
    }else{
        existing = [];
    }
    let updateIndex = existing.findIndex((obj => obj.id == id));
    if(updateIndex != -1){
        existing.splice(updateIndex, 1);
    }
    const data = { 
        id:id,
        inputId : inputId,
        label : label,
       values:document.getElementById(inputId).value ,
        inputType: type,    
    };
    existing.push(data);
    localStorage.setItem('Permanent_inputs', JSON.stringify(existing));

}
function delete_input(id)
{
    let result = confirm("Are You Sure ,You want to Delete??");
    if(result){
        var row = document.getElementById(id);
        row.parentNode.removeChild(row);
    }
   
  
}

function delete_values(id)
{
    let result = confirm("Are You Sure ,You want to Delete??");
    if(result){
        let existing = [];
        existing = localStorage.getItem('Permanent_inputs');
        existing = JSON.parse(existing);

        let updateIndex = existing.findIndex((obj => obj.id == id));
        
        existing.splice(updateIndex, 1);
        localStorage.setItem('Permanent_inputs', JSON.stringify(existing));

        var row = document.getElementById(id);
        row.parentNode.removeChild(row);
    }
   
  
}
function check_id()
{
   
    var inputId = document.getElementById('inputId').value ;
   
    var id = document.getElementById(inputId);
    if(id != null)
    {
        alert("Id exist");
        document.getElementById("btnAdd").disabled = true;
    }else{
        document.getElementById("btnAdd").disabled = false;
    }
}