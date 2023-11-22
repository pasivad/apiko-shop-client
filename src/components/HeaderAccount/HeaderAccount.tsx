import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import type { RootState } from '../../redux/store';

import { logout } from '../../redux/slices/user';

import styles from './HeaderAccount.module.scss';

interface UserProps {
  data: {
    account?: {
      fullName: string;
      email: string;
    };
    fullName: string;
    email: string;
  } | null;
  status: string;
}

export default function HeaderAccount() {
  const dispatch = useDispatch();
  const user: UserProps = useSelector((state: RootState) => state.user);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (user.data) {
      setFullName(user.data?.fullName);
      setEmail(user.data?.email);
    }
    if (user.data?.account) {
      setFullName(user.data?.account?.fullName);
      setEmail(user.data?.account?.email);
    }
  }, [user.data?.fullName]);

  const handleLogoutButton = () => {
    window.localStorage.removeItem('token');
    dispatch(logout());
  };

  return (
    <div className={styles.header_account_inner}>
      <div className={styles.header_account_welcome}>{`Welcome, ${fullName.replace(/ .*/, '')}!`}</div>
      <div className={styles.header_account_initials}>
        {fullName
          .split(' ')
          .map((word) => word.charAt(0))
          .join('')}
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.header_account_btn}
      ></button>
      {isOpen && (
        <div className={styles.header_account_dropdown}>
          <div className={styles.dropdown_info}>
            <div className={styles.dropdown_info_name}>{fullName}</div>
            <div className={styles.dropdown_info_email}>{email}</div>
          </div>
          <div className={styles.dropdown_btns}>
            <Link
              to="/account"
              className={styles.settings_btn}
            >
              Settings
            </Link>
            <Link
              to="/"
              onClick={handleLogoutButton}
              className={styles.logout_btn}
            >
              Log Out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
