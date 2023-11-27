import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import type { AppDispatch, RootState } from '../../redux/store';

import { logout } from '../../redux/slices/user';
import { clearCart } from '../../redux/slices/cart';
import { fetchProducts } from '../../redux/slices/products';

import styles from './HeaderAccount.module.scss';

import ClickOutside from '../ClickOutside/ClickOutside';

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
  const dispatch = useDispatch<AppDispatch>();
  const user: UserProps = useSelector((state: RootState) => state.user);

  const exceptionRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogoutButton = () => {
    window.localStorage.removeItem('token');
    dispatch(clearCart());
    dispatch(logout());
    dispatch(fetchProducts({ sort: 'latest', page: 1 }));
  };

  return (
    <div className={styles.header_account_inner}>
      <div className={styles.header_account_welcome}>{`Welcome, ${
        user.data?.fullName!
          ? user.data?.fullName!.replace(/ .*/, '')
          : user.data?.account?.fullName! && user.data?.account?.fullName!.replace(/ .*/, '')
      }!`}</div>
      <div className={styles.header_account_initials}>
        {user.data?.fullName!
          ? user.data
              ?.fullName!.split(' ')
              .map((word) => word.charAt(0))
              .join('')
          : user.data?.account?.fullName! &&
            user.data?.account
              ?.fullName!.split(' ')
              .map((word) => word.charAt(0))
              .join('')}
      </div>
      <div ref={exceptionRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.header_account_btn}
        ></button>
      </div>
      {isOpen && (
        <ClickOutside
          exceptionRef={exceptionRef}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          className={styles.header_account_dropdown}
        >
          <div className={styles.dropdown_info}>
            <div className={styles.dropdown_info_name}>{user.data?.fullName! || user.data?.account?.fullName!}</div>
            <div className={styles.dropdown_info_email}>{user.data?.email! || user.data?.account?.email!}</div>
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
        </ClickOutside>
      )}
    </div>
  );
}
