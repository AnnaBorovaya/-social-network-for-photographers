class Validation {
    /**
     * constructor - метод для инициализации переменных
     */
    constructor(form) {
        this._form = form;
        this._inputs = this._form.querySelectorAll("[data-pattern]");
    }

    /**
     * init - метод необходимый для запуска необходимых методов объекта при его старте
     */
    init() {
        this._setEvents();
    }

    /**
     * check - метод для проверки на соответствие регулярным выражением всех значений вводимых в поля инпут
     * и добавляет класс is-invalid в случае несоответствия
    */
    check() {
        let state = true;

        this._inputs.forEach((input) => {
            const regExp = new RegExp(input.dataset.pattern);
            if (!regExp.test(input.value)) {
                input.classList.add("is-invalid");
                state = false;
            }
        });

        return state;
    }

    /**
     * _setEvents - снимает класс is-invalid при фокусе на поля инпут
     */
    _setEvents() {
        this._inputs.forEach((input) => input.addEventListener("focus", (e) => this._onFocusHandler(e)));
    }

    /**
     * _onFocusHandler - метод-обработчик для снятия класса is-invalid
     * @param {object} e 
     */
    _onFocusHandler(e) {
        e.target.classList.remove("is-invalid");
    }
}