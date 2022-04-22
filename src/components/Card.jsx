import React from 'react';

/** Карточка изображения
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Card = (props) => {

    /** Название карточки, ссылка на изображение, владелец карточки, массив лайков */
    const {name, link, owner, likes} = props.card;

    /** Нажатие на карточку */
    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <li>
            <article className="photo-card">
                {owner._id === props.currentUser._id
                    ? <button className="photo-card__delete button" type="button" aria-label="Удалить место"
                              onClick={props.onDeleteCard}/>
                    : null
                }
                <img className="photo-card__image button" alt={name}
                     src={`${link}`} onClick={handleClick}/>
                <div className="photo-card__footer">
                    <p className="photo-card__title">{name}</p>
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

export default Card
