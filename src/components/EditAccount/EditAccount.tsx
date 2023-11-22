import React, { Dispatch, SetStateAction, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '../../redux/store';

import axios from '../../api/http';
import { fetchUser } from '../../redux/slices/user';

import styles from './EditAccount.module.scss';

interface EditAccountProps {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
}

export default function EditAccount({ fullName, email, phone, country, city, address }: EditAccountProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [newFullName, setNewFullName] = useState<string>(fullName);
  const [emptyFullName, setEmptyFullName] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>(email);
  const [emptyEmail, setEmptyEmail] = useState<boolean>(false);
  const [newPhone, setNewPhone] = useState<string>(phone);
  const [emptyPhone, setEmptyPhone] = useState<boolean>(false);
  const [newCountry, setNewCountry] = useState<string>(country);
  const [newCity, setNewCity] = useState<string>(city);
  const [newAddress, setNewAddress] = useState<string>(address);

  const handleSaveBtnClick = () => {
    axios.put('/account', {
      fullName: newFullName,
      email: newEmail,
      phone: newPhone,
      country: newCountry,
      city: newCity,
      address: newAddress,
    });
    dispatch(fetchUser());
  };

  const handleFullNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFullName((e.target.value = e.target.value.replace(/[^a-zA-Z ]+/, '')));
    e.target.value === '' ? setEmptyFullName(true) : setEmptyFullName(false);
  };
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPhone(e.target.value);
  };
  const handleCountryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCountry(e.target.value);
  };
  const handleCityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCity(e.target.value);
  };
  const handleAddressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress(e.target.value);
  };

  return (
    <div className={styles.editaccount_container}>
      <div className={styles.formgroup_main}>
        <div className={styles.formgroup_title}>Main information</div>
        <div className={styles.form}>
          {/* FullName */}
          <div className={styles.input_group}>
            <input
              type="text"
              id="fullname"
              className={styles.input}
              value={newFullName}
              onChange={handleFullNameInput}
              required
            />
            <label className={styles.placeholder}>Full Name</label>
          </div>
          {/* Email */}
          <div className={styles.input_group}>
            <input
              type="text"
              id="email"
              className={styles.input}
              value={newEmail}
              onChange={handleEmailInput}
              required
            />
            <label className={styles.placeholder}>Email</label>
          </div>
          {/* Phone */}
          <div className={styles.input_group}>
            <input
              type="number"
              id="phone"
              className={styles.input}
              value={newPhone}
              onChange={handlePhoneInput}
              required
            />
            <label className={styles.placeholder}>Phone</label>
          </div>
          {/* Country */}
          <div className={styles.input_group}>
            <input
              type="text"
              id="country"
              className={styles.input}
              value={newCountry}
              onChange={handleCountryInput}
              required
            />
            <label className={styles.placeholder}>Country</label>
          </div>
          {/* City */}
          <div className={styles.input_group}>
            <input
              type="text"
              id="city"
              className={styles.input}
              value={newCity}
              onChange={handleCityInput}
              required
            />
            <label className={styles.placeholder}>City</label>
          </div>
          {/* Address */}
          <div className={styles.input_group}>
            <input
              type="text"
              id="address"
              className={styles.input}
              value={newAddress}
              onChange={handleAddressInput}
              required
            />
            <label className={styles.placeholder}>Address</label>
          </div>
          <button
            onClick={handleSaveBtnClick}
            className={styles.save_btn}
          >
            Save
          </button>
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
