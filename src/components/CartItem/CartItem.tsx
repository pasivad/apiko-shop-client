import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './CartItem.module.scss';

import icon_bin from '../../images/icon_bin.svg';

import { deleteFromCart, decrementQuantity, incrementQuantity } from '../../redux/slices/cart';

interface CartItemProps {
  id: number;
  title: string;
  picture: string;
  price: number;
  quantity: number;
}

export default function CartItem({ id, title, picture, price, quantity }: CartItemProps) {
  const dispatch = useDispatch();
  const [itemNumber, setItemNumber] = useState<number>(quantity);

  const handleDecrementQuantity = () => {
    setItemNumber(itemNumber - 1);
    dispatch(decrementQuantity(id));
  };
  const handleIncrementQuantity = () => {
    setItemNumber(itemNumber + 1);
    dispatch(incrementQuantity(id));
  };

  return (
    <div className={styles.cart_item}>
      <div className={styles.cart_item_info}>
        <div className={styles.img_background}>
          <img
            className={styles.cart_img}
            alt="product_img"
            src={picture}
          ></img>
        </div>
        <div className={styles.cart_item_options}>
          <div className={styles.cart_item_name}>{title}</div>
          <div className={styles.cart_item_btns}>
            <button
              onClick={() => dispatch(deleteFromCart(id))}
              className={styles.delete_btn}
            >
              <img
                src={icon_bin}
                alt="delete"
              ></img>
            </button>
            <button
              disabled={itemNumber === 1}
              onClick={handleDecrementQuantity}
              className={styles.changevalue_btn__minus}
            ></button>
            <div className={styles.item_value}>{itemNumber}</div>
            <button
              onClick={handleIncrementQuantity}
              className={styles.changevalue_btn__plus}
            ></button>
          </div>
        </div>
      </div>
      <div className={styles.cart_item_price}>
        <div className={styles.cart_item_price_text}>Price:</div>
        <div className={styles.cart_item_price_value}>{`$ ${price * itemNumber}`}</div>
      </div>
    </div>
  );
}
