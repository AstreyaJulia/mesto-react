import React from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {

    /** Стейт карточки с названием и ссылкой на изображение */
    const [card, setCard] = React.useState({name: '', link: ''});

    React.useEffect(() => {
        setCard({name: '', link: ''});
    }, [props.popupOpen])

    /** Изменяет стейт card */
    function handleCardChange(evt) {
        const {name, value} = evt.target;
        setCard({
            ...card,
            [name]: value
        })
    }

    /** Отправка формы
     * @param evt */
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace(card);
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
            isLoading={props.isLoading}
            loadingText={props.loadingText}
            onOverlayClose={props.onOverlayClose}
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
                        value={card.name ? card.name : ""}
                        name="name"
                        id="place_name"
                        required
                        minLength="2"
                        maxLength="30"
                        onChange={handleCardChange}
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
                        value={card.link ? card.link : ""}
                        name="link"
                        id="place_url"
                        required
                        onChange={handleCardChange}
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
