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

  //Ok, The next bit of code will accept the password criteria from the user
  // let contLower = false;
  // let contUpper = false;
  // let contNumber = false;
  // let contSymbol = false;

  const criteria = [];

  criteria.push(confirm("Would you like your new password to contain lower case letters?"));
  criteria.push(confirm("Would you like your password to contain upper case letters?"));
  criteria.push(confirm("Would you like your password to contain numerals?"));
  criteria.push(confirm("Would you like your password to contain special characters?"));

  if(!criteria[0] && !criteria[1] && !criteria[2] && !criteria[3]){
    if(confirm("Your password criteria:\n\nLength: " + passLength +
    "\nContain Lower Case Letters: " + criteria[0] +
    "\nContain Upper Case Letters: " + criteria[1] +
    "\nContain Numerals: " + criteria[2] +
    "\nContain Special Characters: " + criteria[3] +
    "\n\nYour password must contain something, please start over.")){
      generatePassword();
    }else{
      return;
    }
  }

  console.log(criteria);

  if(confirm("Your password criteria:\n\nLength: " + passLength +
  "\nContain Lower Case Letters: " + criteria[0] +
  "\nContain Upper Case Letters: " + criteria[1] +
  "\nContain Numerals: " + criteria[2] +
  "\nContain Special Characters: " + criteria[3] +
  "\n\nDo you accept these criteria?")){
      let password = passAlgo(passLength, criteria);
      return password;
    }else{
      if(confirm("Start Over?")){
        generatePassword();
      }else{
        return;
      }
    }
}

function getRandomInt(max){
  return Math.floor(Math.random()*max);
}

function passAlgo(a,criteria){
  console.log(a,criteria);
  let pool = {
    lower: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','y','z'],
    upper: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','Y','Z'],
    numbers: ['1','2','3','4','5','6','7','8','9','0'],
    symbols: ['!','#','$','%','&','(',')','*','+',',','-','.',':','<','>','=','?','@','[',']','^','_','`','{','}','|','~']}

  let password = [];
  let passwordText;
  let ri; //This variable will denote which array in the pool object to pull from

  

  for(let i = 0; i < a; i++){
    ri = getRandomInt(4);
    console.log(ri);

    if(ri == 0 && b === true){
      password.push(pool.lower[getRandomInt(pool.lower.length)]);
    }else if(ri == 1 && c === true){
      password.push(pool.upper[getRandomInt(pool.upper.length)]);
    }else if(ri == 2 && d === true){
      password.push(pool.numbers[getRandomInt(pool.numbers.length)]);
    }else if(ri == 3 && e === true){
      password.push(pool.symbols[getRandomInt(pool.symbols.length)]);
    }else{
      alert("Something went really wrong and you should move to the forest and forget about computers!");
      return;
    }
    console.log(password);
  }
passwordText = password.toString();
return passwordText;
}