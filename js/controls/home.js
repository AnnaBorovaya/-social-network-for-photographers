// Init UserService 
const userApi = new UserService();
// Init ImageService
const imageApi = new ImageService();
// Init UserUI
const userUI = new  UserUI();
// Init ImageUI 
const imageUI = new  ImageUI();
// Init ImageModal
const imageModalUI = new ImageModalUI();
// Init CommentServices
const commentApi = new CommentServices();

// UI elements
const inputCover = document.getElementById('coverImg');
const inputPhotos = document.getElementById('userPhotos');
const imagesWrap = document.querySelector('.images-wrap');
const formComment = document.querySelector('.form-comment');
const commentsWrap = document.querySelector('.current-image-comments-wrap')
const btn_Submit_Edit = document.querySelector('.btn.check')
const btn_Chancel = document.querySelector('.chancel')
const inputComment = document.querySelector('.comment');
let idComment = ''

/**
 * onLoad - функция вызывается при наступлении события Load(когда будут загружены весь контент и все скрипты)
 * запускается один раз при загрузке сайта или при перезагрузке
 * 1.получаем всю информацию о пользователе с сервера (user.getInfo())
 * 2.затем вызываем метод renderUserInfo(data) для вывода в разметку UI(cover avatar name)
 * 3.затем очищаем контейнер картинок (разметку)
 * 4.затем находим в информации о юзере массив наших картинок на сервере и на каждой картинке вызываем метод для вывода в разметку(addImage(img))
 * @param {object} e 
 */
function onLoad(e) {
    userApi.getInfo()
        .then((data) => {
            userUI.renderUserInfo(data);
            return data;
        })
        .then((data) => {
            imageUI.clearContainer();
            data.my_images.forEach((img) => imageUI.addImage(img));
        })
        .catch((error) => {
            console.log(error);
        });
}

/**
 * onCoverUpload - функция будет отрабатывать, когда будут происходить изменения(change), то есть каждый раз когда будет происходить выбор картинки, загрузить или открыть.
 * У инпута, когда мы грузим файлы есть специальное свойство files - это объект, в котором хранятся все загруженые файлы
 * 1.проверяем что есть выбранные файлы и присваиваем в переменную
 * 2.вызываем метод загрузки картинки covera на сервер и передаем в него выбранный файл
 * 3.затем вызываем метод user.getInfo результат которого - вся инфо о юзере с сервера
 * 4.затем из полученного результата мы извлекаем один элемент cover(data.cover) в котором хранится upl ковера
 * 5.затем вызываем метод вывода в разметку - сover(userUI.setCover(data.cover))
 * @param {object} e 
 */
function onCoverUpload(e) {
    if (inputCover.files.length) {
        const [newCover] = inputCover.files;
        userApi.uploadCover(newCover)
            .then(userApi.getInfo)
            .then((data) => userUI.setCover(data.cover))
            .catch((error) => {
                console.log(error);
            });
    }
}

/**
 * onPhotosUpload - функция будет отрабатывать, когда будут происходить изменения(change), то есть каждый раз когда будет происходить выбор картинки, загрузить или открыть.
 * У инпута, когда мы грузим файлы есть специальное свойство files - это объект, в котором хранятся все загруженые файлы
 * 1.проверяем что есть выбранные файлы и присваиваем в переменную массив получаемых картинок
 * 2.вызываем метод загрузки картинки на сервер и передаем в него этот массив картинок, который уже там с помощью formatData превратится в нужный формат
 * 3.затем вызываем метод user.getInfo результат которого - вся инфо о юзере с сервера
 * 4.очищаем контейнер imageUI.clearContainer();
 * 5.перебираем массив объектов файлов-картинок(data.my_images)) и на каждом объекте - картинке вызываем метод вывода в разметку image(imageUI.addImage(img))
 * @param {object} e 
 */
