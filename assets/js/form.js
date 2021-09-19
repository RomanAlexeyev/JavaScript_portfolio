const form = document.getElementById('form');
const login = document.getElementById('login');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs () {
    const logVal = login.value.trim();
    const emVal = email.value.trim();
    const passVal = password.value.trim();
    const pass2Val = password2.value.trim();

    if (logVal == '') {
        setErrorFor(login, 'Вы не указали логин');
    } else if (!isLogin(logVal)) {
        setErrorFor(login, 'Только буквы и цифры');
    } else {
        setSuccessFor(login);
    }

    if (emVal == '') {
        setErrorFor(email, 'Вы не указали почту');
    } else if (!isEmail(emVal)) {
        setErrorFor(email, 'Укажите почту в верном формате');
    } else {
        setSuccessFor(email);
    }

    if (passVal == '') {
        setErrorFor(password, 'Вы не указали пароль');
    } else if (!isPassword(passVal)) {
        setErrorFor(password, 'Минимум 7 знаков, 1 цифра и 1 строчная буква');
    } else {
        setSuccessFor(password);
    }

    if (pass2Val == '') {
        setErrorFor(password2, 'Вы не указали пароль');
    } else if (pass2Val !== passVal) {
        setErrorFor(password2, 'Пароль не совпадает');
    } else {
        setSuccessFor(password2);
    }
}

function setErrorFor(input, errMessage) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = errMessage;
    formControl.className = 'form__control error';
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form__control  success';
}

function isLogin (login) {
    return /^[0-9a-zA-Z]+$/.test(login);
}

function isEmail (email) {
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email);
}

function isPassword (password) {
    return /^(?=.*\d)(?=.[A-Z])[0-9a-zA-Z]{7,}$/.test(password);
}