import React, { Dispatch, SetStateAction, useState } from 'react';

import useDebounce from '../../hooks/useDebounce';

import styles from './SearchBar.module.scss';

import search_icon from '../../images/icon_search.svg';

interface SearchBarProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function SearchBar({ search, setSearch, setPage }: SearchBarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    (e.target.value.length >= 3 || e.target.value.length === 0) && setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className={search === '' ? styles.searchbar_item : styles.searchbar_item__active}>
      <div className={styles.searchbar}>
        <img
          alt="search"
          src={search_icon}
        ></img>
        <input
          placeholder="Search product by name"
          className={styles.search_input}
          onChange={handleSearchChange}
        ></input>
      </div>
    </div>
  );
}
