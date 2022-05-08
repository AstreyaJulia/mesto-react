import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
//import PopupWithForm from "./PopupWithForm"; // FIXME не забыть удалить
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {api} from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

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
    /*const [deletePlacePopupOpen, setDeletePlacePopupOpen] =
        React.useState(false);*/ // FIXME не забыть включить

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
    //function handleDeletePlaceClick() {
    //    setDeletePlacePopupOpen(true);
    //}

    /** Закрывает все всплывашки / сбрасывает состояния */
    function closeAllPopups() {
        setSelectedCard({name: "", link: ""});
        setEditProfilePopupOpen(false);
        setNewPlacePopupOpen(false);
        setUpdateAvatarPopupOpen(false);
        //setDeletePlacePopupOpen(false); // FIXME не забыть включить
    }

    /** Ставит/удаляет лайк
     * @param card - объект карточки */
    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
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
        api.sendUserInfo(inputValues.name, inputValues.about)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    /** Обновление аватара, обновление стейта currentUser
     * @param avatar - аватар */
    function handleUpdateAvatar(avatar) {
        api.updateAvatar(avatar.avatar)
            .then((avatar) => {
                setCurrentUser(avatar);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    /** Добавление карточки, обновление стейта cards
     * @param inputValues - введенные значения */
    function handleAddPlaceSubmit(inputValues) {
        api.sendCard(inputValues.name, inputValues.link)
            .then((data) => {
                setCards([data, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
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
                    onDeleteCard={handleCardDelete} // удаление карточки
                    onCardLike={handleCardLike} // лайк/дизлайк
                />
                <Footer/>

                {/** Всплывашка редактирования профиля */}
                <EditProfilePopup
                    popupOpen={editProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                {/** Всплывашка добавления новой карточки */}
                <AddPlacePopup
                    popupOpen={newPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}>
                </AddPlacePopup>
                {/** Всплывашка просмотра карточки */}
                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
                {/** Всплывашка удаления карточки */}
                {/*<PopupWithForm
                    popupOpen={deletePlacePopupOpen}
                    popupType="delete-place"
                    popupTitle="Вы уверены?"
                    submitButtonText="Да"
                    onClose={closeAllPopups}
                /> */}
                {/** Всплывашка редактирования аватара */}
                <EditAvatarPopup
                    popupOpen={updateAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}>
                </EditAvatarPopup>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
