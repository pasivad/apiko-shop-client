import React from 'react';

import styles from './CartItem.module.scss';

import icon_bin from '../../images/icon_bin.svg';
import test from '../../images/test.jpg';

export default function CartItem() {
  return (
    <div className={styles.cart_item}>
      <div className={styles.cart_item_info}>
        <div className={styles.img_background}>
          <img
            className={styles.cart_img}
            alt="product_img"
            src={test}
          ></img>
        </div>
        <div className={styles.cart_item_options}>
          <div className={styles.cart_item_name}>SNEAKERS ZX 1K BOOST</div>
          <div className={styles.cart_item_btns}>
            <button className={styles.delete_btn}>
              <img
                src={icon_bin}
                alt="delete"
              ></img>
            </button>
            <button className={styles.changevalue_btn__minus}></button>
            <div className={styles.item_value}>1</div>
            <button className={styles.changevalue_btn__plus}></button>
          </div>
        </div>
      </div>
      <div className={styles.cart_item_price}>
        <div className={styles.cart_item_price_text}>Price:</div>
        <div className={styles.cart_item_price_value}>$175.19</div>
      </div>
    </div>
  );
}
