import React, { useState } from 'react';

import styles from './CategoryBar.module.scss';

import category_icon from '../../images/icon_category.svg';

export default function CategoryBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.category_item}>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={isOpen ? styles.categorybar__open : styles.categorybar}
      >
        <img
          alt="search"
          src={category_icon}
        ></img>
        <div className={styles.category_select}>Choose Category</div>
        <button className={styles.category_dropdown_btn}></button>
      </div>
      {isOpen && (
        <div className={styles.category_dropdown}>
          <div className={styles.category_dropdown_item}>1</div>
          <div className={styles.category_dropdown_item}>2</div>
          <div className={styles.category_dropdown_item}>3</div>
          <div className={styles.category_dropdown_item}>4</div>
          <div className={styles.category_dropdown_item}>5</div>
        </div>
      )}
    </div>
  );
}
