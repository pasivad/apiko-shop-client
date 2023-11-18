import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './CartModal.module.scss';

import { cartModal } from '../../redux/slices/modals';

export default function CartModal() {
  const dispatch = useDispatch();

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
            onClick={() => dispatch(cartModal())}
            className={styles.back_btn}
          >
            Continue shopping
          </Link>
          <Link
            to="/account"
            onClick={() => dispatch(cartModal())}
            className={styles.order_btn}
          >
            View order history
          </Link>
        </div>
      </div>
    </>
  );
}
