// Reset UI
const resetForm = document.forms["ReseForm"];
const resetEmailInput = resetForm.elements['reset'];

// Reset handler
/**
 * resetHandler - функция обработчик которая срабатывает при сабмите формы модального окна, в ней:
 * 1.вызывается метод reset который делает запрос к API на отправление значения поля Email на правильность его ввода;
 * 2.в случае успешности выводится сообщение и модальное окно закрывается; 
 * 3.в случае ошибки также выводиться сообщение;
 *  @param {object} e 
 */
function resetHandler(e) {
    e.preventDefault();
    
    auth.reset(resetEmailInput.value)
        .then((res) => {
            if (!res.error) {
                message.show({text: res.message});
                const clouseButton = document.querySelector('.close');
                clouseButton.click();
            } else {
                message.show({text: res.message, error: res.error});
            }
        });
}

resetForm.addEventListener("submit", resetHandler);