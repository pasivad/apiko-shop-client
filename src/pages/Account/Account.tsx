import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import type { RootState } from '../../redux/store';

import styles from './Account.module.scss';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import EditAccount from '../../components/EditAccount/EditAccount';
import OrdersHistory from '../../components/OrdersHistory/OrdersHistory';
import Favourites from '../../components/Favourites/Favourites';
import Modal from '../../components/Modal/Modal';
import OrderModal from '../../components/OrderModal/OrderModal';

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

export default function Account() {
  const modals = useSelector((state: RootState) => state.modals);
  const user: UserProps = useSelector((state: RootState) => state.user);

  const { pathname } = useLocation();

  const [accountMenu, setAccountMenu] = useState<string>(pathname);

  return (
    <>
      {modals.orderModal && (
        <Modal>
          <OrderModal />
        </Modal>
      )}
      <Header />

      <div className={styles.container}>
        <div className={styles.container_inner}>
          <div className={styles.name_initials}>
            {user.data?.fullName
              .split(' ')
              .map((word) => word.charAt(0))
              .join('')}
          </div>
          <div className={styles.name}>{user.data?.fullName}</div>
          <div className={styles.account_menu}>
            <Link
              to="/account"
              onClick={() => setAccountMenu('/account')}
              className={accountMenu === '/account' ? styles.account_menu_item__active : styles.account_menu_item}
            >
              Edit Account
            </Link>
            <Link
              to="/account/orders"
              onClick={() => setAccountMenu('/account/orders')}
              className={
                accountMenu.includes('/account/orders') ? styles.account_menu_item__active : styles.account_menu_item
              }
            >
              Orders History
            </Link>
            <Link
              to="/account/favourites"
              onClick={() => setAccountMenu('/account/favourites')}
              className={
                accountMenu.includes('/account/favourites')
                  ? styles.account_menu_item__active
                  : styles.account_menu_item
              }
            >
              Favourites
            </Link>
          </div>
          {accountMenu === '/account' && user.data && (
            <EditAccount
              fullName={user.data?.fullName}
              email={user.data?.email}
              phone={user.data?.phone}
              country={user.data?.country}
              city={user.data?.city}
              address={user.data?.address}
            />
          )}
          {accountMenu.includes('/account/orders') && <OrdersHistory />}
          {accountMenu.includes('/account/favourites') && <Favourites />}
        </div>
      </div>

      <Footer />
    </>
  );
}
