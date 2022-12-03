let loginInterface = document.getElementById("login");
let registerInterface = document.getElementById("register");

console.log("cc");

$('#goToRegisterBtn').click(function (e) {
    e.preventDefault();
    $('#loginInterface').addClass('noneDisplay');
    $('#registerInterface').removeClass('noneDisplay');
});

$('#goToLoginBtn').click(function (e) {
    e.preventDefault();
    $('#loginInterface').removeClass('noneDisplay');
    $('#registerInterface').addClass('noneDisplay');
});

$('#reg').click(function (e) {
    e.preventDefault();
    const user = document.getElementById("usernameR").value;
    const pass = document.getElementById("passwordR").value;
    const conf = document.getElementById("confirm").value;
    let notification = document.getElementById("notificationR");
    if (user == "") {
        notification.innerHTML = "Vui lòng nhập tài khoản!"
    }
    else if (pass == "") {
        notification.innerHTML = "Vui lòng nhập mật khẩu!"
    }
    else if (conf == "") {
        notification.innerHTML = "Vui lòng nhập xác nhận mật khẩu!"
    }
    else if (pass != conf) {
        notification.innerHTML = "Vui lòng nhập mật khẩu và xác nhận trùng nhau!"
    }
    else {
        const form = document.getElementById("registerForm");
        form.action = "/register";
        form.submit();
    }
});

$('#loginBtn').click(function (e) {
    e.preventDefault();
    const user = document.getElementById("usernameL").value;
    const pass = document.getElementById("passwordL").value;
    let notification = document.getElementById("notificationL");
    if (user == "") {
        notification.innerHTML = "Vui lòng nhập tài khoản!"
    }
    else if (pass == "") {
        notification.innerHTML = "Vui lòng nhập mật khẩu!"
    }
    else {
        const form = document.getElementById("loginForm");
        form.action = "/login";
        form.submit();
    }
});