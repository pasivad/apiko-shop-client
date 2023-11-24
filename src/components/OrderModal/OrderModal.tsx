import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import styles from './OrderModal.module.scss';

import axios from '../../api/http';
import { orderModal } from '../../redux/slices/modals';

import OrderItem from '../OrderItem/OrderItem';

interface OrderModal {
  id: number;
  items: Array<OrderItem>;
  totalPrice: number;
  shipment: {
    country: string;
    city: string;
    address: string;
  };
  createdAt: string;
}

interface OrderItem {
  orderedPrice: number;
  product: {
    picture: string;
    title: string;
  };
  quantity: number;
}

export default function OrderModal() {
  const dispatch = useDispatch();
  const { id } = useParams<string>();
  const [order, setOrder] = useState<OrderModal | null>(null);

  useEffect(() => {
    axios
      .get(`/orders/${id}`)
      .then(({ data }) => {
        setOrder(data);
      })
      .catch((e) => console.error(e));
  }, []);

  const formatDate = (date: string) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
  };

  return (
    <>
      {order && (
        <div className={styles.modal_window}>
          <Link
            to={'/account/orders'}
            onClick={() => dispatch(orderModal())}
            className={styles.modal_close}
          ></Link>
          <div className={styles.order_modal}>
            <div className={styles.order_modal_header}>{`Order details ID ${order.id}`}</div>
            <div className={styles.order_modal_product_list}>
              {order.items.map((el, index) => (
                <OrderItem
                  title={el.product.title}
                  picture={el.product.picture}
                  quantity={el.quantity}
                  orderedPrice={el.orderedPrice}
                  key={index}
                />
              ))}
            </div>
            <div className={styles.order_modal_footer}>
              <div className={styles.order_modal_footer_block}>
                <div className={styles.order_modal_footer_info}>
                  <div className={styles.order_modal_footer_text}>Date:</div>
                  <div className={styles.order_modal_footer_text}>Address:</div>
                </div>
                <div className={styles.order_modal_footer_info}>
                  <div className={styles.order_modal_footer_value}>{formatDate(order.createdAt)}</div>
                  <div
                    className={styles.order_modal_footer_value}
                  >{`${order.shipment.address}, ${order.shipment.city}, ${order.shipment.country}`}</div>
                </div>
              </div>
              <div className={styles.order_modal_footer_block}>
                <div className={styles.order_modal_footer_info}>
                  <div className={styles.order_modal_footer_text}>Items:</div>
                  <div className={styles.order_modal_footer_text}>Total:</div>
                </div>
                <div className={styles.order_modal_footer_info}>
                  <div className={styles.order_modal_footer_value}>
                    {order?.items.reduce((acc, item) => {
                      return acc + item.quantity;
                    }, 0)}
                  </div>
                  <div className={styles.order_modal_footer_value}>{`$ ${order.totalPrice}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
