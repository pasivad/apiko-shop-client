import React from 'react';

import type { RootState } from '../../redux/store';

import styles from './Product.module.scss';

import { useSelector } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import Modal from '../../components/Modal/Modal';
import AuthModal from '../../components/AuthModal/AuthModal';
import LoginModal from '../../components/LoginModal/LoginModal';
import RegisterModal from '../../components/RegisterModal/RegisterModal';

export default function Product() {
  const modals = useSelector((state: RootState) => state.modals);

  return (
    <>
      {modals.registerModal && (
        <Modal>
          <RegisterModal />
        </Modal>
      )}
      {modals.loginModal && (
        <Modal>
          <LoginModal />
        </Modal>
      )}
      {modals.authModal && (
        <Modal>
          <AuthModal />
        </Modal>
      )}
      <Header />
      <div>Product</div>
      <Footer />
    </>
  );
}
