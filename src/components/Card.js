import React from 'react';

export const Card = (props) => {

    /** Название карточки, ссылка на изображение, владелец карточки, массив лайков */
    const {name, link, owner, likes} = props.card;

    return (
        <li>
            <article className="photo-card">
                {owner._id === props.currentUser._id
                    ? <button className="photo-card__delete button" type="button" aria-label="Удалить место"/>
                    : null
                }
                <img className="photo-card__image button" alt={name}
                     src={`${link}`}/>
                <div className="photo-card__footer">
                    <p className="photo-card__title" >{name}</p>
                    <div className="photo-card__like-container">
                        <button className="photo-card__like-button button" type="button"
                                aria-label="Поставить лайк"/>
                        <p className="photo-card__like-counter">{likes.length}</p>
                    </div>
                </div>
            </article>
        </li>
    )
};
