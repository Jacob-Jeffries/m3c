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
  // console.log(typeof(passLength));
  // console.log(passLength);

  //Checking equality with NaN is always false - Like WTF JS ???
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
  //This bit of code makes sure that the user only enters the correct values fot the length
  //Then if they cannot handle it it kicks them out of the function
  if(isNaN(parseInt(passLength))){
    if(confirm("You have entered something that is not a number. Try again.")){
      generatePassword();}
    else{
      return "Try Again";
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
  //I tried doing this with individual variables first, but the array works better!
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

  // console.log(criteria);

  if(confirm("Your password criteria:\n\nLength: " + passLength +
  "\nContain Lower Case Letters: " + criteria[0] +
  "\nContain Upper Case Letters: " + criteria[1] +
  "\nContain Numerals: " + criteria[2] +
  "\nContain Special Characters: " + criteria[3] +
  "\n\nDo you accept these criteria?")){
      let password = passAlgo(passLength, criteria); //I didn't want to clunk this up so I made a new function
      return password; //Passes the generated password string back to the writePassword()
    }else{
      if(confirm("Start Over?")){
        generatePassword();
      }else{
        return;
      }
    }
}

//I'm to lazy to code this multiple times!
function getRandomInt(max){
  return Math.floor(Math.random()*max);
}

function passAlgo(a,criteria){
  // console.log(a,criteria);
  let pool = { //I hard coded the pool of optional character
    lower: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','y','z'],
    upper: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','Y','Z'],
    numbers: ['1','2','3','4','5','6','7','8','9','0'],
    symbols: ['!','#','$','%','&','(',')','*','+',',','-','.',':','<','>','=','?','@','[',']','^','_','`','{','}','|','~']}
    //I intentionally left out single and double quotes mas I've seen that play havoc with SQL - of course you could do an escape string...

  let password = [];
  let passwordText;
  let ri; //This variable will denote which array in the pool object to pull from

  //main password generation algorithm 
  for(let i = 0; i < a; i++){ //iterates through each position
    ri = getRandomInt(4); //generated random integer to select an array from the pool 
    // console.log(ri);

    //I have no idea how you would do this without a while loop - it'd be a lot of hard coding!
    //This while loop tests for criteria we've selected during each position character selection
    while(!criteria[ri]){ 
        ri = getRandomInt(4);
      }
    
    // console.log(ri);

    //This code pushes a new character / number into our password array
    if(ri == 0 && criteria[0] === true){
      password.push(pool.lower[getRandomInt(pool.lower.length)]);
    }else if(ri == 1 && criteria[1] === true){
      password.push(pool.upper[getRandomInt(pool.upper.length)]);
    }else if(ri == 2 && criteria[2] === true){
      password.push(pool.numbers[getRandomInt(pool.numbers.length)]);
    }else if(ri == 3 && criteria[3] === true){
      password.push(pool.symbols[getRandomInt(pool.symbols.length)]);
    }else{
      alert("Something went really wrong and you should move to the forest and forget about computers!");
      return;
    }
    // console.log(password);
  }
  let passtext = "";

  //This bit of code concats the array into a single string
  //I tried toString() first, but it left in the commas
  for(x = 0; x < password.length; x++){
    passtext = passtext.concat(password[x]);
  }

  // console.log(passtext);
  //outputs the text string back to generatePassword() function
  return passtext; 
}

//I tried to anticipate incorrect input and programmed for that