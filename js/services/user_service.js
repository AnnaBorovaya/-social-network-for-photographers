// класс для взаимодействия с сервером: получение информации о юзере, загрузка сover выбранного пользователем
class UserService {
    /**
     * getInfo - метод получения ВСЕЙ информации о пользователе с сервера
     */
    getInfo() {
        return new Promise((resolve, reject) => {
            const id = localStorage.getItem("social_user_id");
            fetch(`${env.apiUrl}/public/users/get-info/${id}`)
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }

    /**
     * uploadCover - метод принимает один объект картинки covera из объекта files у инпута и делает запрос на сервер для загрузки на него картинки covera
     **new FormData - спец. объект превратит данные в специальный формат, new FormData.append('coverImg', file) - добавляет в этот объект данные
     **передаем туда название ключа с сервера и один объект картинки, которую мы получили из свойства инпута files-объекта
     ** formData.getAll('coverImg') - метод для получения объекта formData с добавленными в него данными
     * @param {object} file 
     */
    uploadCover(file) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('coverImg', file);  
            
            const token = localStorage.getItem('social_user_token');
            const id = localStorage.getItem("social_user_id");
            
            if (!token || !id) return reject('Error. Unauthorized.');
            fetch(`${env.apiUrl}/public/users/upload-cover/${id}`, {
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

