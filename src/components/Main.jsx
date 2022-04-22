import React from 'react';
import {Card} from "./Card";

/** Основной контейнер с содержимым страницы
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const Main = (props) => {

    /** Имя пользователя, подпись пользователя и аватар */
    const {name, about, avatar} = props.currentUser;

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
                    {props.cards
                        ? Array.from(props.cards).map((card) => {
                            return (<Card card={card}
                                          key={card._id}
                                          currentUser={props.currentUser} // id залогиненного пользователя из состояния currentUser
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
