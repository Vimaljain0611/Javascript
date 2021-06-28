function get_edit(){
    var edit_add = document.getElementById("edit_address"); 
    var new_add = document.getElementById("add_address"); 
    
        edit_add.style.display = "block";
        new_add.style.display = "none";
        
}
add_Details();
function add_Details(){
  var edit_add = document.getElementById("edit_address"); 
  var new_add = document.getElementById("add_address"); 
 
  edit_add.style.display = "none";
  new_add.style.display = "block";    
 // document.getElementById("add_address").reset();  
}


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 6 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(6);
    });
  }

show_data();
function show_data() {
  let address_data = JSON.parse(localStorage.getItem('addressArray'));
   
  
  let tbl = document.getElementById("adress-view");
  tbl.innerHTML = ""; 
  
  if(address_data != null){
    address_data.forEach((address_data, index) =>{
      
          let row = document.createElement("tr");

          let editCell = document.createElement("td");
          let btn = document.createElement("img");
          btn.src = "edit.png";
          btn.className="view";
          btn.onclick = function() { edit_Details('addressArray',address_data.id); get_edit(); }
          editCell.appendChild(btn);
          row.appendChild(editCell); 

          let cell = document.createElement("td"); 
          let cellText = document.createTextNode( address_data.firstName +' '+address_data.lastName);
          cell.appendChild(cellText);
          row.appendChild(cell); 

          let cell2 = document.createElement("td");
          let textContact = document.createTextNode(address_data.contact );
          cell2.appendChild(textContact);
          row.appendChild(cell2); 

          let genderCell = document.createElement("td");
          let textGender = document.createTextNode(address_data.gender );
          genderCell.appendChild(textGender);
          row.appendChild(genderCell); 

          let addressCell = document.createElement("td");
          let textAddress = document.createTextNode(address_data.address );
          addressCell.appendChild(textAddress);
          row.appendChild(addressCell); 

          let deleteCell = document.createElement("td");
          let delteBtn = document.createElement("img");
          delteBtn.src = "cross.png";
          delteBtn.className="view";
          delteBtn.onclick = function() { delete_data('addressArray',address_data.id); }
          deleteCell.appendChild(delteBtn);
          row.appendChild(deleteCell); 

         
           tbl.appendChild(row);
      });
  }
  
}

function insert_address(form)
{
  let existing = [];
    existing = localStorage.getItem('addressArray');
    if(existing != null){
      existing = JSON.parse(existing);
  }else{
      existing = [];
  }
   
    const data = { 
      id:uuidv4(),
      firstName : form.firstName.value,
      lastName: form.lastName.value,
      contact:form.contact.value ,
      gender:form.gender.value,
      address:form.address.value
    };
    existing.push(data);
    localStorage.setItem('addressArray', JSON.stringify(existing));
    show_data();
    document.getElementById("add_address").reset();
    
}  

function update_data(form)
{
  let existing = [];
    existing = localStorage.getItem('addressArray');
    existing = JSON.parse(existing);

    let updateIndex = existing.findIndex((obj => obj.id == form.uuid.value));
    existing.splice(updateIndex, 1);

    const data = { 
      id:form.uuid.value,     
      firstName : form.update_firstName.value,
      lastName: form.update_lastName.value,
      contact:form.update_contact.value ,
      gender:form.update_gender.value,
      address:form.update_address.value
    };
    existing.push(data);
    localStorage.setItem('addressArray', JSON.stringify(existing));
   add_Details();
  show_data();
}

function edit_Details(key,id)
{
  let getData = JSON.parse(localStorage.getItem(key));
  getData.forEach((address_data, index) =>{
      if(id == address_data.id)
      {
        document.getElementById('uuid').value = address_data.id;
        document.getElementById('update_firstName').value = address_data.firstName;
        document.getElementById('update_lastName').value = address_data.lastName;
        document.getElementById('update_contact').value = address_data.contact;
       // document.getElementById('labelGender').checked = address_data.gender;
       if(address_data.gender == 'male')
       {
         document.getElementById("update_male").checked = true;
       }else if(address_data.gender == 'female')
       {
         document.getElementById("update_female").checked = true;
       }else if(address_data.gender == 'other')
       {
         document.getElementById("update_other").checked = true;
       }

      
        document.getElementById('update_address').value = address_data.address;
        
      }
  });
}

function delete_data(key,id)
{
    let result = confirm("Are You Sure ,You want to Delete??");
    if(result){
      let addressData = localStorage.getItem(key);
      addressData = JSON.parse(addressData);
  
      let updateIndex = addressData.findIndex((obj => obj.id == id));
       addressData.splice(updateIndex, 1);
       localStorage.setItem(key, JSON.stringify(addressData));
    }
    add_Details();
   show_data();
}

