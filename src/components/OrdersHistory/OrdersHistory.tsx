import React, { useState, useEffect } from 'react';

import axios from '../../api/http';

import Order from '../Order/Order';

import styles from './OrdersHistory.module.scss';

interface Order {
  id: number;
  totalPrice: number;
  createdAt: string;
}

export default function OrdersHistory() {
  const [orders, setOrders] = useState<Array<Order>>([]);

  useEffect(() => {
    axios
      .get('/orders')
      .then(({ data }) => {
        setOrders(data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className={styles.ordhist_container}>
      {orders.map((item ,index) => (
        <Order key={index} id={item.id} totalPrice={item.totalPrice} createdAt={item.createdAt} />
      ))}
    </div>
  );
}
