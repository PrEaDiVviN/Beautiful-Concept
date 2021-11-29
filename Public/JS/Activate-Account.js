let username = '';
let email = ''

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function takeDataAndParseHtml() {
    username = unescape(getCookie('username'));
    email = unescape(getCookie('email'));
    console.log(username);
    let h1 = document.getElementById('username');
    h1.innerText = h1.innerText.replace('%u', username);
    let p = document.getElementsByTagName('p')[0];
    p.innerText = p.innerText.replace('%a', email);
}

takeDataAndParseHtml();

function sendValidateAccountKey() {
    let key = document.getElementById('key');
    let keyValue = key.value;

    userData = JSON.stringify({key: keyValue});
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/Activate-Account/' + username, true);
    xhr.send(userData);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 202) {
            route = this.responseText;
            window.location.href = route;
        }
        if(this.readyState == 4 && this.status == 503)
        {
            //TODO handle for internal server error
            route = this.responseText;
            alert('Internal server error.');
        }
        if(this.readyState == 4 && this.status == 406){
            //TODO handle for User Invalid Key
            alert('Wrong account Key. Please Try again.');
        } 
        if(this.readyState == 4 && this.status == 403) {
            //TODO handle for Account Deleted
            route = this.responseText;
            window.location.href = route;
            alert('Your account was deleted!');
            //should redirect to register
        }
        if(this.readyState == 4 && this.status == 404) {
            //TODO handle for Account Deleted
            alert('User account was deleted or does not exists.');
            //should redirect to register
        }
    };
}