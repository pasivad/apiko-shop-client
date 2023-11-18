import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './AuthModal.module.scss';

import { loginModal, registerModal, authModal } from '../../redux/slices/modals';

export default function AuthModal() {
  const dispatch = useDispatch();

  const handleLoginButton = () => {
    dispatch(authModal());
    dispatch(loginModal());
  };

  const handleRegisterButton = () => {
    dispatch(authModal());
    dispatch(registerModal());
  };

  return (
    <>
      <div className={styles.modal_window}>
        <button
          onClick={() => dispatch(authModal())}
          className={styles.modal_close}
        ></button>
        <div className={styles.auth_modal}>
          <div className={styles.auth_modal_header}>To continue please register or log in</div>

          <button
            onClick={handleLoginButton}
            className={styles.auth_btn}
          >
            Continue to sign in
          </button>
          <button
            onClick={handleRegisterButton}
            className={styles.auth_btn}
          >
            Continue to register
          </button>
          <button
            onClick={() => dispatch(authModal())}
            className={styles.guest_btn}
          >
            Continue as guest
          </button>
        </div>
      </div>
    </>
  );
}
