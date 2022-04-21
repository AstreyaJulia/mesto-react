import React from 'react';

export const PopupWithForm = (props) => {
    return (
        <div className={[props.popupOpen ? "popup popup_opened" : "popup", `popup_${props.popupType}`].join(' ')}>
            <div className="popup__container">
                <button className="popup__close-button button" type="button" aria-label="Закрыть всплывающее окно"/>
                <h2 className="popup__title">{props.popupTitle}</h2>
                <form className="popup__form" name={props.popupFormName} noValidate>
                    {props.children}
                    <button className="popup__submit" type="submit" data-value={props.submitButtonText}>{props.submitButtonText}</button>
                </form>
            </div>
        </div>
    )
};
