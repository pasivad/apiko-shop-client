import React from 'react';

import styles from './OrdersHistory.module.scss';

import Order from '../Order/Order';

export default function OrdersHistory() {
  return (
    <div className={styles.ordhist_container}>
      {Array.from(Array(2).keys()).map((el) => (
        <Order key={el} />
      ))}
    </div>
  );
}
