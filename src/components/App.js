import React, {useEffect, useState} from 'react';
import {Header} from "./Header";
import {Footer} from "./Footer";
import {Main} from "./Main";
import {api} from '../utils/api.js';

/**
 * @returns {JSX.Element}
 * @constructor
 */
function App() {

    /** Состояние currentUser текущего пользователя */
    const [currentUser, setCurrentUser] = useState({});

    /** Состояние cards массива карточек */
    const [cards, setCards] = useState({});

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

    return (
        <div className="App">
            <Header/>
            <Main
                currentUser={currentUser} // id залогиненного пользователя
                cards={cards} // массив карточек
            />
            <Footer/>
        </div>
    );
}

export default App;
