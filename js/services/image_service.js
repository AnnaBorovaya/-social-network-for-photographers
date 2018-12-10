// класс для взаимодействия с сервером: загрузка картинок выбранных пользователем и их удаление
class ImageService {
    
    /**
     * getInfo - получение инфрмации с сервера о картинке
     * @param {string} id 
     */
    getInfo(id) {
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/users/image-info/${id}`)
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
    }
    
    /**
     * removeImg - метод делает запрос на сервер для удаления картинок из сервера, принимает id и url картинки
     * @param {string} id 
     * @param {string} url 
     */
    removeImg(id, url) {
        return new Promise((resolve, reject) => {
            const tokenUser = localStorage.getItem('social_user_token');
            const idUser = localStorage.getItem("social_user_id");
        
            if (!tokenUser || !idUser) return reject('Error. Unauthorized.');
            fetch(`${env.apiUrl}/public/users/remove-photo/${idUser}`, {
                method: 'DELETE',
                body: JSON.stringify ({
                    image_id: id,
                    image_url: url
                }),
                headers: {
                    "x-access-token": tokenUser,
                    "Content-type": "application/json" 
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }
    
    /**
     * uploadImg - метод делает запрос на сервер для загрузки картинок выбранных пользователем на сервер, принимает массив объектов-картинок
     * создает объект FormData в который добавляем каждый объект-картинку массива перебирая его
     * @param {object} file 
     */
    uploadImg(files) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            files.forEach((photo) => {
                formData.append("userPhotos", photo);
            });
            
            const token = localStorage.getItem('social_user_token');
            const id = localStorage.getItem("social_user_id");
            
            if (!token || !id) return reject('Error. Unauthorized.');
            fetch(`${env.apiUrl}/public/users/upload-photos/${id}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'x-access-token': token
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }
}