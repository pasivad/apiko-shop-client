import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../redux/store';

import { selectIsLogin } from '../../redux/slices/user';
import { authModal, loginModal, registerModal } from '../../redux/slices/modals';

import styles from './Header.module.scss';

import logo from '../../images/logo.svg';
import icon_heart from '../../images/icon_heart.svg';
import icon_basket from '../../images/icon_basket.svg';
import HeaderAccount from '../HeaderAccount/HeaderAccount';

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.cart);

  const isAuth = useSelector(selectIsLogin);

  return (
    <div className={styles.header}>
      <a href="/">
        <img
          src={logo}
          alt="logo"
        ></img>
      </a>
      <div className={styles.header_options}>
        {isAuth ? (
          <Link
            to="/account/favourites"
            className={styles.options_icons}
          >
            <img
              alt="favorites"
              src={icon_heart}
              className={styles.options_icons_img}
            ></img>
          </Link>
        ) : (
          <button
            onClick={() => dispatch(authModal())}
            className={styles.options_icons}
          >
            <img
              alt="favorites"
              src={icon_heart}
              className={styles.options_icons_img}
            ></img>
          </button>
        )}
        <Link
          to="/cart"
          className={styles.options_icons}
        >
          <img
            alt="cart"
            src={icon_basket}
            className={styles.options_icons_img}
          ></img>
          {cart.length !== 0 && (
            <div className={styles.cart_number}>
              {cart.reduce((acc, item) => {
                return acc + item.quantity;
              }, 0)}
            </div>
          )}
        </Link>
        {isAuth ? (
          <HeaderAccount />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
