import React from 'react';

import styles from './EditAccount.module.scss';

export default function EditAccount() {
  return (
    <div className={styles.editaccount_container}>
      <div className={styles.formgroup_main}>
        <div className={styles.formgroup_title}>Main information</div>
        <div className={styles.form}>
          <div className={styles.input_group}>
            <input
              type="text"
              id="fullname"
              className={styles.input}
              autoFocus
              required
            />
            <label className={styles.placeholder}>Full Name</label>
          </div>
          <div className={styles.input_group}>
            <input
              type="text"
              id="email"
              className={styles.input}
              required
            />
            <label className={styles.placeholder}>Email</label>
          </div>
          <div className={styles.input_group}>
            <input
              type="text"
              id="phone"
              className={styles.input}
              required
            />
            <label className={styles.placeholder}>Phone</label>
          </div>
          <div className={styles.input_group}>
            <input
              type="text"
              id="country"
              className={styles.input}
              required
            />
            <label className={styles.placeholder}>Country</label>
          </div>
          <div className={styles.input_group}>
            <input
              type="text"
              id="city"
              className={styles.input}
              required
            />
            <label className={styles.placeholder}>City</label>
          </div>
          <div className={styles.input_group}>
            <input
              type="text"
              id="address"
              className={styles.input}
              required
            />
            <label className={styles.placeholder}>Address</label>
          </div>
          <button className={styles.save_btn}>Save</button>
        </div>
      </div>
      <div className={styles.formgroup_password}>
        <div className={styles.formgroup_title}>Change password</div>
        <div className={styles.form}>
          <div className={styles.input_group}>
            <input
              type="text"
              id="password"
              className={styles.input}
              required
            />
            <label className={styles.placeholder}>Current password</label>
          </div>
          <div className={styles.input_group}>
            <input
              type="text"
              id="newpass"
              className={styles.input}
              required
            />
            <label className={styles.placeholder}>New password</label>
          </div>
          <div className={styles.input_group}>
            <input
              type="text"
              id="confpass"
              className={styles.input}
              required
            />
            <label className={styles.placeholder}>Confirm password</label>
          </div>
          <button className={styles.save_btn}>Change password</button>
        </div>
      </div>
    </div>
  );
}
