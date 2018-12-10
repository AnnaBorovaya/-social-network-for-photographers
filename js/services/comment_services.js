class CommentServices {

    /**
     * uploadComment - метод для загрузки комментариев на сервер
     * @param {string} idImage 
     * @param {string} text 
     */
    uploadComment(idImage, text) {
        return new Promise((resolve, reject) => {
            
            const token = localStorage.getItem('social_user_token');
            const id = localStorage.getItem("social_user_id");
            
            if (!token || !id) return reject('Error. Unauthorized.');
            fetch(`${env.apiUrl}/public/users/comment/${idImage}`, {
                method: 'POST',
                body: JSON.stringify({
                    comment_text: text
                }),
                headers: {
                    "x-access-token": token,
                    "Content-type": "application/json" 
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }

    /**
     * removeComment - метод для удаления комментариев с сервера
     * @param {string} idComment 
     * @param {string} idImage 
     */
    removeComment(idComment, idImage) {
        return new Promise((resolve, reject) => {
            
            const token = localStorage.getItem('social_user_token');
            const id = localStorage.getItem("social_user_id");
            
            if (!token || !id) return reject('Error. Unauthorized.');
            fetch(`${env.apiUrl}/public/users/comment/${idComment}`, {
                method: 'DELETE',
                body: JSON.stringify({
                  image_id: idImage
                }),
                headers: {
                    "x-access-token": token,
                    "Content-type": "application/json" 
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }

    /**
     * editComment - метод для редактирования комментариев на сервере
     * @param {string} idComment 
     * @param {string} text 
     */
    editComment(idComment, text) {
        return new Promise((resolve, reject) => {

            const token = localStorage.getItem('social_user_token');
            const id = localStorage.getItem("social_user_id");
            
            if (!token || !id) return reject('Error. Unauthorized.');
    
            fetch(`${env.apiUrl}/public/users/comment/${idComment}`, {
                method: 'PUT',
                body: JSON.stringify({
                    comment_text: text
                }),
                headers: {
                    "x-access-token": token,
                    "Content-type": "application/json" 
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }
}