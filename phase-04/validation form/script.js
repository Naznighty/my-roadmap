const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

function checkEmail() {
  if (!email.value.includes("@") || !email.value.includes(".")) {
    emailError.textContent = "Invalid Email.";
  } else {
    emailError.textContent = "";
  }
}

function checkPassword() {
  if (password.value.length < 8) {
    passwordError.textContent = "Password should at least have 8 characters.";
  } else {
    passwordError.textContent = "";
  }
}

function checkConfirmPassword() {
  if (confirmPassword.value !== password.value) {
    confirmPasswordError.textContent = " The passwords do not match. ";
  } else {
    confirmPasswordError.textContent = "";
  }
}

email.addEventListener("input", checkEmail);
password.addEventListener("input", checkPassword);
confirmPassword.addEventListener("input", checkConfirmPassword);

document.getElementById("submitbtn").addEventListener("click", function () {
  checkEmail();
  checkPassword();
  checkConfirmPassword();

  if (
    !emailError.textContent &&
    !passwordError.textContent &&
    !confirmPasswordError.textContent
  ) {
    alert("Done!");
  }
});
