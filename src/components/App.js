import React, {useEffect, useState} from 'react';
import {Header} from "./Header";
import {Footer} from "./Footer";
import {Main} from "./Main";
import {api} from '../utils/api.js';
import {PopupWithForm} from "./PopupWithForm";
import {ImagePopup} from "./ImagePopup";

/**
 * @returns {JSX.Element}
 * @constructor
 */
function App() {

    /** Состояние текущего пользователя */
    const [currentUser, setCurrentUser] = useState({});

    /** Состояние массива карточек */
    const [cards, setCards] = useState({});

    /** Состояние выбранной карточки */
    const [selectedCard, setSelectedCard] = React.useState({name: "", link: ""});

    /** Состояние всплывашки редактирования профиля */
    const [editProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);

    /** Состояние всплывашки добавления карточки */
    const [newPlacePopupOpen, setNewPlacePopupOpen] = React.useState(false);

    /** Состояние всплывашки редактирования аватара */
    const [updateAvatarPopupOpen, setUpdateAvatarPopupOpen] = React.useState(false);

    /** Состояние всплывашки удаления карточки */
    const [deletePlacePopupOpen, setDeletePlacePopupOpen] = React.useState(false);


    /** Устанавливает выбранную карточку по нажатию
     * @param card */
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    /** Открывает всплывашку редактирования профиля */
    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    /** Открывает всплывашку добавления карточки */
    function handleNewPlaceClick() {
        setNewPlacePopupOpen(true);
    }

    /** Открывает всплывашку редактирования аватара */
    function handleUpdateAvatarClick() {
        setUpdateAvatarPopupOpen(true);
    }

    /** Открывает всплывашку удаления карточки */
    function handleDeletePlaceClick() {
        setDeletePlacePopupOpen(true);
    }

    /** Закрывает все всплывашки / сбрасывает состояния */
    function closeAllPopups() {
        setSelectedCard({name: '', link: ''});
        setEditProfilePopupOpen(false);
        setNewPlacePopupOpen(false);
        setUpdateAvatarPopupOpen(false);
        setDeletePlacePopupOpen(false);
    }

    /** Заглушка, чтоб реакт не сыпал ошибки в консоли */
    function handleInputChange(evt) {
        console.log(evt)
    }

    /** Получаем данные залогиненного пользователя, пишем в состояние currentUser */
    useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => console.log(err))
    }, []);

    /** Получаем массив карточек, пишем в состояние cards */
    useEffect(() => {
        api.getCards()
            .then((cardsArray) => {
                setCards(cardsArray);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="App">

            <Header/>

            <Main
                currentUser={currentUser} // id залогиненного пользователя
                cards={cards} // массив карточек
                onCardClick={handleCardClick} // нажатие на карточку
                onEditProfile={handleEditProfileClick} // редактирование профиля
                onNewPlace={handleNewPlaceClick} // добавление карточки
                onUpdateAvatar={handleUpdateAvatarClick} // редактирование аватара
                onDeleteCard={handleDeletePlaceClick} // удаление карточки
            />

            <Footer/>

            {/** Всплывашка редактирования профиля */}
            <PopupWithForm popupOpen={editProfilePopupOpen} popupType="edit_profile" popupTitle="Редактировать профиль"
                           popupFormName="profileForm" submitButtonText="Сохранить" onClose={closeAllPopups}>
                <fieldset className="popup__fieldset">
                    <label className="popup__input-group" htmlFor="profile_name">
                        <input className="popup__input" type="text" placeholder="Имя" value="" name="name"
                               id="profile_name" required minLength="2" maxLength="40" onChange={handleInputChange}/>
                        <span className="popup__error" id="profile_name-error"/>
                    </label>
                    <label className="popup__input-group" htmlFor="profile_about">
                        <input className="popup__input" type="text" placeholder="Подпись" value="" name="about"
                               id="profile_about" required minLength="2" maxLength="400" onChange={handleInputChange}/>
                        <span className="popup__error" id="profile_about-error"/>
                    </label>
                </fieldset>
            </PopupWithForm>

            {/** Всплывашка добавления новой карточки */}
            <PopupWithForm popupOpen={newPlacePopupOpen} popupType="new-place" popupTitle="Новое место"
                           popupFormName="newPlaceForm"
                           submitButtonText="Создать" onClose={closeAllPopups}>
                <fieldset className="popup__fieldset">
                    <label className="popup__input-group" htmlFor="place_name">
                        <input className="popup__input" type="text" placeholder="Имя" value="" name="name"
                               id="place_name" required minLength="2" maxLength="30" onChange={handleInputChange}/>
                        <span className="popup__error" id="place_name-error"/>
                    </label>
                    <label className="popup__input-group" htmlFor="place_url">
                        <input className="popup__input" type="url" placeholder="Ссылка на место" value="" name="link"
                               id="place_url"
                               required onChange={handleInputChange}/>
                        <span className="popup__error" id="place_url-error"/>
                    </label>
                </fieldset>
            </PopupWithForm>

            {/** Всплывашка просмотра карточки */}
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

            {/** Всплывашка удаления карточки */}
            <PopupWithForm popupOpen={deletePlacePopupOpen} popupType="delete-place" popupTitle="Вы уверены?"
                           submitButtonText="Да" onClose={closeAllPopups}>
            </PopupWithForm>

            {/** Всплывашка редактирования аватара */}
            <PopupWithForm popupOpen={updateAvatarPopupOpen} popupType="update-avatar" popupTitle="Обновить аватар"
                           popupFormName="updateAvatarForm" submitButtonText="Сохранить" onClose={closeAllPopups}>
                <fieldset className="popup__fieldset">
                    <label className="popup__input-group" htmlFor="avatar_url">
                        <input className="popup__input" type="url" placeholder="Ссылка на аватар" value="" name="avatar"
                               id="avatar_url"
                               required onChange={handleInputChange}/>
                        <span className="popup__error" id="avatar_url-error"/>
                    </label>
                </fieldset>
            </PopupWithForm>

        </div>
    );
}

export default App;
