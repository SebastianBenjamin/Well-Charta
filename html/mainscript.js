
var users=[];
var k=0;
var namee='';

function register(){
 var r_name=document.getElementById('r_fName').value+document.getElementById('r_lName').value;
 var r_dob=document.getElementById('r_DOB').value;
 var r_email=document.getElementById('r_Email').value;
 var r_mob=document.getElementById('r_Mob').value;
 var r_aadhaar=document.getElementById('r_Aadhaar').value;
 alert(r_dob);
 if(r_name.value==''||r_dob.value==''||r_email.value==''||r_mob.value==''||r_aadhaar.value==''){
alert("Input fields can't be empty !");
return 0;
 }
 else{
 if (validateAadhaar(r_aadhaar)) {
  // alert("Valid Aadhaar Number");
} else {
  alert("Invalid Aadhaar Number");
document.getElementById('r_Aadhaar').value='';
  return 0;

}
if (validateDate(r_dob)) {
  // alert("Valid Date");
} else {
  alert("Invalid Date");
  document.getElementById('r_DOB').value='';
  return 0;
}
k=k+1;
    let user = {
        id: k,
        Name:r_name,
        Dob: r_dob,
        Email: r_email,
        Mobile:r_mob,
        Aadhaar:r_aadhaar
    };

    users.push(user);

alert("Registeration Successful !");
let users_string = JSON.stringify(users);
localStorage.setItem("getusers", users_string);
}

}



function clears(){
    localStorage.clear();
} 

function login(){
  // alert('VIEW');
  let v_aadhaar=[];
  let retString = localStorage.getItem("getusers");
  let parsed_string=JSON.parse(retString);
  var l_Aadhaar=document.getElementById('L_Aadhaar').value;
  var l_Dob=document.getElementById('L_DOB').value;
  let kk=0;
  console.log(parsed_string[0].Dob);  
  
  for (var i=0; i<parsed_string.length;i++){
    if((parsed_string[i].Aadhaar===l_Aadhaar)&&(parsed_string[i].Dob===l_Dob)){
      kk=1;
      namee=parsed_string[i].Name;
      break;
    }
    else{
      kk=0;
    }
  }
  if(kk===0){
    alert("USER NOT FOUND !");
    document.getElementById('L_Aadhaar').value='';
document.getElementById('L_DOB').value='';
    return 0;
  }
  else{
    alert("Welcome "+namee);
    window.close();
    window.open("./wellcharta.html");

    window.document.getElementById('userr').innerHTML=namee;

  }


}
function hidelogin(){
  document.getElementById('c_forum').style.display="block";
document.getElementById('c_forum1').style.display="none";
}
function hidereg(){
  document.getElementById('c_forum').style.display="none";
document.getElementById('c_forum1').style.display="block";
}

function validateAadhaar(aadhaar) {
  // Check for 12 digits with spaces after every 4 digits
  const regex = /^[2-9][0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;

  if (regex.test(aadhaar)) {
    return true;
  } else {
    return false;
  }
}

function validateDate(date) {
  // Regular expression to check if the date is in YYYY-MM-DD format
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  // If date doesn't match the regex, return false
  if (!regex.test(date)) {
    return false;
  }

  // Parse the date parts to integers
  const parts = date.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  // Check the ranges of month and day
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  // Create a new Date object
  const parsedDate = new Date(year, month - 1, day);

  // Check if the parsed date matches the input date parts
  if (parsedDate.getFullYear() !== year ||
      parsedDate.getMonth() + 1 !== month ||
      parsedDate.getDate() !== day) {
    return false;
  }

  return true;
}