import React, { useState, useEffect } from 'react';

import axios from '../../api/http';

import styles from './Favourites.module.scss';

import ProductItem from '../ProductItem/ProductItem';

interface ProductItem {
  id: number;
  title: string;
  picture: string;
  price: number;
  favorite: boolean;
}

export default function Favourites() {
  const [favorites, setFavorites] = useState<Array<ProductItem>>(Array);

  useEffect(() => {
    axios
      .get('/products/favorites')
      .then(({ data }) => {
        setFavorites(data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className={styles.favorites_grid}>
      {favorites.map((item) => (
        <ProductItem
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          picture={item.picture}
          favorite={item.favorite}

        />
      ))}
    </div>
  );
}
