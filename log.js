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
  // debugger;
  document.getElementById("upload-file").onchange = function() {
    // debugger;
    var reader = new FileReader();

    reader.onload = function(e) {
      // get loaded data and render thumbnail.
      document.getElementById("person-image").src = e.target.result;
    };

    // read the image file as a data URL.
    //console.log(this.files[0]);
    reader.readAsDataURL(this.files[0]);
  };
}

function deleteImage() {
  document.getElementById("upload-file").value = null;
  document.getElementById("person-image").src = "imgs\\person.png";
}

function newUser() {
  window.location.href = "form.html";
}

var table = document.createElement("table"),
  thead = document.createElement("thead"),
  tbody = document.createElement("tbody"),
  th,
  tr = document.createElement("tr"),
  td;

th = document.createElement("th");
th.innerHTML = "#";
tr.appendChild(th);

th = document.createElement("th");
th.innerHTML = "Name";
tr.appendChild(th);

th = document.createElement("th");
th.innerHTML = "Date created";
tr.appendChild(th);

th = document.createElement("th");
th.innerHTML = "Role";
tr.appendChild(th);

th = document.createElement("th");
th.innerHTML = "Status";
tr.appendChild(th);

th = document.createElement("th");
th.innerHTML = "Action";
tr.appendChild(th);

thead.appendChild(tr);
table.appendChild(thead);
table.appendChild(tbody);
tbody.id = "tbodyId";

table.id = "formId";

function appendtable() {
  document.getElementById("tabela-dinamica").appendChild(table);
}

async function getUsers() {
  const url = "http://localhost:3003/api/users";
  const http = new XMLHttpRequest();
  http.open("GET", url);
  http.send();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let table1 = JSON.parse(http.responseText);

      updateTable(table1);
    }
  };
}

function updateTable(table1) {
  for (var i = 0; i < table1.length; i++) {
    tr = document.createElement("tr");

    //for #
    td = document.createElement("td");
    td.innerHTML = table1[i].id;
    td.className = "idClass";
    tr.appendChild(td);

    //for name
    var divImg = document.createElement("div");
    td = document.createElement("td");
    td.className = "nameClass";
    var span1 = document.createElement("span");
    let fullName = table1[i].firstName + " " + table1[i].lastName;
    span1.innerHTML = fullName;
    td.appendChild(span1);
    td.appendChild(divImg);
    divImg.id = "div-name";
    divImg.appendChild(span1);

    //for img
    divImg.appendChild(document.createElement("img")).src = table1[i].img;
    tr.appendChild(td);

    //for date creation
    td = document.createElement("td");
    td.className = "dataClass";
    td.innerHTML = table1[i].data;
    tr.appendChild(td);

    //for role
    td = document.createElement("td");
    td.className = "roleClass";
    td.innerHTML = table1[i].role;
    tr.appendChild(td);

    //for status
    td = document.createElement("td");
    td.className = "statusClass";
    td.innerHTML = table1[i].status;
    tr.appendChild(td);

    //for status img
    td.appendChild(document.createElement("img")).src = table1[i].statusImg;
    td.id = "td-statusImg";
    tr.appendChild(td);

    //for action
    td = document.createElement("td");
    td.className = "actionClass";
    td.id = "td-action";

    //for gear image
    var gear1 = document.createElement("img");
    gear1.src = "imgs\\engine.png";
    td.appendChild(gear1);

    //edit image
    var editImage = document.createElement("img");
    editImage.src = "imgs\\edit.png";
    td.appendChild(editImage);
    var editLink = document.createElement("a");
    editLink.id = "edit-link";
    let indexItem = table1[i].id;
    editLink.addEventListener("click", function() {
      editUser([indexItem]);
    });
    editLink.appendChild(editImage);
    td.appendChild(editLink);

    //for delete image
    var delImg = document.createElement("img");
    delImg.src = "imgs\\x.png";
    var tagA = document.createElement("a");

    tagA.id = "a-tag";
    tagA.addEventListener("click", function() {
      deleteUser([indexItem]);
    });

    tr.setAttribute("id", i);

    tagA.appendChild(delImg);
    td.appendChild(tagA);
    tr.appendChild(td);

    tbody.appendChild(tr);
  }
}

function editUser(id) {
  window.location.href = "form.html?id=" + id;
}

function deleteUser(i) {
  if (!confirm("Deseja realmente excluir?")) {
    return;
  }

  const url = `http://localhost:3003/api/users/${i}`;
  const http = new XMLHttpRequest();
  http.open("DELETE", url);
  http.send();
  http.onreadystatechange = async function() {
    if (this.readyState != 4 || this.status != 200) {
      return;
    }

    let tBody = document.getElementById("tbodyId");
    tBody.innerHTML = "";
    await getUsers();
  };
}

function checkActionToDo() {
  let params = new URL(location).searchParams;
  let idUser = params.get("id");

  if (!idUser) {
    //se o ID não existir
    postUser();
  } else {
    //se o ID tiver valor
    putUser(idUser);
  }
}

