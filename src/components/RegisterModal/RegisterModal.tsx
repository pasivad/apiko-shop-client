import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../../redux/store';

import { loginModal, registerModal } from '../../redux/slices/modals';
import { fetchRegister } from '../../redux/slices/user';
import { clearCart } from '../../redux/slices/cart';
import { fetchProducts } from '../../redux/slices/products';

import styles from './RegisterModal.module.scss';

import icon_password_eye from '../../images/icon_password_eye.svg';

export default function RegisterModal() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [fullName, setFullName] = useState<string>('');
  const [emptyFullName, setEmptyFullName] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [emptyEmail, setEmptyEmail] = useState<boolean>(false);
  const [validateEmail, setValidateEmail] = useState<boolean>(true);
  const [emailExist, setEmailExist] = useState<boolean>(false);

  const [phone, setPhone] = useState<string>('');
  const [emptyPhone, setEmptyPhone] = useState<boolean>(false);
  const [validatePhone, setValidatePhone] = useState<boolean>(true);

  const [password, setPassword] = useState<string>('');
  const [emptyPassword, setEmptyPassword] = useState<boolean>(false);
  const [validatePassword, setValidatePassword] = useState<boolean>(true);

  const handleRegisterButton = async () => {
    if (
      fullName !== '' &&
      email !== '' &&
      phone !== '' &&
      password !== '' &&
      validateEmail &&
      validatePhone &&
      validatePassword
    ) {
      const data = await dispatch(
        fetchRegister({ fullName: fullName, email: email, password: password, phone: phone })
      );
      if (!data.payload) {
        setEmailExist(true);
        return;
      }
      if ('token' in data.payload) {
        window.localStorage.setItem('token', `Bearer ${data.payload.token}`);
        dispatch(registerModal());
        dispatch(clearCart());
        dispatch(fetchProducts({ page: 1, sort: 'latest' }));
      }
    }
  };

  const handleLogInButton = () => {
    dispatch(registerModal());
    dispatch(loginModal());
  };

  const handleFullNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName((e.target.value = e.target.value.replace(/[^a-zA-Z ]+/, '')));
    e.target.value === '' ? setEmptyFullName(true) : setEmptyFullName(false);
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    e.target.value === '' ? setEmptyEmail(true) : setEmptyEmail(false);
    e.target.value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
      ? setValidateEmail(true)
      : setValidateEmail(false);
    setEmailExist(false);
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    e.target.value === '' ? setEmptyPhone(true) : setEmptyPhone(false);
    e.target.value.length >= 10 && e.target.value.length < 14 ? setValidatePhone(true) : setValidatePhone(false);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    e.target.value === '' ? setEmptyPassword(true) : setEmptyPassword(false);
    e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      ? setValidatePassword(true)
      : setValidatePassword(false);
  };

  return (
    <>
      <div className={styles.modal_window}>
        <button
          onClick={() => dispatch(registerModal())}
          className={styles.modal_close}
        ></button>
        <div className={styles.register_form}>
          <div className={styles.form_name}>Register</div>

          {/* FullName Input */}
          <div className={styles.input_group}>
            <input
              type="text"
              id="fullname"
              className={!emptyFullName ? styles.input : styles.input_error}
              onChange={handleFullNameInput}
              value={fullName}
              autoFocus
              required
            />
            <label className={!emptyFullName ? styles.placeholder : styles.placeholder__error}>Full Name</label>
            <label className={styles.label_error}>{emptyFullName && 'Required info is missing'}</label>
          </div>

          {/* Email Input */}
          <div className={styles.input_group}>
            <input
              type="text"
              id="email"
              className={!emptyEmail && validateEmail && !emailExist ? styles.input : styles.input_error}
              onChange={handleEmailInput}
              required
            />
            <label
              className={!emptyEmail && validateEmail && !emailExist ? styles.placeholder : styles.placeholder__error}
            >
              Email
            </label>
            <label className={styles.label_error}>
              {emailExist
                ? 'Such email is already used'
                : emptyEmail
                ? 'Required info is missing'
                : !validateEmail && 'Incorrect data'}
            </label>
          </div>

          {/* Phone Input */}
          <div className={styles.input_group}>
            <input
              type="number"
              id="phone"
              className={!emptyPhone && validatePhone ? styles.input : styles.input_error}
              onChange={handlePhoneInput}
              value={phone}
              required
            />
            <label className={!emptyPhone && validatePhone ? styles.placeholder : styles.placeholder__error}>
              Phone number
            </label>
            <label className={styles.label_error}>
              {emptyPhone ? 'Required info is missing' : !validatePhone && 'Incorrect data'}
            </label>
          </div>

          {/* Password Input */}
          <div className={styles.input_group}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={!emptyPassword && validatePassword ? styles.input : styles.input_error}
              value={password}
              onChange={handlePasswordInput}
              required
            ></input>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className={styles.password_btn}
            >
              <img
                alt="password_show"
                src={icon_password_eye}
              ></img>
            </button>
            <label className={!emptyPassword && validatePassword ? styles.placeholder : styles.placeholder__error}>
              Password
            </label>
            <label className={styles.label_error}>
              {emptyPassword ? 'Required info is missing' : !validatePassword && 'Incorrect data'}
            </label>
          </div>

          <label className={styles.password_label}>
            The password has to be at least 8 characters, contain at least 1 letter, 1 special symbol, 1 number
          </label>
          <button
            onClick={handleRegisterButton}
            className={styles.register_btn}
          >
            Register
          </button>
        </div>
      </div>
      <div className={styles.modal_window}>
        <div className={styles.login_options}>
          I already have an account,{' '}
          <button
            onClick={handleLogInButton}
            className={styles.login_btn}
          >
            {' '}
            Log In
          </button>
        </div>
      </div>
    </>
  );
}
