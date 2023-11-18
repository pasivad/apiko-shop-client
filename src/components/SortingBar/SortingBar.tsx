import React, { useState } from 'react';

import styles from './SortingBar.module.scss';

import sorting_icon from '../../images/icon_sorting.svg';

export default function SortingBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.sort_item}>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={isOpen ? styles.sortbar__open : styles.sortbar}
      >
        <img
          alt="sort"
          src={sorting_icon}
        ></img>
        <div className={styles.sorting_select}>Sorting</div>
        <button className={styles.sort_dropdown_btn}></button>
      </div>
      {isOpen && (
        <div className={styles.sort_dropdown}>
          <div className={styles.sort_dropdown_item}>Popular</div>
          <div className={styles.sort_dropdown_item}>New</div>
        </div>
      )}
    </div>
  );
}
