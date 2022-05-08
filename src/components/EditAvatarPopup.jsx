import React from 'react';
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {

    const refAvatar = React.useRef('');

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateAvatar({
            avatar: refAvatar.current.value
        })
    }

    /** Заглушка, чтоб реакт не сыпал ошибки в консоли */
    // FIXME не забыть удалить
    function handleInputChange(evt) {
        console.log(evt);
    }

    React.useEffect(() => {
        refAvatar.current.value = '';
    }, [props.isOpen]);

    return (
        <PopupWithForm
            popupOpen={props.isOpen}
            popupType="update-avatar"
            popupTitle="Обновить аватар"
            popupFormName="updateAvatarForm"
            submitButtonText="Сохранить"
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__fieldset">
                <label
                    className="popup__input-group"
                    htmlFor="avatar_url"
                >
                    <input
                        className="popup__input"
                        type="url"
                        placeholder="Ссылка на аватар"
                        value=""
                        name="avatar"
                        id="avatar_url"
                        required
                        ref={refAvatar}
                        onChange={handleInputChange}
                    />
                    <span
                        className="popup__error"
                        id="avatar_url-error"
                    />
                </label>
            </fieldset>
        </PopupWithForm>

    );
};

export default EditAvatarPopup;
