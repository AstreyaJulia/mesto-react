import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {api} from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";

/**
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    /** Состояние текущего пользователя */
    const [currentUser, setCurrentUser] = useState({});

    /** Состояние массива карточек */
    const [cards, setCards] = useState([]);

    /** Состояние выбранной карточки */
    const [selectedCard, setSelectedCard] = React.useState({
        name: "",
        link: "",
    });

    /** Состояние всплывашки редактирования профиля */
    const [editProfilePopupOpen, setEditProfilePopupOpen] =
        React.useState(false);

    /** Состояние всплывашки добавления карточки */
    const [newPlacePopupOpen, setNewPlacePopupOpen] = React.useState(false);

    /** Состояние всплывашки редактирования аватара */
    const [updateAvatarPopupOpen, setUpdateAvatarPopupOpen] =
        React.useState(false);

    /** Состояние всплывашки удаления карточки */
    const [deletePlacePopupOpen, setDeletePlacePopupOpen] =
        React.useState(false);

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
    // FIXME отключена, удаляет без подтверждения
    function handleDeletePlaceClick() {
        setDeletePlacePopupOpen(true);
    }

    /** Закрывает все всплывашки / сбрасывает состояния */
    function closeAllPopups() {
        setSelectedCard({name: "", link: ""});
        setEditProfilePopupOpen(false);
        setNewPlacePopupOpen(false);
        setUpdateAvatarPopupOpen(false);
        setDeletePlacePopupOpen(false);
    }

    /** Ставит/удаляет лайк
     * @param card - объект карточки */
    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => console.log(err));
    }

    /** Удаляет карточку
     * @param card - объект карточки */
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards.filter((currentCard) => currentCard !== card));
            })
            .catch((err) => console.log(err));
    }

    /** Отправка данных пользователя, обновление стейта currentUser
     * @param inputValues - введенные значения */
    function handleUpdateUser(inputValues) {
        api.sendUserInfo(inputValues)
            .then((userInfo) => {
                setCurrentUser(userInfo);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    /** Заглушка, чтоб реакт не сыпал ошибки в консоли */
    // FIXME не забыть удалить
    function handleInputChange(evt) {
        console.log(evt);
    }

    /** Получаем данные залогиненного пользователя, пишем в состояние currentUser */
    useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => console.log(err));
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
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <Header/>
                <Main
                    cards={cards}
                    onCardClick={handleCardClick} // нажатие на карточку
                    onEditProfile={handleEditProfileClick} // редактирование профиля
                    onNewPlace={handleNewPlaceClick} // добавление карточки
                    onUpdateAvatar={handleUpdateAvatarClick} // редактирование аватара
                    onCardDelete={handleCardDelete} // удаление карточки
                    onCardLike={handleCardLike} // лайк/дизлайк
                />
                <Footer/>

                {/** Всплывашка редактирования профиля */}
                <EditProfilePopup
                    isOpen={editProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                {/** Всплывашка добавления новой карточки */}
                <PopupWithForm
                    popupOpen={newPlacePopupOpen}
                    popupType="new-place"
                    popupTitle="Новое место"
                    popupFormName="newPlaceForm"
                    submitButtonText="Создать"
                    onClose={closeAllPopups}
                >
                    <fieldset className="popup__fieldset">
                        <label
                            className="popup__input-group"
                            htmlFor="place_name"
                        >
                            <input
                                className="popup__input"
                                type="text"
                                placeholder="Имя"
                                value=""
                                name="name"
                                id="place_name"
                                required
                                minLength="2"
                                maxLength="30"
                                onChange={handleInputChange}
                            />
                            <span
                                className="popup__error"
                                id="place_name-error"
                            />
                        </label>
                        <label
                            className="popup__input-group"
                            htmlFor="place_url"
                        >
                            <input
                                className="popup__input"
                                type="url"
                                placeholder="Ссылка на место"
                                value=""
                                name="link"
                                id="place_url"
                                required
                                onChange={handleInputChange}
                            />
                            <span
                                className="popup__error"
                                id="place_url-error"
                            />
                        </label>
                    </fieldset>
                </PopupWithForm>
                {/** Всплывашка просмотра карточки */}
                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
                {/** Всплывашка удаления карточки */}
                <PopupWithForm
                    popupOpen={deletePlacePopupOpen}
                    popupType="delete-place"
                    popupTitle="Вы уверены?"
                    submitButtonText="Да"
                    onClose={closeAllPopups}
                />
                {/** Всплывашка редактирования аватара */}
                <PopupWithForm
                    popupOpen={updateAvatarPopupOpen}
                    popupType="update-avatar"
                    popupTitle="Обновить аватар"
                    popupFormName="updateAvatarForm"
                    submitButtonText="Сохранить"
                    onClose={closeAllPopups}
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
                                onChange={handleInputChange}
                            />
                            <span
                                className="popup__error"
                                id="avatar_url-error"
                            />
                        </label>
                    </fieldset>
                </PopupWithForm>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
