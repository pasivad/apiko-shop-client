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
import { fetchProducts, fetchProductsCategory } from '../../redux/slices/products';

interface ProductItemProps {
  id: number;
  title: string;
  picture: string;
  price: number;
}

export default function Shop() {
  const [sort, setSort] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    categoryId ? dispatch(fetchProductsCategory({ categoryId, sort })) : dispatch(fetchProducts(sort));
  }, [sort, categoryId]);

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
          <CategoryBar
            setCategoryId={setCategoryId}
            categoryId={categoryId}
          />
          <SortingBar
            setSort={setSort}
            sort={sort}
          />
        </div>
        <div className={styles.products_list}>
          {isProductsLoading ? (
            <div className={styles.plug}></div>
          ) : (
            products.items.map((obj: ProductItemProps, index) => (
              <ProductItem
                key={index}
                id={obj.id}
                title={obj.title}
                img={obj.picture}
                price={obj.price}
              />
            ))
          )}
        </div>
        <button className={styles.loadmore_btn}>Load more...</button>
      </div>
      <Footer />
    </>
  );
}
