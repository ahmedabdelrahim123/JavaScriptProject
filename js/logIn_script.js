var email = document.getElementById("email");
var password = document.getElementById("password");
var usersArr = [];
var nameAlert = document.getElementById("nameAlert");
var vaildForm = false;
var form = document.querySelector("form");

var emailPattern = /^([\w\.-]+)@([a-z\d]+)\.([a-z]{3,5})(\.[a-z]{2,5})?$/;

function validate(field, pattern) {
  var text = document.querySelector(`#${field.id}+div`);
  if (pattern.test(field.value)) {
    text.classList.add("d-none");
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
  } else {
    text.classList.remove("d-none");
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
  }
}

email.addEventListener("keyup", (e) => {
  validate(e.target, emailPattern);
});

form.addEventListener("submit", (e) => {
  if (!email.classList.contains("is-valid")) {
    e.preventDefault();
  } else {
    var register_alert = document.getElementById("register-alert");
    getTasksFromLocalStorage();
    var emailVal = email.value;
    var passwordVal = password.value;
    // var result = usersArr.find(item => item.email == emailVal && item.password === passwordVal);
    var result = usersArr.find((item) => item.email == emailVal);
    if (result) {
      if (result.password == passwordVal) {
        //if found registered user
        register_alert.classList.add("d-none");
        sucess_login(result);
      } //Incorrct password
      else {
        register_alert.textContent =
          "Incorrect Password, please enter it again";
        register_alert.classList.remove("d-none");
        email.classList.remove("is-valid");
        password.value = "";
        e.preventDefault();
      }
    } else {
      register_alert.textContent =
        "No email match this email, please register first";
      register_alert.classList.remove("d-none");
      email.classList.remove("is-valid");
      email.value = "";
      password.value = "";
      e.preventDefault();
    }
  }
});
function getTasksFromLocalStorage() {
  var data = localStorage.getItem("users");
  if (data) {
    usersArr = JSON.parse(data);
  }
}
function sucess_login(result) {
  localStorage.setItem("login", JSON.stringify(result));
}
