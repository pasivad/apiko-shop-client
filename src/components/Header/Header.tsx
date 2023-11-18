import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { loginModal, registerModal } from '../../redux/slices/modals';

import styles from './Header.module.scss';

import logo from '../../images/logo.svg';
import icon_heart from '../../images/icon_heart.svg';
import icon_basket from '../../images/icon_basket.svg';

export default function Header() {
  const dispatch = useDispatch();

  return (
    <div className={styles.header}>
      <Link to="/">
        <img
          src={logo}
          alt="logo"
        ></img>
      </Link>
      <div>
        <button className={styles.options_icons}>
          <img
            alt="favorites"
            src={icon_heart}
            className={styles.options_icons_img}
          ></img>
        </button>
        <Link
          to="/cart"
          className={styles.options_icons}
        >
          <img
            alt="cart"
            src={icon_basket}
            className={styles.options_icons_img}
          ></img>
        </Link>
        <button
          onClick={() => dispatch(registerModal())}
          className={styles.auth_btn__register}
        >
          Register
        </button>
        <button
          onClick={() => dispatch(loginModal())}
          className={styles.auth_btn__login}
        >
          Log in
        </button>
      </div>
    </div>
  );
}
