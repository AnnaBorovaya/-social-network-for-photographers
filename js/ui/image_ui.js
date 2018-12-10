//класс для вывода в разметку картинок и их удаления 
class ImageUI {
    /**
     * constructor - метод для объявления переменных - контейнера для помещения картинок
     */
    constructor() {
        this._imageContainer = document.querySelector('.images-wrap .row');
    }

    /**
     * removeImg - метод для удаления картинок из разметки, которую хочет удалить пользователь и принимает id картинки
     * находит по принятому id элемент, затем его родителя и найденный элемент удаляем из контейнера
     * @param {string} id 
     */
    removeImg(id) {
        const findRemoveImg = document.querySelector(`[data-img-id="${id}"]`);
        const findParentRemoveImg = findRemoveImg.parentElement;
        this._imageContainer.removeChild(findParentRemoveImg);
    }

    /**
     * addImage - метод для добавления картинки в контейнер
     * принимает один объект картинки, который потом передается в метод для генерации шаблона
     * и готовый шаблон добаявляется в контейнер
     * @param {object} image 
     */
    addImage(image) {
        const template = ImageUI._imageTemplate(image);
        this._imageContainer.insertAdjacentHTML('afterbegin', template);

    }

    /**
     * clearContainer - метод отвечает за очистку контейнера 
     * когда будет добавляться новая кратинка или когда какая-то картинка будет удаляться
     */
    clearContainer() {
        this._imageContainer.innerHTML = '';
    }

    /**
     * _imageTemplate - метод для генерации шаблона картинки(внутренний - потому static)
     * принимает сам объект картинки только с необходимыми свойствами
     * @param {object} param0 
     */
    static _imageTemplate({url, views, likes, _id}) {
        return `
        <div class="col-4 col">
            <div class="img-wrap" data-img-id="${_id}">
                <img src="${url}" alt="">
                <div class="on-hover d-flex flex-column justify-content-between">
                    <div class="remove-wrap d-flex">
                        <i class="fas fa-trash-alt ml-auto trash"></i>
                    </div>

                    <div class="img-info d-flex align-items-center">
                        <span class="views-count d-flex align-items-center">
                            <i class="fas fa-eye"></i>
                            ${views.length}
                        </span>
                        <span class="likes-count d-flex align-items-center ml-5">
                            <i class="fas fa-thumbs-up"></i>
                            ${likes.length}
                        </span>
                        
                    </div>
                </div>
            </div>
        </div>
        <!-- /.col-4 col -->
        `;
    }
}

