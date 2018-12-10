class AuthService {
    /**
     *  login - метод который направляет к API запрос на отправку данных для входа на сайт и получает ответ об успешности или ошибки отправки данных.
     * @param {string} email 
     * @param {string} password 
     */
    login(email, password) {
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/auth/login`, {
                method: "POST",
                body: JSON.stringify({email, password}),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }
    /**
     * signup - метод который направляет к API запрос на отправку данных для регистрации на сайте и получает ответ об успешности или ошибки отправки данных.
     * @param {string} email 
     * @param {string} password 
     * @param {string} nickname 
     * @param {string} first_name 
     * @param {string} last_name 
     * @param {string} phone 
     * @param {string} gender_orientation 
     * @param {string} city 
     * @param {string} country 
     * @param {string} date_of_birth_day 
     * @param {string} date_of_birth_month 
     * @param {string} date_of_birth_year 
     */
    signup(email, password, nickname, first_name, last_name, phone, gender_orientation, city, country, date_of_birth_day, date_of_birth_month, date_of_birth_year) {
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/auth/signup`, {
                method: "POST",
                body: JSON.stringify({email, password, nickname, first_name, last_name, phone, gender_orientation, city, country, date_of_birth_day, date_of_birth_month, date_of_birth_year}),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }

    /**
     * reset - метод который направляет к API запрос на отправку данных для сброса пароля  и получает ответ об успешности или ошибки отправки данных.
     * @param {string} email 
     */
    reset(email) {
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/auth/reset-password`, {
                method: "POST",
                body: JSON.stringify({email}),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }
    
    
}

