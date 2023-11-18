import React from 'react';

import styles from './SearchBar.module.scss';

import search_icon from '../../images/icon_search.svg';

export default function SearchBar() {
  return (
    <div className={styles.searchbar_item}>
      <div className={styles.searchbar}>
        <img
          alt="search"
          src={search_icon}
        ></img>
        <input
          placeholder="Search product by name"
          className={styles.search_input}
        ></input>
      </div>
    </div>
  );
}
