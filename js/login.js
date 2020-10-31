
//const usuario = document.getElementById('inputEmail');
//const contraseña = document.getElementById('inputPassword');



function checkLogin(mail, passw){
    if (mail!=null && passw!= null) {
        return true;               
    }else return false;
}

document.addEventListener("DOMContentLoaded", function(e){
    const loginForm = document.getElementById('loginForm');
    
    loginForm.onsubmit = function(e){
        e.preventDefault();
        let userEmail = document.getElementById('inputEmail').value;
        localStorage.setItem('email', userEmail);
        window.location.href = 'index'
    };
});
