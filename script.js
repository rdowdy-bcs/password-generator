var DEFAULT_PASSWORD_LENGTH = 8;
var generateBtn = document.querySelector("#generate");

var passwordOptions = {
  passwordLength: DEFAULT_PASSWORD_LENGTH,
  lowercase: false,
  uppercase: false,
  numeric: false,
  specialChars: false
}

function generatePassword() {
  // PROMPT user for password character input
  getUserInput();
  
  // VALIDATE user input and RE-PROMPT until we get a valid configuration
  while (!isValidPasswordOptions()) {
    alert("You must select at least one character type!");
    getUserInput();
  }

  // GENERATE password
  var password = "";
  var possibleCharacters = getListOfUsablePasswordCharacters();
  for (var i = 0; i < passwordOptions.passwordLength; i++) {
    password += getRandomElementFromArr(possibleCharacters);
  }

  return password;
}

function getRandomElementFromArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getListOfUsablePasswordCharacters() {
  var lowercase = 'abcdefghijklmnopqrstuvwxyz'.split('');
  var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  var numeric = '0123456789'.split('');
  var specialChars = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('');

  var possibleCharacters = [];

  if (passwordOptions.lowercase) {
    possibleCharacters = possibleCharacters.concat(lowercase);
  }

  if (passwordOptions.uppercase) {
    possibleCharacters = possibleCharacters.concat(uppercase);
  }

  if (passwordOptions.numeric) {
    possibleCharacters = possibleCharacters.concat(numeric);
  }

  if (passwordOptions.specialChars) {
    possibleCharacters = possibleCharacters.concat(specialChars);
  }
  
  return possibleCharacters;
}

function isValidPasswordOptions() {
  return (
    passwordOptions.lowercase ||
    passwordOptions.uppercase ||
    passwordOptions.numeric ||
    passwordOptions.specialChars
  );
}

function getUserInput() {
  passwordOptions.passwordLength = getPasswordLengthFromUser();
  passwordOptions.lowercase = confirm("Include lowercase characters?");
  passwordOptions.uppercase = confirm("Include uppercase characters?");
  passwordOptions.numeric = confirm("Include numbers?");
  passwordOptions.specialChars = confirm("Include special characters?");
}

function getPasswordLengthFromUser() {
  var passwordLength = prompt("Enter password length between 8 and 128 characters");

  if (passwordLength === null || isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128) {
    return DEFAULT_PASSWORD_LENGTH;
  }

  return parseInt(passwordLength);
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
