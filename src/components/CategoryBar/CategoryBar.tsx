import React, { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';

import styles from './CategoryBar.module.scss';

import category_icon from '../../images/icon_category.svg';

import axios from '../../api/http';

import ClickOutside from '../ClickOutside/ClickOutside';

interface CategoryProps {
  id: number;
  name: string;
}

interface CategoryBarProps {
  categoryId: number;
  setCategoryId: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function CategoryBar({ categoryId, setCategoryId, setPage }: CategoryBarProps) {
  const exceptionRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<Array<CategoryProps>>(Array);

  useEffect(() => {
    axios.get('/categories').then(({ data }) => {
      setCategories(data);
    });
  }, []);

  const handleCategoriesClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(false);
    setCategoryId(Number(e.currentTarget.value));
    setPage(1);
  };

  return (
    <div
      ref={exceptionRef}
      className={isOpen ? styles.category_item__open : styles.category_item}
    >
      <button
        className={styles.category_inner}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          alt="sort"
          src={category_icon}
        ></img>
        <div className={categoryId === 0 ? styles.category_select : styles.category_select__active}>
          {categoryId === 0 ? 'Choose category' : categories[categoryId - 1].name}
        </div>
      </button>
      {categoryId === 0 ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.category_showdropdown_btn}
        ></button>
      ) : (
        <button
          onClick={handleCategoriesClick}
          className={styles.category_clear_btn}
          value={0}
        ></button>
      )}
      {isOpen && (
        <ClickOutside
          exceptionRef={exceptionRef}
          className={styles.category_dropdown}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          {categories.map((el, index) => (
            <button
              key={index}
              onClick={handleCategoriesClick}
              className={styles.category_dropdown_item}
              value={el.id}
            >
              {el.name}
            </button>
          ))}
        </ClickOutside>
      )}
    </div>
  );
}
