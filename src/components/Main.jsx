import React, {useEffect, useState} from 'react';
import Card from "./Card";
import {api} from "../utils/api";

/** Основной контейнер с содержимым страницы
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Main = (props) => {

    /** Состояние текущего пользователя */
    const [currentUser, setCurrentUser] = useState({});

    /** Состояние массива карточек */
    const [cards, setCards] = useState([]);

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


    /** Имя пользователя, подпись пользователя и аватар */
    const {name, about, avatar} = currentUser;

    return (
        <main className="content">
            <section className="profile">
                <button className="profile__edit-avatar-button button" aria-label="Редактировать аватар"
                        onClick={props.onUpdateAvatar}/>
                <img src={avatar} alt={name}
                     className="profile__avatar"/>
                <div className="profile__title-group">
                    <h1 className="profile__title">{name}</h1>
                    <button className="profile__button button" type="button"
                            aria-label="Редактировать профиль" onClick={props.onEditProfile}/>
                    <p className="profile__about">{about}</p>
                </div>
                <button className="profile__add-button button" type="button" aria-label="Добавить место"
                        onClick={props.onNewPlace}/>
            </section>
            <section className="gallery">
                <ul className="photo-cards">
                    {cards
                        ? Array.from(cards).map((card) => {
                            return (<Card card={card}
                                          key={card._id}
                                          currentUser={currentUser} // id залогиненного пользователя из состояния currentUser
                                          onCardClick={props.onCardClick} // нажатие на карточку
                                          onDeleteCard={props.onDeleteCard}
                            />)
                        })
                        : null}
                </ul>
            </section>
        </main>
    )
};

export default Main
