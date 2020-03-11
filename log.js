async function loginButton() {
  const url = "http://localhost:3003/api/users/login";

  let email = $("#login-field").val();
  let password = $("#password-field").val();

  let user = {
    email: email,
    password: password,
  };

  const data = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const token = await data.json();

  if (token["token"]) {
    sessionStorage.setItem("token", token["token"]);
    window.location.href = "dashboard.html";
  } else {
    alert("Usuário ou senha inválidos.");
  }
}

async function clearToken() {
  const url = "http://localhost:3003/api/users/cleartoken";
  const validar = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

async function verificarLogin() {
  if (!sessionStorage.getItem("token")) {
    clearToken();
    //se o session storage estiver vazio, enviar req para o backend limpar a var token
  }
  const url = "http://localhost:3003/api/users/verificar";
  const validar = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: sessionStorage.getItem("token") }),
  });
  const v = await validar.json();
  if (!v) {
    window.location.href = "login.html";
  }
}

function readFile() {
  $("#upload-file").on("change", function() {
    var reader = new FileReader();

    reader.onload = function(e) {
      $("#person-image").attr("src", e.target.result);
    };

    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
  });
}

function deleteImage() {
  $("#upload-file").val(null);
  $("#person-image").attr("src", "imgs\\person.png");
}

function newUser() {
  window.location.href = "form.html";
}

var table = $(`<table id="formId"></table>`),
  thead = $("<thead></thead>"),
  tbody = $(`<tbody id="tbodyId"></tbody>`),
  th,
  tr = $("<tr></tr>"),
  td;

var table = $("#formId");

// var table = $().createElement('table');
// table.attr('id', 'formId');

$(tr).append("<th>#</th>");
$(tr).append("<th>Name</th>");
$(tr).append("<th>Date created</th>");
$(tr).append("<th>Role</th>");
$(tr).append("<th>Status</th>");
$(tr).append("<th>Action</th>");

$(thead).append(tr);
$(table).append(thead);
$(table).append(tbody);

function appendtable() {
  $("#tabela-dinamica").append(table);
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

    $(tr).append(`<td class="idClass">${table1[i].id}</td>`);

    //for name e image

    $(tr).append(
      `<td class="nameClass"><div id="div-name"><span>${table1[i].firstname +
        " " +
        table1[i].lastname}</span><img src="${table1[i].img}">  </div></td>`,
    );

    //for date creation

    $(tr).append(
      `<td class="dataClass">${dayjs(table1[i].data).format(
        "DD/MM/YYYY",
      )}</td>`,
    );

    //for role

    $(tr).append(`<td class="roleClass">${table1[i].role}</td>`);

    //for status e status img

    $(tr).append(
      `<td class="statusClass" id="td-statusImg"><img src="${table1[i].statusimg}"> ${table1[i].status}</td>`,
    );

    //for action buttons

    let indexItem = table1[i].id;

    $(tr).append(
      `<td class="actionClass" id="td-action"><img src="imgs\\engine.png"><a id="edit-link" onclick="editUser([${indexItem}])"><img src="imgs\\edit.png"></a><a id="a-tag" onclick="deleteUser([${indexItem}])"><img src="imgs\\x.png"></a></td>`,
    );

    tr.setAttribute("id", i);

    $(tbody).append(tr);
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

    let tBody = $("#tbodyId")[0];
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

        //$("h1").text("Edit user information");

        $("#firstName").val(users[index].firstname);
        $("#lastName").val(users[index].lastname);
        $("#language").val(users[index].language);
        $("#phone").val(users[index].mobilephone);
        $("#emailId").val(users[index].email);
        $("#birthday").val(users[index].birthday);
        $("#month").val(users[index].month);
        $("#year").val(users[index].year);
        $("#person-image").attr("src", users[index].img);
        $("#passId").attr("disabled", "disabled");
      }
    };
  }
}

async function putUser(idUser) {
  const url = `http://localhost:3003/api/users/:${idUser}`;

  let firstName = $("#firstName").val();
  let lastName = $("#lastName").val();

  let personImg = $("#person-image").attr("src");

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;

  let language = $("#language").val();
  let mobilePhone = $("#phone").val();
  let birthValue = $("#birthday").val();
  let monthValue = $("#month").val();
  let yearValue = $("#year").val();
  let email = $("#emailId").val();

  let user = {
    iduser: idUser,
    firstname: firstName,
    lastname: lastName,
    data: today,
    role: "Admin",
    status: "Active",
    statusimg: "imgs\\green-circle.png",
    img: personImg,
    language: language,
    mobilephone: mobilePhone,
    birthday: birthValue,
    month: monthValue,
    year: yearValue,
    email: email,
  };

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

  let firstName = $("#firstName").val();
  let lastName = $("#lastName").val();

  let personImg = $("#person-image").attr("src");

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;

  let language = $("#language").val();
  let mobilePhone = $("#phone").val();
  let birthValue = $("#birthday").val();
  let monthValue = $("#month").val();
  let yearValue = $("#year").val();
  let email = $("#emailId").val();
  let password = $("#passId").val();

  let user = {
    firstname: firstName,
    lastname: lastName,
    data: today,
    role: "Admin",
    status: "Active",
    statusimg: "imgs\\green-circle.png",
    img: personImg,
    language: language,
    mobilephone: mobilePhone,
    birthday: birthValue,
    month: monthValue,
    year: yearValue,
    email: email,
    password: password,
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
  var e = $("#question-image")[0];
  e.onmouseover = function() {
    //document.getElementById("popup").style.display = "block";
    //$("#popup").css("display", "block");
    $("#popup").show();
  };
  e.onmouseout = function() {
    //document.getElementById("popup").style.display = "none";
    $("#popup").hide();
  };
}

//mask using regex
function phoneEvent() {
  $("#phone").on("input", function(e) {
    var x = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2]
      ? x[1]
      : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
  });
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
    // Input must be of a valid number format or a modifier key
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

  const inputElement = $("#passportId")[0];
  $(inputElement).on("keydown", enforceFormat);
  $(inputElement).on("keyup", formatToPhone);
}
