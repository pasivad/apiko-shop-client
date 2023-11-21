import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '../../redux/slices/user';

import styles from './HeaderAccount.module.scss';

export default function HeaderAccount() {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogoutButton = () => {
    window.localStorage.removeItem('token');
    dispatch(logout());
  };

  return (
    <div className={styles.header_account_inner}>
      <div className={styles.header_account_welcome}>Welcome, Tony!</div>
      <div className={styles.header_account_initials}>TS</div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.header_account_btn}
      ></button>
      {isOpen && (
        <div className={styles.header_account_dropdown}>
          <div className={styles.dropdown_info}>
            <div className={styles.dropdown_info_name}>Tony Stark</div>
            <div className={styles.dropdown_info_email}>Tony.Stark@gmail.com</div>
          </div>
          <div className={styles.dropdown_btns}>
            <button className={styles.settings_btn}>Settings</button>
            <button
              onClick={handleLogoutButton}
              className={styles.logout_btn}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
