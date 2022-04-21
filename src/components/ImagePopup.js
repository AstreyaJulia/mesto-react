import React from 'react';

/** Всплывашка с изображением
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const ImagePopup = (props) => {

    /** Название карточки, ссылка на изображение */
    const {name, link} = props.card;

    return (
        <div className={link !== '' ? "popup popup_opened popup_view_image" : "popup popup_view_image"}>
            <div className="popup__container popup__container_image-view">
                <button className="popup__close-button button" type="button"
                        aria-label="Закрыть всплывающее окно"/>
                <figure className="popup__figure">
                    <img className="popup__image" src={link}
                         alt={name}/>
                    <figcaption className="popup__caption">{name}</figcaption>
                </figure>
            </div>
        </div>
    )
};
