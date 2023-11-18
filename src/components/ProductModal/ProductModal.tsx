import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './ProductModal.module.scss';

import axios from '../../api/http';
import { productModal } from '../../redux/slices/modals';

interface ProductProps {
  id: number;
  title: string;
  picture: string;
  price: number;
  description: string;
}

export default function ProductModal() {
  const [product, setProduct] = useState<ProductProps>(Object);
  const dispatch = useDispatch();

  const { id } = useParams<string>();

  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data);
    });
  }, []);

  return (
    <>
      <div className={styles.modal_window}>
        <Link
          to="/"
          onClick={() => dispatch(productModal())}
          className={styles.modal_close}
        ></Link>

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
                <button className={styles.changevalue_btn__minus}></button>
                <div className={styles.item_value}>1</div>
                <button className={styles.changevalue_btn__plus}></button>
              </div>
              <div className={styles.product_modal_summary}>
                <div className={styles.product_modal_summary_text}>
                  <div className={styles.summary_text_items}>Items:</div>
                  <div className={styles.summary_text_total}>Total: </div>
                </div>
                <div className={styles.product_modal_summary_value}>
                  <div className={styles.summary_value_items}>1</div>
                  <div className={styles.summary_value_total}>$ 175.19</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.product_modal_btns}>
            <button className={styles.white_btn}>ADD TO CART</button>
            <button className={styles.white_btn}>ADD TO FAVORITES</button>
            <button className={styles.orange_btn}>BUY NOW</button>
          </div>
        </div>
      </div>
    </>
  );
}
