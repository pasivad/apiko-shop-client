import React, { Dispatch, SetStateAction, useState } from 'react';

import styles from './SortingBar.module.scss';

import sorting_icon from '../../images/icon_sorting.svg';

interface SortingBarProps {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}

const SortVariables: { [key: string]: string } = {
  latest: 'New',
  popular: 'Popular',
};

export default function SortingBar({ sort, setSort }: SortingBarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSortingClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(false);
    setSort(e.currentTarget.value);
  };

  return (
    <div className={isOpen ? styles.sort_item__open : styles.sort_item}>
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
          onClick={() => setSort('')}
          className={styles.sort_clear_btn}
        ></button>
      )}
      {isOpen && (
        <div className={styles.sort_dropdown}>
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
        </div>
      )}
    </div>
  );
}
