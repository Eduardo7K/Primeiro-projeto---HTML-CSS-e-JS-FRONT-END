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

function deleteUser(i) {
  if (confirm("Deseja realmente excluir?")) {
    // var row = document.getElementById(i);
    // row.parentNode.removeChild(row);

    table1.splice(i, 1);
    storageItems();

    console.log(">>", Date.now() - 1580910400000);

    setTimeout(() => window.location.reload(), 500);
  }
}

var table1 = [
  {
    id: 1,
    nome: "Michael Holz",
    data: "04/10/2013",
    role: "Admin",
    status: "Active",
    statusImg: "imgs\\green-circle.png",
    img: "imgs\\michael.jpg",
  },
  {
    id: 2,
    nome: "Paula Wilson",
    data: "05/08/2014",
    role: "Publisher",
    status: "Active",
    statusImg: "imgs\\green-circle.png",
    img: "imgs\\paula.jpg",
  },
  {
    id: 3,
    nome: "Antonio Moreno",
    data: "11/05/2015",
    role: "Publisher",
    status: "Suspended",
    statusImg: "imgs\\red-circle.png",
    img: "imgs\\antonio.png",
  },
  {
    id: 4,
    nome: "Mary Saveley",
    data: "06/09/2016",
    role: "Reviewer",
    status: "Active",
    statusImg: "imgs\\green-circle.png",
    img: "imgs\\mary.jpg",
  },
  {
    id: 5,
    nome: "Martin Sommer",
    data: "12/08/2017",
    role: "Moderator",
    status: "Inactive",
    statusImg: "imgs\\yellow-circle.png",
    img: "imgs\\martin.jpg",
  },
];

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

table.id = "formId";

function appendtable() {
  document.getElementById("tabela-dinamica").appendChild(table);
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
    span1.innerHTML = table1[i].nome;
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

    //for delete image
    var delImg = document.createElement("img");
    delImg.src = "imgs\\x.png";
    var tagA = document.createElement("a");

    tagA.id = "a-tag";
    let indexDel = i;
    tagA.addEventListener("click", function() {
      deleteUser([indexDel]);
    });

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

  if (localStorage.getItem("counter") === null) {
    let id = 6;
    localStorage.setItem("counter", id);
  }
}

function idIncrement() {
  let id = JSON.parse(localStorage.getItem("counter")) + 1;
  localStorage.setItem("counter", JSON.stringify(id));
}

function storageItems() {
  console.log(Date.now() - 1580910400000);
  localStorage.setItem("users", JSON.stringify(table1));
  console.log(Date.now() - 1580910400000);
}

function localStoreItems() {
  table1 = JSON.parse(localStorage.getItem("users"));

  updateTable(table1);
}

function addNewItem() {
  if (checkLength() == true) {
    checkLocalStorage();

    let id = JSON.parse(localStorage.getItem("counter"));
    idIncrement();
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let personName = firstName + " " + lastName;
    let personImg = document.getElementById("person-image").src;

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;

    table1.push({
      id: id,
      nome: personName,
      data: today,
      role: "Admin",
      status: "Active",
      statusImg: "imgs\\green-circle.png",
      img: personImg,
    });
    storageItems();
    location.href = "http://localhost:5500/dashboard.html";
    //setTimeout(() => (location.href = "dashboard.html"), 500);
    // window.open("dashboard.html");

    return true;
  } else {
    alert("Phone number must have 8 or 9 digits");
  }
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
