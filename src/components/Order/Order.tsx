import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './Order.module.scss';

import { orderModal } from '../../redux/slices/modals';

export default function Order() {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(orderModal())} className={styles.order_item}>
      <div className={styles.order_info}>
        <div className={styles.order_info_about}>
          <div className={styles.order_info_id}>Order ID: </div>
          <div className={styles.order_info_date}>Date: </div>
        </div>
        <div className={styles.order_info_values}>
          <div className={styles.order_info_id}>333333</div>
          <div className={styles.order_info_date}>06.04.2021</div>
        </div>
      </div>
      <div className={styles.order_info_about}>
        Price<span className={styles.order_info_values}>$ 775.19</span>
      </div>
    </button>
  );
}