function onPhotosUpload(e) {
    if (inputPhotos.files.length) {
        const[...photosArr] = inputPhotos.files;
        imageApi.uploadImg(photosArr)
        .then(userApi.getInfo)
        .then((data) => {
            imageUI.clearContainer();
            data.my_images.forEach((img) => imageUI.addImage(img));
        })
        .catch((error) => {
            console.log(error)
        });
    }
}

/**
 * removePhotos - функция для удаления картинок
 * При условии клика на эллемент родителем которого является элемент с классом .trash:
 * 1.находим родителя данного элемента с классом .img-wrap и затем значение его атрибута data-img-id(id)
 * 2.находим элемент с атрибутом 'src' и затем значение этого атрибута(url)
 * 3.находим необходимую часть строки url
 * 4.вызываем метод удаления картинки из сервера  и передаем туда найденые нами значения id и url - imageApi.removeImg(valueId, partUrl)
 * 5.вызываем метод удаления картинки из разметки и передаем туда найденный нами id - imageUI.removeImg(valueId)
 * @param {object} e 
 */
function removePhotos(e) {
    if (e.target.classList.contains("trash")) {
        if(confirm('Вы точно желаете удалить эту фотографию?')) {
            const parent = e.target.closest("[data-img-id]");
            const valueId = parent.dataset.imgId;

            const urlElem = parent.querySelector('[src]');
            const valueUrl = urlElem.getAttribute('src');
        
            const pos = valueUrl.indexOf('users-photos');
            const partUrl = valueUrl.slice(pos);
            
            imageApi.removeImg(valueId, partUrl)
                .then(imageUI.removeImg(valueId))
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}

/**
 * showInfoPhotos - метод показывает всю подробную информацию о картинке в модальном окне
 * 1.открывает модaльное окно вместе с Лоадером при клике на картинку
 * 2.получает от сервера подробную информацию о картинке
 * 3.передает эту информацию в imageModalUI.renderInfo(data) который выводит в разметку модального окна всю информацию, скрывая Лоадер
 * @param {object} e 
 */
function showInfoPhotos(e) {
    if (e.target.classList.contains("on-hover")) {
        const id = e.target.closest("[data-img-id]").dataset.imgId;
        $('#imageModal').modal('toggle');

        imageApi.getInfo(id)
            .then((data) => imageModalUI.renderInfo(data))
            .catch((error) => {
                console.log(error);
            });
    }
}

// Remove loader - при закрытии модального окна вызываетьтся метод imageModalUI.loaderToggle() которая снимает класс 'hidden'
$('#imageModal').on('hidden.bs.modal', (e) => imageModalUI.loaderToggle());
 
/**
 * editComment- функция-обработчик для редактирования фотографий, функция срабытывает при условии если нажата кнока edit
 * 1.проверяем условие: если есть клас invisible на иконке Edit, то делаем её видимой(удаляем этот класс)
 * 2.удаляем класс 'check' тем самым переключая обработчик формы в состояние редактирования Edit(а не добавления-Add)
 * 3.кнопку Submit переписываем на Edit
 * 4.делаем невидимой иконку edit
 * 5.делаем видимой кнопку Chancel и вешаем на неё обработчик события.При нижатии на кнопку Chancel происходит следующее:
 *      а.кнопка Edit переписываеться на Submit
 *      б.кнопке Chancel добавляем класс invisible, делая её невидимой
 *      в.делаем видимой иконку Edit
 *      г.добавляем класс 'check' тем самым переключая обработчик формы в состояние редактирования Edit(а не добавления-Add)
 * 6.находим id редактируемого комментария для дальнейшего использования этой переменной в обработчике на кнопку Submit
 * 7.находим текст редактируемого комментария
 * 8.искомый текст вставляем в поле для ввода комментариев
 * @param {object} e
 */
function editComment(e) {
    if (e.target.classList.contains("edit-comment")) {
        if (document.querySelector('.edit-comment.invisible')) document.querySelector('.edit-comment.invisible').classList.remove('invisible')
        
        const iconEdit = e.target;
        btn_Submit_Edit.classList.remove('check');
        btn_Submit_Edit.textContent = 'Edit';
        iconEdit.classList.toggle('invisible');
       
        btn_Chancel.classList.remove('invisible')
        btn_Chancel.addEventListener('click', (e) => {

            btn_Submit_Edit.textContent = 'Submit';
            btn_Chancel.classList.add('invisible');
            iconEdit.classList.remove('invisible');
            btn_Submit_Edit.classList.add('check');
        })

        idComment = e.target.closest(".comment-item").dataset.commentId;
        
        const text = e.target.closest(".comment-item-details").querySelector('p').innerHTML;
        inputComment.value = text;
    }
}

/**
 * add_or_edit_Comment - функция-обработчик на форму. Имеет две ветки : 1-я при состоянии Add 2-я при состоянии Edit
 * - находим id картинки модуля
 * - делаем невидимой кнопку Chancel
 * 1.при состоянии Add:
 * - проверяем что кнопка имеет состоние Submit
 * - находим текст введенное пользователем в поле для ввода комментариев
 * - вызываем метод загрузки комемнтария на сервер
 * - вызываем метод получения информации о картинке
 * - вызываем метод вывода коментариев в разметку
 * - обнуляем поле для ввода комментариев
 * 2.при состоянии Edit:
 * - проверяем что кнопка имеет состоние Edit
 * - находим текст изменённый пользователем в поле для ввода комментариев
 * - вызываем метод изменения комментария на сервере
 * - вызываем метод получения информации о картинке
 * - вызываем метод вывода коментариев в разметку
 * - добавляем класс 'check' тем самым переключая обработчик формы в состояние добавления комментариев Add
 * - кнопку Edit переписываем на Submit
 * - обнуляем поле для ввода комментариев
 * @param {object} e  
 */
function add_or_edit_Comment(e) {
    e.preventDefault();
    const idImage = document.querySelector('[data-id-modal-img]').dataset.idModalImg; 
    btn_Chancel.classList.add('invisible');

    if (btn_Submit_Edit.classList.contains('check')) { 

        const commentValue  = e.target.querySelector('.comment').value;
       
        commentApi.uploadComment(idImage, commentValue)
            .then(() => imageApi.getInfo(idImage))
            .then((data) => imageModalUI.setComments(data))
            .catch((error) => {
                console.log(error);
            });
        formComment.reset();
    };

    if (!btn_Submit_Edit.classList.contains('check')) {
       
        const editText = inputComment.value;
        commentApi.editComment(idComment, editText)
            .then(() => imageApi.getInfo(idImage))
            .then((data) => imageModalUI.setComments(data))
            .catch((error) => {
                console.log(error);
            });
        btn_Submit_Edit.classList.add('check');
        btn_Submit_Edit.textContent = 'Submit';
        formComment.reset();
    }
}

/**
 * removeComment - функция-обработчик для удаления комментариев, функция срабытывает при условии если нажата кнока trash
 * 1.находим id удаляемого комментария
 * 2.находим id картинки модального окна
 * 3.вызываем метод удаления комментария ссервера
 * 4.вызываем метод удаления комментария из разметки
 * @param {object} e 
 */
function removeComment(e) {
    if (e.target.classList.contains("trash-comment")) {
        const idComment = e.target.closest(".comment-item").dataset.commentId;
        const idImage = document.querySelector('[data-id-modal-img]').dataset.idModalImg;

        commentApi.removeComment(idComment, idImage)
            .then(() => imageModalUI.removeComment(idComment))
            .catch((error) => {
                console.log(error);
            });
    }
}

//Events
commentsWrap.addEventListener('click', editComment);
commentsWrap.addEventListener('click', removeComment);
formComment.addEventListener('submit', add_or_edit_Comment);
imagesWrap.addEventListener('click', showInfoPhotos);
imagesWrap.addEventListener('click', removePhotos);
inputPhotos.addEventListener("change", onPhotosUpload);
inputCover.addEventListener("change", onCoverUpload);
window.addEventListener("load", onLoad);

