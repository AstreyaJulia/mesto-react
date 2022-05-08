import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = (props) => {
    /** Имя пользователя, подпись пользователя из контекста currentUser */
    const currentUser = React.useContext(CurrentUserContext);
    const {name, about} = currentUser;

    /** Стейты имени пользователя и подписи */
    const [userName, setUserName] = React.useState("");
    const [userAbout, setUserAbout] = React.useState("");

    /** Изменяет стейт userName
     * @param evt */
    function handleUserNameChange(evt) {
        setUserName(evt.target.value);
    }

    /** Изменяет стейт userAbout
     * @param evt */
    function handleUserAboutChange(evt) {
        setUserAbout(evt.target.value);
    }

    /** Отправка формы
     * @param evt */
    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateUser({
            name: userName,
            about: userAbout,
        });
    }

    React.useEffect(() => {
        setUserName(name);
        setUserAbout(about);
    }, [name, about]);

    return (
        <PopupWithForm
            popupOpen={props.isOpen}
            popupType="edit_profile"
            popupTitle="Редактировать профиль"
            popupFormName="profileForm"
            submitButtonText="Сохранить"
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__fieldset">
                <label className="popup__input-group" htmlFor="profile_name">
                    <input
                        className="popup__input"
                        type="text"
                        placeholder="Имя"
                        name="name"
                        id="profile_name"
                        required
                        minLength="2"
                        maxLength="40"
                        onChange={handleUserNameChange}
                        value={userName ? userName : ""}
                    />
                    <span className="popup__error" id="profile_name-error"/>
                </label>
                <label className="popup__input-group" htmlFor="profile_about">
                    <input
                        className="popup__input"
                        type="text"
                        placeholder="Подпись"
                        name="about"
                        id="profile_about"
                        required
                        minLength="2"
                        maxLength="400"
                        onChange={handleUserAboutChange}
                        value={userAbout ? userAbout : ""}
                    />
                    <span className="popup__error" id="profile_about-error"/>
                </label>
            </fieldset>
        </PopupWithForm>
    );
};

export default EditProfilePopup;
