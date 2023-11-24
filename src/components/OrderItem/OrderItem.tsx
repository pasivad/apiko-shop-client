import React from 'react';

import styles from './OrderItem.module.scss';

interface OrderItemProps {
  title: string;
  picture: string;
  quantity: number;
  orderedPrice: number;
}

export default function OrderItem({ title, picture, quantity, orderedPrice }: OrderItemProps) {
  return (
    <div className={styles.order_item}>
      <div className={styles.order_item_info}>
        <div className={styles.img_background}>
          <img
            className={styles.order_item_img}
            alt="product_img"
            src={picture}
          ></img>
        </div>
        <div className={styles.order_item_options}>
          <div className={styles.order_item_name}>{title}</div>
          <div className={styles.order_item_number}>
            Items:<span>{quantity}</span>
          </div>
        </div>
      </div>
      <div className={styles.order_item_price}>
        <div className={styles.order_item_price_text}>Price:</div>
        <div className={styles.order_item_price_value}>{`$ ${orderedPrice}`}</div>
      </div>
    </div>
  );
}
