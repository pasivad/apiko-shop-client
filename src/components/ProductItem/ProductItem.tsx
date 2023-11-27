import React, { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../redux/store';

import styles from './ProductItem.module.scss';

import { productModal, authModal } from '../../redux/slices/modals';
import { selectIsLogin } from '../../redux/slices/user';
import { addFavorite, deleteFavorite } from '../../redux/slices/products';

interface ProductProps {
  id: number;
  title: string;
  picture: string;
  price: number;
  favorite: boolean;
}

export default function ProductItem({ id, title, picture, price, favorite }: ProductProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsLogin);
  const [heartHover, setHeartHover] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(favorite);

  useEffect(() => {
    setIsFavorite(favorite);
  }, [favorite]);

  const handleLikeButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isAuth) {
      if (isFavorite) {
        dispatch(deleteFavorite(id));
        setIsFavorite(false);
      } else {
        dispatch(addFavorite(id));
        setIsFavorite(true);
      }
    } else {
      dispatch(authModal());
    }
  };

  const handleProductItemBtn = () => {
    navigate(`p/${id}`);
    dispatch(productModal());
  };

  return (
    <div
      onClick={handleProductItemBtn}
      className={styles.item}
    >
      <div className={styles.item_inner}>
        <img
          alt="product"
          className={styles.item_img}
          src={picture}
        ></img>
        <button
          onMouseEnter={() => setHeartHover(true)}
          onMouseLeave={() => setHeartHover(false)}
          onClick={handleLikeButton}
          className={styles.item_like}
        >
          {isFavorite ? (
            <AiFillHeart className={styles.liked} />
          ) : heartHover ? (
            <AiFillHeart className={styles.like__hover} />
          ) : (
            <AiOutlineHeart className={styles.like__hover} />
          )}
        </button>
      </div>
      <div className={styles.item_name}>{title}</div>
      <div className={styles.item_price}>{price} $</div>
    </div>
  );
}
