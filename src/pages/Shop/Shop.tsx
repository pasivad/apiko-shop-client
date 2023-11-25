import React, { useEffect, useState, useRef } from 'react';
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
import EmptyProductsList from '../../components/EmptyProductsList/EmptyProductsList';
import Footer from '../../components/Footer/Footer';

import Modal from '../../components/Modal/Modal';
import RegisterModal from '../../components/RegisterModal/RegisterModal';
import LoginModal from '../../components/LoginModal/LoginModal';
import AuthModal from '../../components/AuthModal/AuthModal';
import ProductModal from '../../components/ProductModal/ProductModal';
import ClickOutside from '../../components/ClickOutside/ClickOutside';

interface ProductItemProps {
  id: number;
  title: string;
  picture: string;
  price: number;
  favorite: boolean;
}

export default function Shop() {
  const dispatch = useDispatch<AppDispatch>();
  const exceptionRef = useRef<HTMLDivElement>(null);

  const modals = useSelector((state: RootState) => state.modals);
  const { products } = useSelector((state: RootState) => state.products);

  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [showPagesDropdown, setShowPagesDropdown] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce({ value: search, delay: 500 });

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(fetchProductsSearch(debouncedSearchTerm));
      setCategoryId(0);
      setSort('');
    } else if (categoryId) {
      dispatch(fetchProductsCategory({ page, categoryId, sort }));
    } else dispatch(fetchProducts({ page, sort }));
  }, [page, debouncedSearchTerm, sort, categoryId]);

  const handlePageChangingBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPage(Number(e.currentTarget.value));
    setShowPagesDropdown(false);
  };

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
            setPage={setPage}
          />
          {search === '' && (
            <>
              <CategoryBar
                setCategoryId={setCategoryId}
                categoryId={categoryId}
                setPage={setPage}
              />
              <SortingBar
                setSort={setSort}
                sort={sort}
                setPage={setPage}
              />
            </>
          )}
        </div>

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
        {products.items.length ? (
          <div className={styles.products_list}>
            {products.items.map((obj: ProductItemProps) => (
              <ProductItem
                key={obj.id}
                id={obj.id}
                title={obj.title}
                picture={obj.picture}
                price={obj.price}
                favorite={obj.favorite}
              />
            ))}
          </div>
        ) : (
          <EmptyProductsList />
        )}
        {page === 1 ? (
          <button
            onClick={() => setPage(2)}
            className={styles.loadmore_btn}
            hidden={debouncedSearchTerm.length >= 3}
          >
            Load more...
          </button>
        ) : (
          <div className={styles.page_block}>
            <div className={styles.page_select}>Page</div>
            <div
              ref={exceptionRef}
              onClick={() => setShowPagesDropdown(!showPagesDropdown)}
              className={showPagesDropdown ? styles.page_select_group__active : styles.page_select_group}
            >
              <div
                className={styles.page_select_value}
                id="page"
              >
                {page}
              </div>
              <button className={styles.dropdown_btn}></button>
              {showPagesDropdown && (
                <ClickOutside
                  isOpen={showPagesDropdown}
                  setIsOpen={setShowPagesDropdown}
                  exceptionRef={exceptionRef}
                  className={styles.page_select_dropdown}
                >
                  {Array.from(Array(25).keys()).map((el) => (
                    <button
                      key={el}
                      onClick={handlePageChangingBtn}
                      className={styles.page_select_dropdown_item}
                      value={el + 1}
                    >
                      {el + 1}
                    </button>
                  ))}
                </ClickOutside>
              )}
            </div>
            <div className={styles.page_max}>of 25</div>
            <div className={styles.page_select_btns}>
              <button
                onClick={() => setPage(page - 1)}
                className={styles.page_select__back}
              ></button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === 25}
                className={styles.page_select__next}
              ></button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
