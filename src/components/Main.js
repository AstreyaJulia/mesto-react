import React from 'react';
import profile__avatar from '../images/avatars/profile__avatar.jpg';

export const Main = () => {
    return (
        <main className="content">
            <section className="profile">
                <button className="profile__edit-avatar-button button" aria-label="Редактировать аватар" />
                <img src={profile__avatar} alt="Подпись"
                     className="profile__avatar" />
                    <div className="profile__title-group">
                        <h1 className="profile__title">Имя пользователя</h1>
                        <button className="profile__button button" type="button"
                                aria-label="Редактировать профиль" />
                        <p className="profile__about">Подпись пользователя</p>
                    </div>
                    <button className="profile__add-button button" type="button" aria-label="Добавить место" />
            </section>
            <section className="gallery">
                <ul className="photo-cards">
                </ul>
            </section>
        </main>
)
};
