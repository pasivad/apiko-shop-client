import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import type { AppDispatch } from '../../redux/store';

import styles from './ProductModal.module.scss';

import axios from '../../api/http';
import { authModal, productModal } from '../../redux/slices/modals';
import { addToCart } from '../../redux/slices/cart';
import { addFavorite, deleteFavorite } from '../../redux/slices/products';
import { selectIsLogin } from '../../redux/slices/user';

interface ProductProps {
  id: number;
  title: string;
  picture: string;
  price: number;
  description: string;
  favorite: boolean;
  quantity: number;
}

export default function ProductModal() {
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<ProductProps>(Object);
  const [itemsNumber, setItemsNumber] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(product.favorite);

  const isAuth = useSelector(selectIsLogin)
  const { id } = useParams<string>();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct({ ...data, quantity: itemsNumber });
      setIsFavorite(data.favorite);
    });
  }, []);

  const handleAddToCartBtn = () => {
    dispatch(addToCart(product));
    addProductToCart();
  };

  const handleBuyNowBtn = () => {
    dispatch(addToCart(product));
    dispatch(productModal());
  };

  const handleItemNumberChange = () => {
    setItemsNumber(itemsNumber + 1);
    setProduct({
      ...product,
      quantity: itemsNumber + 1,
    });
  };

  const handleLikeBtn = () => {
    if (isAuth) {
      if (isFavorite) {
        dispatch(deleteFavorite(product.id));
        setIsFavorite(false);
      } else {
        dispatch(addFavorite(product.id));
        setIsFavorite(true);
      }
    } else {
      dispatch(productModal())
      dispatch(authModal());
      navigate(-1)
    }
  };

  const handleCloseBtn = () => {
    navigate(-1);
    dispatch(productModal());
  };

  const addProductToCart = () => toast(`The ${product.title} is successfully added to cart`);

  return (
    <>
      <div className={styles.modal_window}>
        <button
          onClick={handleCloseBtn}
          className={styles.modal_close}
        ></button>

        <div className={styles.product_modal}>
          <div className={styles.product_modal_inner}>
            <div className={styles.product_modal_img_background}>
              <img
                alt="product_img"
                src={product.picture}
                className={styles.product_modal_img}
              ></img>
            </div>
            <div className={styles.product_modal_info}>
              <div className={styles.product_modal_name}>{product.title}</div>
              <div className={styles.product_modal_about}>{product.description}</div>
              <div className={styles.product_modal_price}>
                Price
                <div className={styles.product_modal_price_value}>${product.price}</div>
              </div>
              <div className={styles.product_value_change_btns}>
                <button
                  disabled={itemsNumber === 1}
                  onClick={() => setItemsNumber(itemsNumber - 1)}
                  className={styles.changevalue_btn__minus}
                ></button>
                <div className={styles.item_value}>{itemsNumber}</div>
                <button
                  onClick={handleItemNumberChange}
                  className={styles.changevalue_btn__plus}
                ></button>
              </div>
              <div className={styles.product_modal_summary}>
                <div className={styles.product_modal_summary_text}>
                  <div className={styles.summary_text_items}>Items:</div>
                  <div className={styles.summary_text_total}>Total: </div>
                </div>
                <div className={styles.product_modal_summary_value}>
                  <div className={styles.summary_value_items}>{itemsNumber}</div>
                  <div className={styles.summary_value_total}>{`${itemsNumber * product.price} $`}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.product_modal_btns}>
            <button
              onClick={handleAddToCartBtn}
              className={styles.white_btn}
            >
              ADD TO CART
            </button>
            {isFavorite ? (
              <button
                onClick={handleLikeBtn}
                className={styles.orange_btn}
              >
                ADDED TO FAVORITES ✓
              </button>
            ) : (
              <button
                onClick={handleLikeBtn}
                className={styles.white_btn}
              >
                ADD TO FAVORITES
              </button>
            )}

            <Link
              to="/cart"
              onClick={handleBuyNowBtn}
              className={styles.orange_btn}
            >
              BUY NOW
            </Link>
          </div>
        </div>
        <ToastContainer
          className={styles.Toastify__toast__container}
          autoClose={3000}
        />
      </div>
    </>
  );
}
