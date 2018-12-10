class ImageModalUI {
    /**
     * constructor - метод для инициализации переменных
     * this._imageInfoContainer - верхний блок который содержит в себе информацию о человеке(хозяине фотографии), колличество лайков и просмотров
     * this._imgTag - блок который содержит в себе картинку
     * this._commentContainer - блок который содержит в себе комментарии
     * this._loader - блок который содержит в себе loader
     */
    constructor() {
        this._imageInfoContainer = document.querySelector("#imageModal .current-image-info");
        this._imgTag = document.querySelector(".current-image img");
        this._commentContainer = document.querySelector(".current-image-comments-wrap");
        this._loader = document.getElementById("loading");
    }
    
    /**
     *  loaderToggle - метод для переключения лоадеру класса "hidden" скрывающего его
     */
    loaderToggle() {
        this._loader.classList.toggle("hidden");
    }

    /**
     * renderInfo - общий метод который будут вызывать все три метода вывода общей инфы картинки и комментариев
     * @param {Object} image 
     */
    renderInfo(image) {
        this.clearModal();
        this.setBaseInfo(image);
        this.setImg(image);
        this.setComments(image);
        this.loaderToggle();
    }

    /**
     * setBaseInfo - метод который выводит в разметку общую (верхнюю)информацию о владельце картинки и картинке
     * @param {Object} image 
     */
    setBaseInfo(image) {
        const template = ImageModalUI._basicInfoTemplate(image);
        this._imageInfoContainer.insertAdjacentHTML("afterbegin", template);
    }
    
    /**
     * setImg - метод который выводит в разметку саму картинку
     * @param {object} param0 
     */
    setImg({url, _id}) {
        this._imgTag.src = url;
        this._imgTag.dataset.idModalImg = _id;
    }

    /** 
     * clearModal - метод который будут очищать модальное окно перед тем как будет проставляться информация
     * так как нужно при каждом открытии модального окна очистить предыдущее и добавить новую информацию 
     */
    clearModal() {
        this._imageInfoContainer.innerHTML = "";
    }

    /**
     * setComments - метод который выводит в разметку комментарии
     * очищаем контейнер с комментариями
     * перебираем все комментарии, которые у нас есть(весь массив) и сформируем общий шаблон 
     * который забрасываем в контейнер для комментариев
     * @param {object} param0 
     */
    setComments({comments, owner}) {
            this.clearComment();
            let template = "";
            comments.forEach((comment) => template += ImageModalUI._commentTemplate(comment, owner));
            this._commentContainer.insertAdjacentHTML("afterbegin", template); 
    }

    /** 
     * clearComment - метод который будут очищать контейнер с комментариями перед тем как информация будет выводиться в разметку
     */
    clearComment() {
        this._commentContainer.innerHTML = "";
    }

    /**
     * removeComment - метод для удаления комментария из разметки
     * принимает id, по которому мы ищем выбранный для удаления комментарий пользователем.
     * @param {string} id 
     */
    removeComment(id) {
        const findRemoveComment  = document.querySelector(`[data-comment-id="${id}"]`);
        this._commentContainer.removeChild(findRemoveComment);
    }
    
    /**
     * _commentTemplate - формирует шаблон HTML для комментариев
     * @param {object} param0 
     * @param {object} param1 
     */
    static _commentTemplate(comments, {_id}) {
        const currentUserId = localStorage.getItem("social_user_id");
        const isOwner = currentUserId == comments.owner || currentUserId == _id;
        return `
        <div class="comment-item mb-4" data-comment-id=${comments._id}>
            <div class="comment-item-details d-flex">
                <div class="comment-owner-avatar">
                    <img src="${comments.avatar}" alt="">
                </div>
                <!-- /.comment-owner -->
                <div class="comment-item-info d-flex flex-column">
                    <h6 class="font-weight-bold">${comments.full_name}</h6>
                    <p>${comments.text}</p>
                    <span class="text-secondary">${comments.time_update}</span>
                </div>
                <!-- /.comment-item-info -->
                <div class="ml-auto">
                    ${isOwner ? '<i class="fas fa-edit edit-comment"></i> <i class="fas fa-trash-alt trash-comment"></i>': ''}
                </div>
            </div>
            <!-- /.comment-item-details -->
            <div class="sub-comments"></div>
            <!-- /.sub-comments -->
        </div>
        <!-- /.comment-item -->
        `;
    }

    /**
     * _basicInfoTemplate - формирует шаблон HTML для общей(верхней) информации о владельце картинки и самой картинке
     * @param {object} param0 
     */
    static _basicInfoTemplate({owner, views, likes}) {
        return `
            <div class="owner-info d-flex align-items-center">
                <div class="owner-avatar">
                    <img src="${owner.avatar}" alt="">
                </div>
                <!-- /.owner-avatar -->
                <div class="d-flex flex-column">
                    <span class="font-weight-bold">${owner.full_name}</span>
                    <span class="text-secondary">${owner.city}</span>
                </div>
            </div>
            <!-- /.owner-info -->
            <div class="current-image-stats d-flex ml-auto">
                <div class="views-count d-flex flex-column align-items-center">
                    <i class="fas fa-eye"></i>
                    <span class="font-weight-bold">${views.length}</span>
                </div>
                <div class="likes-count d-flex flex-column align-items-center ml-4">
                    <i class="fas fa-thumbs-up"></i>
                    <span class="font-weight-bold">${likes.length}</span>
                </div>
            </div>
            <!-- /.image-sstatistics -->
        `;
    }
}