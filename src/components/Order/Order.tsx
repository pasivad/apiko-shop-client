import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { orderModal } from '../../redux/slices/modals';

import styles from './Order.module.scss';

interface OrderProps {
  id: number;
  totalPrice: number;
  createdAt: string;
}

export default function Order({ id, totalPrice, createdAt }: OrderProps) {
  const dispatch = useDispatch();

  const formatDate = (date: string) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('.');
  };

  return (
    <Link
      to={`/account/orders/${id}`}
      onClick={() => dispatch(orderModal())}
      className={styles.order_item}
    >
      <div className={styles.order_info}>
        <div className={styles.order_info_about}>
          <div>Order ID: </div>
          <div>Date: </div>
        </div>
        <div className={styles.order_info_values}>
          <div className={styles.order_info_id}>{id}</div>
          <div>{formatDate(createdAt)}</div>
        </div>
      </div>
      <div className={styles.order_info_about}>
        Price<span className={styles.order_info_values}>{`$ ${totalPrice}`}</span>
      </div>
    </Link>
  );
}
