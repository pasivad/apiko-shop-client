import React from 'react';


import styles from './Modal.module.scss';

export default function Modal({ children}: { children: React.ReactNode }) {

  return (
    <div className={styles.modal_background}>
      {children}
    </div>
  );
}
