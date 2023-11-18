import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

import styles from './ProductItem.module.scss';

import { productModal, authModal } from '../../redux/slices/modals';

interface ProductProps {
  id: number;
  title: string;
  img: string;
  price: number;
}

export default function ProductItem({ id, title, img, price }: ProductProps) {
  const dispatch = useDispatch();

  const [heartHover, setHeartHover] = useState<boolean>(false);

  const handleLikeButton = () => {
    dispatch(productModal());
    dispatch(authModal());
  };

  return (
    <Link
      to={`/p/${id}`}
      onClick={() => dispatch(productModal())}
      className={styles.item}
    >
      <div className={styles.item_inner}>
        <img
          alt="product"
          className={styles.item_img}
          src={img}
        ></img>
        <button
          onMouseEnter={() => setHeartHover(true)}
          onMouseLeave={() => setHeartHover(false)}
          onClick={handleLikeButton}
          className={styles.item_like}
        >
          {heartHover ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
      </div>
      <div className={styles.item_name}>{title}</div>
      <div className={styles.item_price}>{price} $</div>
    </Link>
  );
}
