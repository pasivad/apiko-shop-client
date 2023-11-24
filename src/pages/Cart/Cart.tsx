import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../redux/store';

import axios from '../../api/http';
import { cartModal } from '../../redux/slices/modals';

import styles from './Cart.module.scss';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CartItem from '../../components/CartItem/CartItem';

import Modal from '../../components/Modal/Modal';
import CartModal from '../../components/CartModal/CartModal';
import RegisterModal from '../../components/RegisterModal/RegisterModal';
import LoginModal from '../../components/LoginModal/LoginModal';
import AuthModal from '../../components/AuthModal/AuthModal';

interface UserProps {
  data: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    address: string;
  } | null;
  status: string;
}

interface Orders {
  productId: number;
  quantity: number;
}

export default function Cart() {
  const dispatch = useDispatch();
  const modals = useSelector((state: RootState) => state.modals);
  const user: UserProps = useSelector((state: RootState) => state.user);
  const { cart } = useSelector((state: RootState) => state.cart);

  const [countriesArray, setCountriesArray] = useState<Array<string>>([]);

  useEffect(() => {
    axios.get('/locations/countries').then(({ data }) => setCountriesArray(data));
  }, []);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [newFullName, setNewFullName] = useState<string>(user.data?.fullName!);

  const [newPhone, setNewPhone] = useState<string>(user.data?.phone!);

  const [newCountry, setNewCountry] = useState<string>(user.data?.country!);

  const [newCity, setNewCity] = useState<string | undefined>(user.data?.city);

  const [newAddress, setNewAddress] = useState<string | undefined>(user.data?.address);

  const handleFullNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFullName((e.target.value = e.target.value.replace(/[^a-zA-Z ]+/, '')));
  };
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPhone(e.target.value);
  };
  const handleCityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCity(e.target.value);
  };
  const handleAddressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress(e.target.value);
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    setNewCountry(e.currentTarget.ariaValueText!);
    setIsOpen(false);
  };

  const handleConfirmBtn = () => {
    axios
      .post('/orders', order)
      .then(() => {
        dispatch(cartModal());
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const isLoaded = user.status === 'loaded';

  const order = {
    items: cart.reduce((acc: Array<Orders>, item) => {
      acc.push({ productId: item.id, quantity: item.quantity });
      return acc;
    }, []),
    shipment: {
      fullName: newFullName,
      phone: newPhone,
      country: newCountry,
      city: newCity,
      address: newAddress,
    },
  };

  return (
    <>
      <Header />
      {modals.cartModal && (
        <Modal>
          <CartModal />
        </Modal>
      )}
      {modals.registerModal && (
        <Modal>
          <RegisterModal />
        </Modal>
      )}
      {modals.loginModal && (
        <Modal>
          <LoginModal />
        </Modal>
      )}
      {modals.authModal && (
        <Modal>
          <AuthModal />
        </Modal>
      )}
      <div className={styles.cart_container}>
        <div className={styles.inner_container}>
          <div className={styles.cart_title}>My cart</div>
          <div className={styles.cart_inner}>
            {cart.length ? (
              <div className={styles.cart_list}>
                {cart.map((item, index) => (
                  <CartItem
                    key={index}
                    id={item.id}
                    title={item.title}
                    picture={item.picture}
                    price={item.price}
                    quantity={item.quantity}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.empty_cart_list}>There are no items in a cart</div>
            )}

            <div className={styles.cart_form}>
              <div className={styles.input_group}>
                <input
                  type="text"
                  id="fullname"
                  className={styles.input}
                  autoFocus
                  required
                  value={isLoaded ? newFullName : ''}
                  onChange={handleFullNameInput}
                />
                <label className={styles.placeholder}>Full Name</label>
              </div>

              <div className={styles.input_group}>
                <input
                  type="number"
                  id="phone"
                  className={styles.input}
                  required
                  value={isLoaded ? newPhone : ''}
                  onChange={handlePhoneInput}
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
                  {isLoaded ? newCountry : ''}
                </div>
                <button className={styles.dropdown_btn}></button>
                {isOpen && (
                  <div className={styles.dropdown}>
                    {countriesArray.map((el, index) => (
                      <div
                        key={index}
                        onClick={handleDropdownClick}
                        className={styles.dropdown_item}
                        aria-valuetext={el}
                      >
                        {el}
                      </div>
                    ))}
                  </div>
                )}
                <label className={user.data?.country ? styles.placeholder__active : styles.placeholder}>Country</label>
              </div>
              <div className={styles.input_group}>
                <input
                  type="text"
                  id="city"
                  className={styles.input}
                  required
                  value={isLoaded ? newCity : ''}
                  onChange={handleCityInput}
                />
                <label className={styles.placeholder}>City</label>
              </div>
              <div className={styles.input_group}>
                <input
                  type="text"
                  id="address"
                  className={styles.input}
                  required
                  value={isLoaded ? newAddress : ''}
                  onChange={handleAddressInput}
                />
                <label className={styles.placeholder}>Address</label>
              </div>

              <div className={styles.cart_form_info}>
                <div className={styles.cart_form_info_text}>
                  <div>Items</div>
                  <div>Total</div>
                </div>
                <div className={styles.cart_form_info_values}>
                  <div>
                    {cart.reduce((acc, item) => {
                      return acc + item.quantity;
                    }, 0)}
                  </div>
                  <div>
                    {'$ '}
                    {cart.reduce((acc, item) => {
                      return acc + item.price * item.quantity;
                    }, 0)}
                  </div>
                </div>
              </div>
              <button
                onClick={handleConfirmBtn}
                disabled={
                  newFullName === '' || newPhone === '' || newCountry === '' || newCity === '' || newAddress === '' || !cart.length
                    ? true
                    : false
                }
                className={styles.confirm_btn}
              >
                Confirms the purchase
              </button>
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
