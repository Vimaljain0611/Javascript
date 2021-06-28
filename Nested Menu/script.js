
var Data = [
    {
      "label":"File",
      "icon":"image/file.png",
      "items":[
         {
            "label":"New",
            "icon":"image/new.png",
            "items":[
               {
                  "label":"Bookmark",
                  "icon":"image/bookmark.png"
               },
               {
                  "label":"Video",
                  "icon":"image/video.jpg"
               }
            ]
         },
         {
            "label":"Delete",
            "icon":"image/delete.jpg",
            "command": (event,any) => {
                   console.log("Delete Clicked", event);
             }
    
         },
        // {
        //    "separator":true
        // },
         {
            "label":"Export",
            "icon":"image/export.png",
            "command": (event,any) =>{
                   console.log("Export Clicked", event);
             }
         }
      ]
    },
    {
      "label":"Edit",
      "icon":"image/edit.png",
      "items":[
         {
            "label":"Left",
            "icon":"image/left.png"
         },
         {
            "label":"Right",
            "icon":"image/right.jpg"
         },
         {
            "label":"Center",
            "icon":"image/center.png"
         },
         {
            "label":"Justify",
            "icon":"image/justify.png"
         }
      ]
    },
    {
      "label":"Users",
      "icon":"image/user.jpg",
      "items":[
         {
            "label":"New",
            "icon":"image/newUser.png"
         },
         {
            "label":"Delete",
            "icon":"image/deleteUser.png"
         },
         {
            "label":"Search",
            "icon":"image/search.png",
            "items":[
               {
                  "label":"Filter",
                  "icon":"image/filter.png",
                  "items":[
                     {
                        "label":"Print",
                        "icon":"image/print.png"
                     }
                  ]
               },
               {
                  "icon":"image/list.png",
                  "label":"List"
               }
            ]
         }
      ]
    },
    {
      "label":"Events",
      "icon":"image/events.jpg",
      "items":[
         {
            "label":"Edit",
            "icon":"image/add.png",
            "items":[
               {
                  "label":"Save",
                  "icon":"image/save.png"
               },
               {
                  "label":"Delete",
                  "icon":"image/delete.jpg"
               }
            ]
         },
         {
            "label":"Archieve",
            "icon":"image/archive.png",
            "items":[
               {
                  "label":"Remove",
                  "icon":"image/remove.jpg"
               }
            ]
         }
      ]
    },
    //{
      //"separator":true
    //},
    {
      "label":"Quit",
      "icon":"image/quit.jpg",
      "command": (event,any) => {
              console.log("Quit Clicked", event);
      }
    }
    ];

    $(function () {
      $(this).bind("contextmenu", function (e) {
         var x = e.clientX;
         var y = e.clientY;
         e.preventDefault();
         var myTarget = document.getElementById('target');
         myTarget.style.position = "absolute";
         myTarget.style.left = x+'px';
         myTarget.style.top = y+'px';
         myTarget.style.display = "block";
      });
  });
  document.onclick= function(event) {
   myTarget.style.display = "none";
};
 
var myTarget = document.getElementById('target');
myTarget.appendChild(menuList(Data));
myTarget.style.display = "none";

function menuList(obj) {

  var result = document.createElement('ul');

obj.forEach((myTarget, index) =>{

    var list = document.createElement('li');
    var icon = document.createElement('img');
    icon.src = myTarget.icon;
    list.appendChild(icon);
    var textnode = document.createTextNode(myTarget.label );
    list.onclick = myTarget.command;
    list.appendChild(textnode);
   
    if (myTarget.items) {
      list.appendChild(menuList(myTarget.items));
      result.class='dropdown-submenu';
    } 
    result.appendChild(list); 
  });
  return result;
}