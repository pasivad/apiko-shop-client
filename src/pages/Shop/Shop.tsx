import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../../redux/store';

import styles from './Shop.module.scss';

import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import SortingBar from '../../components/SortingBar/SortingBar';
import ProductItem from '../../components/ProductItem/ProductItem';
import Footer from '../../components/Footer/Footer';

import Modal from '../../components/Modal/Modal';
import RegisterModal from '../../components/RegisterModal/RegisterModal';
import LoginModal from '../../components/LoginModal/LoginModal';
import AuthModal from '../../components/AuthModal/AuthModal';
import ProductModal from '../../components/ProductModal/ProductModal';
import { fetchProducts } from '../../redux/slices/products';

export default function Shop() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const modals = useSelector((state: RootState) => state.modals);
  const { products } = useSelector((state: RootState) => state.products);

  const isProductsLoading = products.status === 'loading';

  return (
    <>
      <Header />
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
      {modals.productModal && (
        <Modal>
          <ProductModal />
        </Modal>
      )}
      <div className={styles.container}>
        <div className={styles.filter_bar}>
          <SearchBar />
          <CategoryBar />
          <SortingBar />
        </div>
        <div className={styles.products_list}>
          {/* {Array.from(Array(12).keys()).map((el) => (
            <ProductItem key={el} />
          ))} */}
          {(isProductsLoading ? [...Array(3)] : products.items).map((obj, index) =>
            isProductsLoading ? (
              <ProductItem
                id={123}
                title={'123'}
                img={'123'}
                price={123}
              />
            ) : (
              <ProductItem
                key={index}
                id={obj.id}
                title={obj.title}
                img={obj.picture}
                price={obj.price}
              />
            )
          )}
        </div>
        <button className={styles.loadmore_btn}>Load more...</button>
      </div>
      <Footer />
    </>
  );
}
