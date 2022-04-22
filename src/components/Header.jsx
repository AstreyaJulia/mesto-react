import React from 'react';
import header__logo from '../images/header__logo.png';

export const Header = () => {
  return (
    <header className="header">
      <a className="header__link" href="/" title="Mesto Russia">
        <img className="header__logo" src={header__logo} alt="Логотип Место"/>
      </a>
    </header>
  )
};
