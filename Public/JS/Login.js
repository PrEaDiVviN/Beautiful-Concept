function sendLoginRequest() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/Login.html", true);
    xhr.send(JSON.stringify({username: username, password: password}));
    xhr.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
            window.location.href = '/mainPage';
         }
         if (this.readyState == 4 && this.status == 401) {
            alert('Account not activated yet.');
         }
         if (this.readyState == 4 && this.status == 403) {
            alert('Password provided is wrong.')
         }
         if (this.readyState == 4 && this.status == 404) {
            alert('The username does not exist.')
         }
         if (this.readyState == 4 && this.status == 500) {
            alert('Internal Server Error.');
         }

     };
}

  
