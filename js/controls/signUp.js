// Init Auth Service
const auth = new AuthService();
// Init Message Module
const message = new Message();
message.init();

// SignUp UI
const form_SignUpForm = document.forms["signUpForm"];

const first_nameInput = form_SignUpForm.elements["first_name"];
const last_nameInput = form_SignUpForm.elements["last_name"];
const nick_nameInput = form_SignUpForm.elements["nick_name"];
const day_of_birthInput = form_SignUpForm.elements["day_of_birth"];
const month_of_birthInput = form_SignUpForm.elements["month_of_birth"];
const year_of_birthInput = form_SignUpForm.elements["year_of_birth"];
const countryInput = form_SignUpForm.elements["country"];
const cityInput = form_SignUpForm.elements["city"];
const gender = form_SignUpForm.elements["gender"];
const email_Input = form_SignUpForm.elements["email"];
const phone_Input = form_SignUpForm.elements["phone"];
const password_Input = form_SignUpForm.elements["password"];
// Init Validation
const validation = new Validation(form_SignUpForm);
validation.init();
// SignUp handler
/**
 * signUpHandler - функция обработчик которая срабатывает при сабмите формы signUp, в ней:
 * 1.проверяется (валидируеться) на соответсвие регулярному выражению значения вводимые в инпуты;
 * 2.вызываеться метод signup который делает запрос к API на отправление значений инпутов и получает ответ с API об успешности или неуспешности регистрации пользователя
 * 3.в случае успешности выводиться сообщение и ридерект на главную страницу
 * 4.в случае ошибки также выводиться сообщение об ошибке
 * @param {object} e 
 */
function signUpHandler(e) {
    e.preventDefault();

    if (!validation.check()) return console.error("Validation error.");
    
    auth.signup(email_Input.value, password_Input.value, nick_nameInput.value, first_nameInput.value, last_nameInput.value, phone_Input.value, gender.value, cityInput.value, countryInput.value, day_of_birthInput.value, month_of_birthInput.value, year_of_birthInput.value)
        .then((res) => {
            if (!res.error) {
                message.show({text: res.message});
                setTimeout(() => window.location = "index.html", 5000)
            } else {
                message.show({text: res.message, error: res.error});
            }
        });
}

form_SignUpForm.addEventListener("submit", signUpHandler);