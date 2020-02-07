const exampleInputEmail1 = document.getElementById('exampleInputEmail1');
const exampleInputPassword1 = document.getElementById('exampleInputPassword1');
const loginForm = document.getElementById('login-form');
const eye = document.getElementById('eye');
const message = document.getElementById('message');
const alertSuccess = document.getElementById('alert-success');
const authData = [
    { name: 'Test User', email: 'test@test.com', password: '1234567' },
    { name: 'Pavel', email: 'grebeniuk.p@gmail.com', password: '0000000' }
];

const createHTMLNode = (tag, attrs, inner) => {
    const element = document.createElement(tag);
    attrs.map(attr => { element.setAttribute(attr.name, attr.value.join(' ')) });
    inner ? element.innerHTML = inner : null;
    return element;
}
const isEmailValid = email => email.trim().split('').filter(el => el === '@').length !== 1;
const isPasswordValid = password => password.trim().length < 7;
const checkAuth = (eventTarget, typeAuth) => authData.find(el => el[typeAuth] === eventTarget.value.split(' ').join(''));
// const attemptUserLogin = ({email, password}) => {
//     return authData.filter(userInDB => (userInDB.email === email && userInDB.password === password?true:false).length)
// }
const resetForm = () => {
    event.target[0].value = '';
    event.target[0].classList.remove('is-valid');
    event.target[1].value = '';
    event.target[1].classList.remove('is-valid');
    message.innerHTML = '';
}
const showContent = () => {
    loginForm.classList.add('hide');
    content.classList.remove('hide');
}
const hideContent = () => {
    loginForm.classList.remove('hide');
    content.classList.add('hide');
}

exampleInputEmail1.addEventListener('input', event => {
    if (isEmailValid(event.target.value)) {
        event.target.classList.remove('is-valid');
        event.target.classList.add('is-invalid');
    } else {
        event.target.classList.remove('is-invalid');
        event.target.classList.add('is-valid');
    }
})
exampleInputPassword1.addEventListener('input', event => {
    if (isPasswordValid(event.target.value)) {
        event.target.classList.remove('is-valid');
        event.path[1].classList.remove('wrap-is-valid');
        event.target.classList.add('is-invalid');
        event.path[1].classList.add('wrap-is-invalid');
    } else {
        event.target.classList.remove('is-invalid');
        event.path[1].classList.remove('wrap-is-invalid');
        event.target.classList.add('is-valid');
        event.path[1].classList.add('wrap-is-valid');
    }
})
loginForm.addEventListener('submit', event => {
    event.preventDefault();
    message.innerHTML = '';
    if (checkAuth(event.target[0], 'email') && checkAuth(event.target[1], 'password')) {
        alertSuccess.classList.remove('hide');
        alertSuccess.innerHTML = `Hello, ${event.target[0].value}`;
        showContent();
        localStorage.setItem('auth', true);
        resetForm();

    } else if (checkAuth(event.target[0], 'email')) {
        message.append(createHTMLNode('div', [{ name: 'class', value: ['alert', 'alert-warning'] }], `Incorrect password`));
    } else message.append(createHTMLNode('div', [{ name: 'class', value: ['alert', 'alert-danger'] }], `User ${event.target[0].value} not found`));
})

eye.addEventListener('click', event => {
    eye.firstElementChild.classList.toggle('fa-eye-slash');
    eye.firstElementChild.classList.toggle('fa-eye');
    exampleInputPassword1.type === 'password' ? exampleInputPassword1.type = 'text' : exampleInputPassword1.type = 'password';
})

if (localStorage.getItem('auth')) {
    showContent();
}
logout.addEventListener('click', () => {
    localStorage.setItem('auth', '');
    hideContent();
})
