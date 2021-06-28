function show_calendar(){
    var cal = document. getElementById("div_calender"); //show.
    if (cal.style.display === "none") {
        cal.style.display = "block";
      } else {
        cal.style.display = "none";
      }
}

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

document.getElementById("month").value = currentMonth;
document.getElementById("year").value = currentYear;
   
showCalendar(currentMonth, currentYear);
function get_days(){
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function changeMonth(action)
{
    var currentMonth = parseInt(document.getElementById("month").value) ;
    var currentYear = parseInt(document.getElementById("year").value);
    if(action == 0){
        if(currentMonth == 0)
        {   
            currentYear = currentYear-1
            document.getElementById("year").value = currentYear;    
            currentMonth = 11;
            
        }else
        {
            currentMonth = currentMonth-1
        }
    }else if(action == 1){
        if(currentMonth == 11)
        {   
            currentYear = currentYear+1
            document.getElementById("year").value = currentYear;    
            currentMonth = 0;
        }
        else
        {
            currentMonth = currentMonth+1
        }
    }
    document.getElementById("month").value = currentMonth;
    showCalendar(currentMonth, currentYear);
       
}

function showCalendar(month, year) {
    
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = new Date(year, month+1, 0).getDate();

    let tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";

    let date = 1;
    for (let i = 0; i < 6; i++) {
       
        let row = document.createElement("tr");

       
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.className="blank";
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                if(date%2 != 0)
                {
                    cell.className = "checks";
                }
                if(date == today.getDate() && month == today.getMonth() && year == today.getFullYear()){
                    cell.style.backgroundColor = "rgb(236 19 19 / 57%)";
                }
                let cellText = document.createTextNode(date);
                let str_date = date;
                //  cell.onclick = function() { document.getElementById("input_date").value = `${str_date}/${month+1}/${year}`;  };            
               // <button type="button" data-toggle="modal" data-target="#myModal">+</button>
               var div = document.createElement("div");
               div.id ="createActivity";
               let fullDate = `${str_date}/${month+1}/${year}`;
               let btn = document.createElement("img");
                    btn.src = "add.png";
                    btn.id="add_btn";
                    btn.className="view";
                    btn.onclick = function() { $('#myModal').modal('show'); document.getElementById("input_date").value = fullDate;};    
                    //btn.classList.toggle("#myModal");
                let btnView = document.createElement("img");
                    btnView.src = "eye-circle.jpg";
                    btnView.id="view";
                    btnView.className="view";
                    btnView.onclick = function() { show_data(fullDate);  }   
                    
                
               
                cell.appendChild(cellText);
                div.appendChild(btn);
                div.appendChild(btnView);
                cell.appendChild(div);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row);
    }
    
}

function insert_acivity(form) {
    // let form = document.getElementById('activity_form');
    var activity = form.activity.value;
    var date = form.input_date.value;

    let existing = [];
    existing = localStorage.getItem(date);
    if(existing != null){
        existing = JSON.parse(existing);
    }else{
        existing = [];
    }
    
    //existing = existing ? existing. split(',') : [];
    existing.push(activity);

    localStorage.setItem(date, JSON.stringify(existing));
   // localStorage.setItem(date, JSON.parse(existing));
    document.getElementById("activity_form").reset();

    

}

function show_data(date) {
    let date_data = JSON.parse(localStorage.getItem(date));
    document.getElementById('showDate').innerHTML = date;
    
    
    let tbl = document.getElementById("data-view-body");
    tbl.innerHTML = ""; 
    
    if(date_data != null){
        date_data.forEach((date_data, index) =>{
        
            let row = document.createElement("tr");
            let cell = document.createElement("td");
            
            let cellText = document.createTextNode(date_data);
            cell.appendChild(cellText);
            row.appendChild(cell); 
            
            let cell2 = document.createElement("td");
        // let cellText2 = document.createTextNode(index);
            let btn = document.createElement("img");
            btn.src = "delete.jpg";
            btn.style.height="24px";
            btn.onclick = function() { delete_data(date,index); }
            cell2.appendChild(btn);
            row.appendChild(cell2); 
            tbl.appendChild(row);
        });
    }
    $('#viewModal').modal('show'); 
}

function delete_data(of_date,index_no)
{
    let result = confirm("Are You Sure ,You want to Delete??");
    if(result){
        let date_data = JSON.parse(localStorage.getItem(of_date));
        date_data.splice(index_no, 1);
        localStorage.setItem(of_date, JSON.stringify(date_data));
        show_data(of_date);
    }
}