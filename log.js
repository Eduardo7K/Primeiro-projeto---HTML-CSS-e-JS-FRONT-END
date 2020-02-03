
function botaoLogin() {
    var login = document.getElementById("login-field").value;
    var senha = document.getElementById("password-field").value;
    //alert ("login informado: " + login + " senha informada: " + senha);

    if (login == "admin" && senha == "lyncas@2020") {
        alert("Login efetuado!");
        window.location.href = "dashboard.html";

    } else {
        alert("Usuário ou senha inválidos.");
    }

}

function readFile() {

    document.getElementById("upload-file").onchange = function () {
        var reader = new FileReader();
    
        reader.onload = function (e) {
            // get loaded data and render thumbnail.
            document.getElementById("person-image").src = e.target.result;
        };
    
        // read the image file as a data URL.
        reader.readAsDataURL(this.files[0]);
    };
}

function deleteImage() {

    document.getElementById("person-image").src = "imgs\\person.png";

}



function newUser() {
    window.location.href = "form.html"
}

function deleteUser(i) {
    if (confirm("Deseja realmente excluir?")) {
        var row = document.getElementById(i);
        row.parentNode.removeChild(row);


        table1.splice(i,1);
        storageItems();
    }
}


var table1 = [
    {
        "id": 1,
        "nome": "Michael Holz",
        "data": "04/10/2013",
        "role": "Admin",
        "status": "Active",
        "statusImg": "imgs\\green-circle.png",
        "img": "imgs\\michael.jpg"
    },
    {
        "id": 2,
        "nome": "Paula Wilson",
        "data": "05/08/2014",
        "role": "Publisher",
        "status": "Active",
        "statusImg": "imgs\\green-circle.png",
        "img": "imgs\\paula.jpg"
    },
    {
        "id": 3,
        "nome": "Antonio Moreno",
        "data": "11/05/2015",
        "role": "Publisher",
        "status": "Suspended",
        "statusImg": "imgs\\red-circle.png",
        "img": "imgs\\antonio.png"
    },
    {
        "id": 4,
        "nome": "Mary Saveley",
        "data": "06/09/2016",
        "role": "Reviewer",
        "status": "Active",
        "statusImg": "imgs\\green-circle.png",
        "img": "imgs\\mary.jpg"
    },
    {
        "id": 5,
        "nome": "Martin Sommer",
        "data": "12/08/2017",
        "role": "Moderator",
        "status": "Inactive",
        "statusImg": "imgs\\yellow-circle.png",
        "img": "imgs\\martin.jpg"
    }
]


var table = document.createElement('table'),
    thead = document.createElement('thead'),
    tbody = document.createElement('tbody'),
    th,
    tr = document.createElement('tr'),
    td;

th = document.createElement('th');
th.innerHTML = "#";
tr.appendChild(th);

th = document.createElement('th');
th.innerHTML = "Name"
tr.appendChild(th);

th = document.createElement('th');
th.innerHTML = "Date created"
tr.appendChild(th);

th = document.createElement('th');
th.innerHTML = "Role"
tr.appendChild(th);

th = document.createElement('th');
th.innerHTML = "Status"
tr.appendChild(th);

th = document.createElement('th');
th.innerHTML = "Action"
tr.appendChild(th);

thead.appendChild(tr);
table.appendChild(thead);
table.appendChild(tbody);

table.id = "formId";
document.getElementById("tabela-dinamica").appendChild(table);



function updateTable(table1) {

    for (var i = 0; i < table1.length; i++) {
        tr = document.createElement('tr');

        //for #
        td = document.createElement('td');
        td.innerHTML = i + 1;
        tr.appendChild(td);

        //for name
        var divImg = document.createElement('div');
        td = document.createElement('td');
        var span1 = document.createElement('span');
        span1.innerHTML = table1[i].nome;
        td.appendChild(span1);
        td.appendChild(divImg);
        divImg.id = "div-name";
        divImg.appendChild(span1);


        //for img
        divImg
            .appendChild(document.createElement('img'))
            .src = table1[i].img;
        tr.appendChild(td);


        //for date creation
        td = document.createElement('td');
        td.innerHTML = table1[i].data;
        tr.appendChild(td);

        //for role
        td = document.createElement('td');
        td.innerHTML = table1[i].role;
        tr.appendChild(td);

        //for status
        td = document.createElement('td');
        td.innerHTML = table1[i].status;
        tr.appendChild(td);

        //for status img
        td
            .appendChild(document.createElement('img'))
            .src = table1[i].statusImg;
        td.id = "td-statusImg";
        tr.appendChild(td);

        //for action
        td = document.createElement('td');
        td.id = "td-action";

        //for gear image
        var gear1 = document.createElement('img');
        gear1.src = "imgs\\engine.png";
        td.appendChild(gear1);

        //for delete image
        var delImg = document.createElement('img');
        delImg.src = "imgs\\x.png";
        var tagA = document.createElement('a');

        tagA.id = "a-tag";
        let indexDel = i;
        tagA.addEventListener("click", function () { deleteUser([indexDel]) });


        tr.setAttribute("id", i);

        tagA.appendChild(delImg);
        td.appendChild(tagA);
        tr.appendChild(td);

        tbody.appendChild(tr);
    }
}


function checkLocalStorage() {
    if (localStorage.getItem("users") === null) {
        updateTable(table1);
        storageItems();

    } else {

        localStoreItems();
    }
}


function storageItems() {

    localStorage.setItem("users", JSON.stringify(table1));

}

function localStoreItems() {

    table1 = JSON.parse(localStorage.getItem("users"));

    updateTable(table1);

}

function addNewItem() {

    let id = 6;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let personName = firstName + " " + lastName;
    let personImg = document.getElementById("person-image").src;

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;


    table1 = JSON.parse(localStorage.getItem("users"));
    table1.push(
        {
            "id": id,
            "nome": personName,
            "data": today,
            "role": "Admin",
            "status": "Active",
            "statusImg": "imgs\\green-circle.png",
            "img": personImg
        }
    );
    storageItems();
    window.location.href = "dashboard.html"

}
