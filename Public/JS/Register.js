// function validateData() {
//     /*
//     let username = document.getElementById("username").value;
//     if(username.length < 3 || username.length > 16) 
//         console.log("error-length");
//     let regexUsername = new RegExp('^[a-zA-z0-9_][a-zA-z0-9_]*$')
//     if(!regexUsername.test(username))
//         console.log('error-regex');
//         */

// }


// function startListeners() {
//     let username = document.getElementById("username");
//     let allowedCharacters = new RegExp('^[a-zA-Z0-9_]{3,16}$');
//     username.addEventListener("input", event => {
//         if(allowedCharacters.test(username.value))
//             console.log('Right');
       
//     });
// }

// startListeners();


function sendRegisterRequest() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let birthdate = document.getElementById("birthdate").value;
    let sex = '';
    let sexList = document.getElementsByName('sex');
    if (sexList[0].checked)
        sex = sexList[0].value;
    else 
        sex = sexList[1].value;
    let type = '';
    let typeList = document.getElementsByName('type');
    if (typeList[0].checked)
        type = typeList[0].value;
    else 
        type = typeList[1].value;
    userData = JSON.stringify({username: username, email: email, password: password, 
        firstname: firstname, lastname: lastname, birthdate: birthdate, sex: sex, type: type});
        var xhr = new XMLHttpRequest();


    xhr.open("POST", "/Register.html", true);
    xhr.send(userData);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            route = this.responseText;
            window.location.href = route;
        }
        if(this.readyState == 4 && this.status == 503)
        {
            //TODO handle for internal server error
            route = this.responseText;
            alert('Internal server error.');
        }
        if(this.readyState == 4 && this.status == 409){
            //TODO handle for Already existing username
            alert('Already Existing username!');
        } 
          
    };
}