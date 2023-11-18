import React from 'react';
import { useDispatch } from 'react-redux';

import { loginModal, registerModal } from '../../redux/slices/modals';

import styles from './RegisterModal.module.scss';

import icon_password_eye from '../../images/icon_password_eye.svg';

export default function RegisterModal() {
  const dispatch = useDispatch();

  const handleLogInButton = () => {
    dispatch(registerModal());
    dispatch(loginModal());
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
              id="email"
              className={styles.input}
              required
            />
            <label className={styles.placeholder}>Email</label>
          </div>
          <div className={styles.input_group}>
            <input
              type="text"
              id="phone"
              className={styles.input}
              required
            />
            <label className={styles.placeholder}>Phone number</label>
          </div>
          <div className={styles.input_group}>
            <input
              type="text"
              id="password"
              className={styles.input}
              required
            ></input>
            <button className={styles.password_btn}>
              <img
                alt="password_show"
                src={icon_password_eye}
              ></img>
            </button>
            <label className={styles.placeholder}>Password</label>
          </div>
          <label className={styles.password_label}>
            The password has to be at least at least 1 letter, 1 special symbol, 1 number
          </label>
          <button className={styles.register_btn}>Register</button>
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
