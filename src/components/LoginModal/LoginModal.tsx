import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../../redux/store';

import { fetchLogin, fetchUser } from '../../redux/slices/user';
import { loginModal, registerModal } from '../../redux/slices/modals';

import styles from './LoginModal.module.scss';

import icon_password_eye from '../../images/icon_password_eye.svg';

export default function LoginModal() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [emptyEmail, setEmptyEmail] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [emptyPassword, setEmptyPassword] = useState<boolean>(false);
  const [validateData, setValidateData] = useState<boolean>(true);

  const handleLogInButton = async () => {
    if (email !== '' && password !== '') {
      const data = await dispatch(fetchLogin({ email: email, password: password }));
      if (!data.payload) {
        setValidateData(false);
        return;
      }
      if ('token' in data.payload) {
        window.localStorage.setItem('token', `Bearer ${data.payload.token}`);
        dispatch(loginModal());
        dispatch(fetchUser())
      }
    } else {
      setEmptyEmail(true);
      setEmptyPassword(true);
    }
  };

  const handleRegisterButton = () => {
    dispatch(loginModal());
    dispatch(registerModal());
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    e.target.value === '' ? setEmptyEmail(true) : setEmptyEmail(false);
    setValidateData(true);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    e.target.value === '' ? setEmptyPassword(true) : setEmptyPassword(false);
    setValidateData(true);
  };

  return (
    <>
      <div className={styles.modal_window}>
        <button
          onClick={() => dispatch(loginModal())}
          className={styles.modal_close}
        ></button>
        <div className={styles.login_form}>
          <div className={styles.form_name}>Login</div>

          <div className={styles.input_group}>
            <input
              type="text"
              id="email"
              onChange={handleEmailInput}
              value={email}
              className={!emptyEmail && validateData ? styles.input : styles.input_error}
              autoFocus
              required
            />
            <label className={!emptyEmail && validateData ? styles.placeholder : styles.placeholder__error}>
              Email
            </label>
            <label className={styles.label_error}>{emptyEmail && 'Required info is missing'}</label>
          </div>
          <div className={styles.input_group}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              onChange={handlePasswordInput}
              value={password}
              className={!emptyPassword && validateData ? styles.input : styles.input_error}
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
            <label className={!emptyPassword && validateData ? styles.placeholder : styles.placeholder__error}>
              Password
            </label>
            <label className={styles.label_error}>{emptyPassword && 'Required info is missing'}</label>
            <label className={styles.data_error}>{!validateData && 'Email or password incorrect'}</label>
          </div>
          <button
            className={styles.login_btn}
            onClick={handleLogInButton}
          >
            Login
          </button>
        </div>
      </div>
      <div className={styles.modal_window}>
        <div className={styles.register_options}>
          I have no account,
          <button
            onClick={handleRegisterButton}
            className={styles.register_btn}
          >
            Register now
          </button>
        </div>
      </div>
    </>
  );
}
