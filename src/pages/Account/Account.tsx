import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../../redux/store';

import styles from './Account.module.scss';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import EditAccount from '../../components/EditAccount/EditAccount';
import OrdersHistory from '../../components/OrdersHistory/OrdersHistory';
import Favourites from '../../components/Favourites/Favourites';
import Modal from '../../components/Modal/Modal';
import OrderModal from '../../components/OrderModal/OrderModal';

export default function Account() {
  const modals = useSelector((state: RootState) => state.modals);

  const [accountMenu, setAccountMenu] = useState<number>(1);
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
          <div className={styles.name_initials}>TS</div>
          <div className={styles.name}>Tony Stark</div>
          <div className={styles.account_menu}>
            <button
              onClick={() => setAccountMenu(1)}
              disabled={accountMenu === 1}
              className={accountMenu === 1 ? styles.account_menu_item__active : styles.account_menu_item}
            >
              Edit Account
            </button>
            <button
              onClick={() => setAccountMenu(2)}
              disabled={accountMenu === 2}
              className={accountMenu === 2 ? styles.account_menu_item__active : styles.account_menu_item}
            >
              Orders History
            </button>
            <button
              onClick={() => setAccountMenu(3)}
              disabled={accountMenu === 3}
              className={accountMenu === 3 ? styles.account_menu_item__active : styles.account_menu_item}
            >
              Favourites
            </button>
          </div>
          {accountMenu === 1 && <EditAccount />}
          {accountMenu === 2 && <OrdersHistory />}
          {accountMenu === 3 && <Favourites />}
        </div>
      </div>
      <Footer />
    </>
  );
}
