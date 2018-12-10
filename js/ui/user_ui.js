//класс для вывода в разметку элементов UI - cover avatar и name
class UserUI {
    /**
     * constructor - метод для объявления переменных - контейнеров куда будут помещаться элементы cover, avatar и name
     */
    constructor() {
        this._cover = document.querySelector('.user-cover');
        this._userAvatar = document.querySelector('.user-ava');
        this._userName = document.querySelector('.user-name');
    }

    /**
     * renderUserInfo - метод вызает все три метода вывода UI - cover, avatar и name
     * принимает объект (по результатм вызова getInfo) из него берет 3 переменных (avatar - url, cover - url, full_name - full_name)
     * и передает их в вызываемые внутри него методы
     * @param {object} param0 
     */
    renderUserInfo({avatar, cover, full_name}) {
        this.setCover(cover);
        this.setAvatar(avatar);
        this.setName(full_name);
    }

    /**
     * setCover - функция для вывода в разметку cover
     * @param {string} url 
     */
    setCover(url) {
        this._cover.style.background = `url("${url}") no-repeat center / cover`;
    }

    /**
     * setAvatar - метод для вывода в разметку аватара 
     * создаем кратинку прописываем ей url, а потом добавляем в разметку
     * @param {string} url 
     */
    setAvatar(url) {
        const template = `<img src="${url}" alt="">`;
        this._userAvatar.insertAdjacentHTML('afterbegin', template);
    }

    /**
     * setName - метод для вывода  имени в разметку
     * @param {string} name 
     */
    setName(name) {
        this._userName.textContent = name;
    }
}