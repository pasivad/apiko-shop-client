import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../redux/store';

import styles from './Cart.module.scss';

import { cartModal } from '../../redux/slices/modals';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CartItem from '../../components/CartItem/CartItem';
import Modal from '../../components/Modal/Modal';
import CartModal from '../../components/CartModal/CartModal';

export default function Cart() {
  const dispatch = useDispatch();
  const modals = useSelector((state: RootState) => state.modals);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [country, setCountry] = useState<string>('');

  const handleDropdownClick = (e: React.MouseEvent) => {
    setCountry(e.currentTarget.ariaValueText!);
    setIsOpen(false);
  };


  return (
    <>
      <Header />
      {modals.cartModal && (
        <Modal>
          <CartModal />
        </Modal>
      )}
      <div className={styles.cart_container}>
        <div className={styles.inner_container}>
          <div className={styles.cart_title}>My cart</div>
          <div className={styles.cart_inner}>
            <div className={styles.cart_list}>
              {Array.from(Array(3).keys()).map((el) => (
                <CartItem key={el} />
              ))}
            </div>
            <div className={styles.cart_form}>
              <div className={styles.input_group}>
                <input
                  type="text"
                  id="fullname"
                  className={styles.input}
                  autoFocus
                  required
                />
                <label className={styles.placeholder}>Full Name</label>
              </div>
              <div className={styles.input_group}>
                <input
                  type="text"
                  id="phone"
                  className={styles.input}
                  required
                />
                <label className={styles.placeholder}>Phone</label>
              </div>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className={styles.input_group}
              >
                <div
                  id="country"
                  className={isOpen ? styles.input_country__active : styles.input_country}
                >
                  {country}
                </div>
                <button className={styles.dropdown_btn}></button>
                {isOpen && (
                  <div className={styles.dropdown}>
                    <div
                      onClick={handleDropdownClick}
                      className={styles.dropdown_item}
                      aria-valuetext="1"
                    >
                      1
                    </div>
                    <div
                      onClick={handleDropdownClick}
                      className={styles.dropdown_item}
                      aria-valuetext="2"
                    >
                      2
                    </div>
                    <div
                      onClick={handleDropdownClick}
                      className={styles.dropdown_item}
                      aria-valuetext="3"
                    >
                      3
                    </div>
                  </div>
                )}
                <label className={country ? styles.placeholder__active : styles.placeholder}>Country</label>
              </div>
              <div className={styles.input_group}>
                <input
                  type="text"
                  id="city"
                  className={styles.input}
                  required
                />
                <label className={styles.placeholder}>City</label>
              </div>
              <div className={styles.input_group}>
                <input
                  type="text"
                  id="address"
                  className={styles.input}
                  required
                />
                <label className={styles.placeholder}>Address</label>
              </div>
              <div className={styles.cart_form_info}>
                <div className={styles.cart_form_info_text}>
                  <div>Items</div>
                  <div>Total</div>
                </div>
                <div className={styles.cart_form_info_values}>
                  <div>3</div>
                  <div>$ 575.19</div>
                </div>
              </div>
              <button onClick={() => dispatch(cartModal())} className={styles.confirm_btn}>Confirms the purchase</button>
              <Link
                to="/"
                className={styles.continueshop_btn}
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
