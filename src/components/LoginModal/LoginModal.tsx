import React from 'react';
import { useDispatch } from 'react-redux';

import { loginModal, registerModal } from '../../redux/slices/modals';

import styles from './LoginModal.module.scss';

import icon_password_eye from '../../images/icon_password_eye.svg';

export default function LoginModal() {
  const dispatch = useDispatch();

  const handleRegisterButton = () => {
    dispatch(loginModal());
    dispatch(registerModal());
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
              className={styles.input}
              autoFocus
              required
            />
            <label className={styles.placeholder}>Email</label>
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
          <button className={styles.login_btn}>Login</button>
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
