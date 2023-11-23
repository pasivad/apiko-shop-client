import React from 'react';

import styles from './EmptyProductsList.module.scss';

export default function EmptyProductsList() {
  return (
    <div className={styles.empty_product_list}>
      <div className={styles.title}>No Results Found</div>
      <div className={styles.text}>
        We did not find any article that matches this search Make sure that the search text is entered correctly Try
        using other search criteria
      </div>
    </div>
  );
}
