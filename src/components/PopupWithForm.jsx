import React from "react";

/** Всплывашка с формой
 * @param props:
 * popupOpen - всплывашка открыта/закрыта, popupType - класс для разных всплывашек,
 * popupTitle - заголовок всплывашки, popupFormName - name формы,
 * children - содержимое формы всплывашки, submitButtonText - текст на кнопке отправки формы,
 * onSubmit - ф-я на отправку формы
 * @returns {JSX.Element}
 * @constructor
 */
const PopupWithForm = (props) => {
    return (
        <div
            className={[
                props.popupOpen ? "popup popup_opened" : "popup",
                `popup_${props.popupType}`,
            ].join(" ")}
        >
            <div
                className={[
                    "popup__container",
                    `popup__container_${props.popupType}`,
                ].join(" ")}
            >
                <button
                    className="popup__close-button button"
                    type="button"
                    aria-label="Закрыть всплывающее окно"
                    onClick={props.onClose}
                />
                <h2 className="popup__title">{props.popupTitle}</h2>
                <form
                    className={[
                        "popup__form",
                        `popup__form_${props.popupType}`,
                    ].join(" ")}
                    name={props.popupFormName}
                    onSubmit={props.onSubmit}
                >
                    {props.children}
                    <button
                        className={[
                            "popup__submit",
                            `popup__submit_${props.popupType}`,
                        ].join(" ")}
                        type="submit"
                        data-value={props.submitButtonText}
                    >
                        {props.submitButtonText}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;
