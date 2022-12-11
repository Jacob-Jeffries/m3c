// Assignment Code

//This code takes the button id and takes it into JS
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {
  var passLength = prompt("Enter a value between 8 - 128 to set your password length");
  console.log(typeof(passLength));
  console.log(passLength);

//Checking equality with NaN is always false - Like WTF JS ???
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
//This bit of code makes sure that the user only enters the correct values fot the length
//Then if they cannot handle it it kicks them out of the function
  if(isNaN(parseInt(passLength))){
    if(confirm("You have entered something that is not a number. Try again.")){
      generatePassword();}
    else{
      return;
    }
  }else if(passLength >= 8 && passLength <= 128){
    alert("Good Choice, the length you chose is: " + passLength);
  }else if(passLength > 128){
    alert("You have selected " + passLength +".\nThat is a password that is too long. \nTry again.");
    generatePassword();
  }else if(passLength < 8){
    alert("You have selected " + passLength +".\nThat is a password that is too short.\nTry again.");
    generatePassword();
  }else{
    if(confirm("Something went wrong, please try again.")){
      generatePassword();
    }else{
      return;
    }
  } 


}