function fillTheFields() {
  let params = new URL(location).searchParams;
  let idUser = parseInt(params.get("id"));

  if (!idUser) {
    return;
  } else {
    const url = "http://localhost:3003/api/users/";
    const http = new XMLHttpRequest();
    http.open("GET", url);
    http.send();
    http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let users = JSON.parse(http.responseText);

        const index = users.findIndex(x => x.id === parseInt(idUser));

        document.getElementById("firstName").value = users[index].firstName;
        document.getElementById("lastName").value = users[index].lastName;
        document.getElementById("language").value = users[index].language;
        document.getElementById("phone").value = users[index].mobilePhone;
        document.getElementById("emailId").value = users[index].email;
        document.getElementById("birthday").value = users[index].birthday;
        document.getElementById("month").value = users[index].month;
        document.getElementById("year").value = users[index].year;
        document.getElementById("person-image").src = users[index].img;
      }
    };
  }
}

async function putUser(idUser) {
  debugger;
  const url = `http://localhost:3003/api/users/:${idUser}`;
  console.log(url);
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;

  let personImg = document.getElementById("person-image").src;

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;

  let language = document.getElementById("language").value;
  let mobilePhone = document.getElementById("phone").value;
  let birthValue = document.getElementById("birthday").value;
  let monthValue = document.getElementById("month").value;
  let yearValue = document.getElementById("year").value;
  let email = document.getElementById("emailId").value;

  let user = {
    idUser: idUser,
    firstName: firstName,
    lastName: lastName,
    data: today,
    role: "Admin",
    status: "Active",
    statusImg: "imgs\\green-circle.png",
    img: personImg,
    language: language,
    mobilePhone: mobilePhone,
    birthday: birthValue,
    month: monthValue,
    year: yearValue,
    email: email,
  };
  debugger;
  await fetch(url, {
    method: "put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

async function postUser() {
  const url = "http://localhost:3003/api/users";
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;

  let personImg = document.getElementById("person-image").src;

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;

  let language = document.getElementById("language").value;
  let mobilePhone = document.getElementById("phone").value;
  let birthValue = document.getElementById("birthday").value;
  let monthValue = document.getElementById("month").value;
  let yearValue = document.getElementById("year").value;
  let email = document.getElementById("emailId").value;

  let user = {
    firstName: firstName,
    lastName: lastName,
    data: today,
    role: "Admin",
    status: "Active",
    statusImg: "imgs\\green-circle.png",
    img: personImg,
    language: language,
    mobilePhone: mobilePhone,
    birthday: birthValue,
    month: monthValue,
    year: yearValue,
    email: email,
  };

  await fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

function descBox() {
  var e = document.getElementById("question-image");
  e.onmouseover = function() {
    document.getElementById("popup").style.display = "block";
  };
  e.onmouseout = function() {
    document.getElementById("popup").style.display = "none";
  };
}

//mask using regex
function phoneEvent() {
  document.getElementById("phone").addEventListener("input", function(e) {
    var x = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2]
      ? x[1]
      : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
  });
}

function checkLength() {
  var x = document.getElementById("phone");
  if (x.value.length < 14) {
    return false;
  } else {
    return true;
  }
}

//mask using keyup and keydown
function keyMask() {
  const isNumericInput = event => {
    const key = event.keyCode;
    return (
      (key >= 48 && key <= 57) || // Allow number line
      (key >= 96 && key <= 105) // Allow number pad
    );
  };

  const isModifierKey = event => {
    const key = event.keyCode;
    return (
      event.shiftKey === true ||
      key === 35 ||
      key === 36 || // Allow Shift, Home, End
      key === 8 ||
      key === 9 ||
      key === 13 ||
      key === 46 || // Allow Backspace, Tab, Enter, Delete
      (key > 36 && key < 41) || // Allow left, up, right, down
      // Allow Ctrl/Command + A,C,V,X,Z
      ((event.ctrlKey === true || event.metaKey === true) &&
        (key === 65 || key === 67 || key === 86 || key === 88 || key === 90))
    );
  };

  const enforceFormat = event => {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if (!isNumericInput(event) && !isModifierKey(event)) {
      event.preventDefault();
    }
  };

  const formatToPhone = event => {
    if (isModifierKey(event)) {
      return;
    }

    const target = event.target;
    const input = target.value.replace(/\D/g, "").substring(0, 10); // First ten digits of input only
    const zip = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (input.length > 6) {
      target.value = `(${zip}) ${middle} - ${last}`;
    } else if (input.length > 3) {
      target.value = `(${zip}) ${middle}`;
    } else if (input.length > 0) {
      target.value = `(${zip}`;
    }
  };

  const inputElement = document.getElementById("passportId");
  inputElement.addEventListener("keydown", enforceFormat);
  inputElement.addEventListener("keyup", formatToPhone);
}
