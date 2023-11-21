import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../../redux/store';

import axios from '../../api/http';
import { loginModal, registerModal } from '../../redux/slices/modals';
import { fetchRegister } from '../../redux/slices/user';

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

  const [phone, setPhone] = useState<string>('');
  const [emptyPhone, setEmptyPhone] = useState<boolean>(false);
  const [validatePhone, setValidatePhone] = useState<boolean>(true);

  const [password, setPassword] = useState<string>('');
  const [emptyPassword, setEmptyPassword] = useState<boolean>(false);
  const [validatePassword, setValidatePassword] = useState<boolean>(true);

  const handleRegisterButton = async () => {
    handleValidation();
    if (
      !emptyFullName &&
      !emptyEmail &&
      !emptyPhone &&
      !emptyPassword &&
      validateEmail &&
      validatePhone &&
      validatePassword
    ) {
      const data = await dispatch(
        fetchRegister({ fullName: fullName, email: email, password: password, phone: phone })
      );

      if ('token' in data.payload) {
        window.localStorage.setItem('token', `Bearer ${data.payload.token}`);
        dispatch(registerModal());
      }
    }
  };

  const handleLogInButton = () => {
    dispatch(registerModal());
    dispatch(loginModal());
  };

  const handleFullNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName((e.target.value = e.target.value.replace(/[^a-zA-Z]+/, '')));
  };
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleValidation = () => {
    fullName === '' ? setEmptyFullName(true) : setEmptyFullName(false);
    email === '' ? setEmptyEmail(true) : setEmptyEmail(false);
    phone === '' ? setEmptyPhone(true) : setEmptyPhone(false);
    password === '' ? setEmptyPassword(true) : setEmptyPassword(false);

    email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
      ? setValidateEmail(true)
      : setValidateEmail(false);
    password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      ? setValidatePassword(true)
      : setValidatePassword(false);
    phone.length > 10 && phone.length < 14 ? setValidatePhone(true) : setValidatePhone(false);
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
              className={!emptyEmail && validateEmail ? styles.input : styles.input_error}
              onChange={handleEmailInput}
              required
            />
            <label className={!emptyEmail && validateEmail ? styles.placeholder : styles.placeholder__error}>
              Email
            </label>
            <label className={styles.label_error}>
              {emptyEmail ? 'Required info is missing' : !validateEmail && 'Incorrect data'}
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
