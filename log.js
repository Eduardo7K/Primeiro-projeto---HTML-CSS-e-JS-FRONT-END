
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

var table1 = [
    {
        "id": 1,
        "nome": "Michael Holz",
        "data": "04/10/2013",
        "role": "Admin",
        "status": "Active",
        "action": "",
        "img": "imgs\\michael.jpg"
    },
    {
        "id": 2,
        "nome": "Paula Wilson",
        "data": "05/08/2014",
        "role": "Publisher",
        "status": "Active",
        "action": "",
        "img": "imgs\\paula.jpg"
    },
    {
        "id": 3,
        "nome": "Antonio Moreno",
        "data": "11/05/2015",
        "role": "Publisher",
        "status": "Suspended",
        "action": "",
        "img": "imgs\\antonio.png"
    },
    {
        "id": 4,
        "nome": "Mary Saveley",
        "data": "06/09/2016",
        "role": "Reviewer",
        "status": "Active",
        "action": "",
        "img": "imgs\\mary.jpg"
    },
    {
        "id": 5,
        "nome": "Martin Sommer",
        "data": "12/08/2017",
        "role": "Moderator",
        "status": "Inactive",
        "action": "",
        "img": "imgs\\martin.jpg"
    }
]

/*
var p = document.createElement('p');
var iimg = document.createElement('img');
var div = document.createElement('div');
div.appendChild(iimg)
p.appendChild(div);
iimg.src = 'imgs/mary.jpg'
// console.log(p)
// p.innerHTML = 'TESTE'
var img2 = document.createElement('img');
p.appendChild(img2);
img2.src = "table1.img[4]";


// console.log(iimg)
document.getElementById("tabela-dinamica").appendChild(p)
*/

var table = document.createElement('table'),
    thead = document.createElement('thead'),
    tbody = document.createElement('tbody'),
    th,
    tr = document.createElement('tr'),
    td;

th = document.createElement('th');
    th.innerHTML = "#";
table.appendChild(th);
table.appendChild(thead);
//table.appendChild(tbody);
tr.appendChild(th); // teste
//tbody.appendChild(tr); // teste
thead.appendChild(tr);

th = document.createElement('th');
th.innerHTML = "Name"
table.appendChild(th);
table.appendChild(thead);
//table.appendChild(tbody);
tr.appendChild(th); // teste
//tbody.appendChild(tr); // teste
thead.appendChild(tr);

th = document.createElement('th');
th.innerHTML = "Date created"
table.appendChild(th);
table.appendChild(thead);
//table.appendChild(tbody);
tr.appendChild(th); // teste
//tbody.appendChild(tr); // teste
thead.appendChild(tr);

th = document.createElement('th');
th.innerHTML = "Role"
table.appendChild(th);
table.appendChild(thead);
//table.appendChild(tbody);
tr.appendChild(th); // teste
//tbody.appendChild(tr); // teste
thead.appendChild(tr);

th = document.createElement('th');
th.innerHTML = "Status"
table.appendChild(th);
table.appendChild(thead);
//table.appendChild(tbody);
tr.appendChild(th); // teste
//tbody.appendChild(tr); // teste
thead.appendChild(tr);

th = document.createElement('th');
th.innerHTML = "Action"
table.appendChild(th);
//table.appendChild(thead);
table.appendChild(tbody);
tr.appendChild(th); // teste
//tbody.appendChild(tr); // teste
thead.appendChild(tr);


document.getElementById("tabela-dinamica").appendChild(table);



for (var i = 0; i < table1.length; i++) {
    console.log(table1[i])
    console.log(table1[i].nome)
    tr = document.createElement('tr'),

        //for #
        td = document.createElement('td');
    td.innerHTML = table1[i].id;
    tr.appendChild(td);
    tbody.appendChild(tr);

    //for name
    td = document.createElement('td');
    td.innerHTML = table1[i].nome;
    tr.appendChild(td);
    tbody.appendChild(tr);

    //for img
    tr.appendChild(document.createElement('td'))
        .appendChild(document.createElement('img'))
        .src = table1[i].img;
    tr.appendChild(td);
    tbody.appendChild(tr);
        

    //for date creation
    td = document.createElement('td');
    td.innerHTML = table1[i].data;
    tr.appendChild(td);
    tbody.appendChild(tr);

    //for role
    td = document.createElement('td');
    td.innerHTML = table1[i].role;
    tr.appendChild(td);
    tbody.appendChild(tr);

    //for status
    td = document.createElement('td');
    td.innerHTML = table1[i].status;
    tr.appendChild(td);
    tbody.appendChild(tr);

    //for action
    td = document.createElement('td');
    td.innerHTML = table1[i].action;
    tr.appendChild(td);
    tbody.appendChild(tr);


}