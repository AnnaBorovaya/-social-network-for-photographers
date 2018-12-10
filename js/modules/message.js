class Message {
    /**
     * constructor - метод для инициализации переменных
     */
    constructor() {
        this._messageContainer;
    }
    /**
     * init - метод необходимый для запуска необходимых методов объекта при его старте
     */
    init() {
        this._setContainer();
    }
    
    /**show - метод который выводит сообщение в разметку
     * @param {object} 
     */
    show({text, error}) {
        const template = Message._createMessageTemplate(text, error);
        this._messageContainer.insertAdjacentHTML("afterbegin", template);
    }

    /**
     * _setContainer - метод который создает контейнер для сообщений
     */
    _setContainer() {
        const template = "<div class='message-container'></div>";
        document.body.insertAdjacentHTML("afterbegin", template);
        this._messageContainer = document.querySelector(".message-container");
    }

    /**
     * _createMessageTemplate - метод для создания шаблона сообщения
     * @param {string} text 
     * @param {string} error 
     */
    static _createMessageTemplate(text, error) {
        return `
            <div class="alert ${error ? 'alert-danger' : 'alert-success'}">${text}</div>
        `;
    }
}