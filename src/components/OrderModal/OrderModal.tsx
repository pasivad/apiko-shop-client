import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './OrderModal.module.scss';

import { orderModal } from '../../redux/slices/modals';

import OrderItem from '../OrderItem/OrderItem';

export default function OrderModal() {
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.modal_window}>
        <button
          onClick={() => dispatch(orderModal())}
          className={styles.modal_close}
        ></button>
        <div className={styles.order_modal}>
          <div className={styles.order_modal_header}>Order details ID 333333</div>
          <div className={styles.order_modal_product_list}>
            <OrderItem />
            <OrderItem />
            <OrderItem />
          </div>
          <div className={styles.order_modal_footer}>
            <div className={styles.order_modal_footer_block}>
              <div className={styles.order_modal_footer_info}>
                <div className={styles.order_modal_footer_text}>Date:</div>
                <div className={styles.order_modal_footer_text}>Address:</div>
              </div>
              <div className={styles.order_modal_footer_info}>
                <div className={styles.order_modal_footer_value}>05/10/2021</div>
                <div className={styles.order_modal_footer_value}>13 Street, Kyiv, Ukraine</div>
              </div>
            </div>
            <div className={styles.order_modal_footer_block}>
              <div className={styles.order_modal_footer_info}>
                <div className={styles.order_modal_footer_text}>Items:</div>
                <div className={styles.order_modal_footer_text}>Total:</div>
              </div>
              <div className={styles.order_modal_footer_info}>
                <div className={styles.order_modal_footer_value}>4</div>
                <div className={styles.order_modal_footer_value}>$ 775.19</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
