import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';

import useDebounce from '../../hooks/useDebounce';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchProducts, fetchProductsSearch, fetchProductsCategory } from '../../redux/slices/products';

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

interface ProductItemProps {
  id: number;
  title: string;
  picture: string;
  price: number;
}

export default function Shop() {
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();

  const debouncedSearchTerm = useDebounce({ value: search, delay: 500 });

  useEffect(() => {
    debouncedSearchTerm
      ? dispatch(fetchProductsSearch(debouncedSearchTerm))
      : categoryId
      ? dispatch(fetchProductsCategory({ categoryId, sort }))
      : dispatch(fetchProducts(sort));
  }, [debouncedSearchTerm, sort, categoryId]);

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
          <SearchBar
            setSearch={setSearch}
            search={search}
          />
          {search === '' && (
            <>
              <CategoryBar
                setCategoryId={setCategoryId}
                categoryId={categoryId}
              />
              <SortingBar
                setSort={setSort}
                sort={sort}
              />
            </>
          )}
        </div>
        <div className={styles.products_list}>
          {isProductsLoading && (
            <div className={styles.loading_products}>
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="1"
                width="90"
                visible={true}
              />
              <div className={styles.loading_text}>Searching...</div>
            </div>
          )}
          {products.items.map((obj: ProductItemProps, index) => (
            <ProductItem
              key={index}
              id={obj.id}
              title={obj.title}
              img={obj.picture}
              price={obj.price}
            />
          ))}
        </div>
        <button className={styles.loadmore_btn}>Load more...</button>
      </div>
      <Footer />
    </>
  );
}
