import React from 'react';

import styles from './OrderItem.module.scss';

import test from '../../images/test.jpg';

export default function OrderItem() {
  return (
    <div className={styles.order_item}>
      <div className={styles.order_item_info}>
        <div className={styles.img_background}>
          <img
            className={styles.order_item_img}
            alt="product_img"
            src={test}
          ></img>
        </div>
        <div className={styles.order_item_options}>
          <div className={styles.order_item_name}>SNEAKERS ZX 1K BOOST</div>
          <div className={styles.order_item_number}>
            Items:<span>1</span>
          </div>
        </div>
      </div>
      <div className={styles.order_item_price}>
        <div className={styles.order_item_price_text}>Price:</div>
        <div className={styles.order_item_price_value}>$175.19</div>
      </div>
    </div>
  );
}
