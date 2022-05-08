import React from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {

    /** Стейты названия карточки и ссылки на изображение */
    const [cardName, setCardName] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');

    React.useEffect(() => {
        setCardName('');
        setCardLink('');
    }, [props.popupOpen])

    /** Изменяет стейт cardName */
    function handleCardNameChange(evt) {
        setCardName(evt.target.value);
    }

    /** Изменяет стейт cardLink */
    function handleCardLinkChange(evt) {
        setCardLink(evt.target.value);
    }

    /** Отправка формы
     * @param evt */
    function handleSubmit(evt) {
        evt.preventDefault();

        props.onAddPlace({
            name: cardName,
            link: cardLink
        });
    }

    return (
        <PopupWithForm
            popupOpen={props.popupOpen}
            popupType="new-place"
            popupTitle="Новое место"
            popupFormName="newPlaceForm"
            submitButtonText="Создать"
            onClose={props.onClose}
            onSubmit={handleSubmit}
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
                        value={cardName ? cardName : ""}
                        name="name"
                        id="place_name"
                        required
                        minLength="2"
                        maxLength="30"
                        onChange={handleCardNameChange}
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
                        value={cardLink ? cardLink : ""}
                        name="link"
                        id="place_url"
                        required
                        onChange={handleCardLinkChange}
                    />
                    <span
                        className="popup__error"
                        id="place_url-error"
                    />
                </label>
            </fieldset>
        </PopupWithForm>
    );
};
export default AddPlacePopup;
