import React, { Dispatch, SetStateAction, useState, useRef } from 'react';

import styles from './SortingBar.module.scss';

import ClickOutside from '../ClickOutside/ClickOutside';

import sorting_icon from '../../images/icon_sorting.svg';

interface SortingBarProps {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
}

const SortVariables: { [key: string]: string } = {
  latest: 'New',
  popular: 'Popular',
};

export default function SortingBar({ sort, setSort, setPage }: SortingBarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const exceptionRef = useRef<HTMLDivElement>(null);

  const handleSortingClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(false);
    setSort(e.currentTarget.value);
    setPage(1);
  };

  const handleCrearBtn = () => {
    setSort('');
    setPage(1);
  };

  return (
    <div
      ref={exceptionRef}
      className={isOpen ? styles.sort_item__open : styles.sort_item}
    >
      <button
        className={styles.sort_inner}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          alt="sort"
          src={sorting_icon}
        ></img>
        <div className={sort === '' ? styles.sorting_select : styles.sorting_select__active}>
          {sort === '' ? 'Sorting' : SortVariables[sort]}
        </div>
      </button>
      {sort === '' ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.sort_showdropdown_btn}
        ></button>
      ) : (
        <button
          onClick={handleCrearBtn}
          className={styles.sort_clear_btn}
        ></button>
      )}
      {isOpen && (
        <ClickOutside
          exceptionRef={exceptionRef}
          className={styles.sort_dropdown}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <button
            onClick={handleSortingClick}
            className={styles.sort_dropdown_item}
            value={'popular'}
          >
            Popular
          </button>
          <button
            onClick={handleSortingClick}
            className={styles.sort_dropdown_item}
            value={'latest'}
          >
            New
          </button>
        </ClickOutside>
      )}
    </div>
  );
}
