import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsLogin } from '../../redux/slices/user';
import { clearCart } from '../../redux/slices/cart';

import styles from './CartModal.module.scss';

import { cartModal } from '../../redux/slices/modals';

export default function CartModal() {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsLogin);

  const handleContinueShopBtn = () => {
    dispatch(clearCart());
    dispatch(cartModal());
  };
  const handleOrderHistoryBtn = () => {
    dispatch(clearCart());
    dispatch(cartModal());
  };

  return (
    <>
      <div className={styles.modal_window}>
        <button
          onClick={() => dispatch(cartModal())}
          className={styles.modal_close}
        ></button>
        <div className={styles.cart_modal}>
          <div className={styles.cart_modal_header}>Thank you for your purchase</div>
          <div className={styles.cart_modal_text}>We will send you a notification when your order arrives to you</div>

          <Link
            to="/"
            onClick={handleContinueShopBtn}
            className={styles.back_btn}
          >
            Continue shopping
          </Link>
          {isAuth && (
            <Link
              to="/account/orders"
              onClick={handleOrderHistoryBtn}
              className={styles.order_btn}
            >
              View order history
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
