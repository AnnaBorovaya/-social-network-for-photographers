// Init Auth Service
const auth = new AuthService();
// Init Message Module
const message = new Message();
message.init();
// Login UI
const form = document.forms["loginForm"];
const emailInput = form.elements["email"];
const passwordInput = form.elements["password"];
// Init Validation
const validation = new Validation(form);
validation.init();
// Login handler
/**
 * submitHandler - функция обработчик которая срабатывает при сабмите формы Login, в ней:
 * 1.проверяется (валидируеться) на соответствие регулярному выражению значения вводимые в инпут;
 * 2.вызывается метод login который делает запрос к API на отправление значений инпутов и получает ответ с API об успешности или неуспешности входа пользователя;
 * 3.в случае успешности данные записываются в localStorage и редирект на главную страницу;
 * 4.в случае ошибки выводиться сообщение об ошибке;
 * @param {object} e 
 */
function submitHandler(e) {
    e.preventDefault();

    if (!validation.check()) return console.error("Validation error.");
    
    auth.login(emailInput.value, passwordInput.value)
        .then((res) => {
            if (!res.error) {
                localStorage.setItem("social_user_id", res.id);
                localStorage.setItem("social_user_token", res.token);
                window.location = "index.html";
            } else {
                message.show({text: res.message, error: res.error});
            }
        });
}

form.addEventListener("submit", submitHandler);