import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppDispatch } from '../../redux/store';

import axios from '../../api/http';
import { fetchUser } from '../../redux/slices/user';

import styles from './EditAccount.module.scss';

import icon_password_eye from '../../images/icon_password_eye.svg';

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
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [emptyCurrentPassword, setEmptyCurrentPassword] = useState<boolean>(true);
  const [validateCurrentPassword, setValidateCurrentPassword] = useState<boolean>(false);
  const [invalidCurrentPassword, setInvalidCurrentPassword] = useState<boolean>(false);

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [emptyNewPassword, setEmptyNewPassword] = useState<boolean>(true);
  const [validateNewPassword, setValidateNewPassword] = useState<boolean>(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [emptyConfirmPassword, setEmptyConfirmPassword] = useState<boolean>(true);
  const [validateConfirmPassword, setValidateConfirmPassword] = useState<boolean>(false);

  const [newFullName, setNewFullName] = useState<string>(fullName);
  const [emptyFullName, setEmptyFullName] = useState<boolean>(false);

  const [newEmail, setNewEmail] = useState<string>(email);
  const [emptyEmail, setEmptyEmail] = useState<boolean>(false);
  const [validateEmail, setValidateEmail] = useState<boolean>(true);
  const [emailExist, setEmailExist] = useState<boolean>(false);

  const [newPhone, setNewPhone] = useState<string>(phone);
  const [emptyPhone, setEmptyPhone] = useState<boolean>(false);
  const [validatePhone, setValidatePhone] = useState<boolean>(true);

  const [newCountry, setNewCountry] = useState<string>(country || '');
  const [newCity, setNewCity] = useState<string>(city || '');
  const [newAddress, setNewAddress] = useState<string>(address || '');

  const editAccountNotify = () => toast('Account details are updated successfully!');
  const changePasswordNotify = () => toast('Password changed successfully!');

  const handleSaveBtnClick = () => {
    if (newFullName !== '' && newEmail !== '' && newPhone !== '' && validateEmail && validatePhone) {
      axios
        .put('/account', {
          fullName: newFullName,
          email: newEmail,
          phone: newPhone,
          country: newCountry,
          city: newCity,
          address: newAddress,
        })
        .then(() => {
          dispatch(fetchUser());
          editAccountNotify();
        })
        .catch((e) => {
          setEmailExist(true);
        });
    }
  };

  const handleChangePasswordBtnClick = () => {
    axios
      .put('/account/password', { oldPassword: currentPassword, password: newPassword })
      .then(() => {
        changePasswordNotify();
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      })
      .catch((e) => {
        setInvalidCurrentPassword(true);
      });
  };

  const handleFullNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFullName((e.target.value = e.target.value.replace(/[^a-zA-Z ]+/, '')));
    e.target.value === '' ? setEmptyFullName(true) : setEmptyFullName(false);
  };
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
    e.target.value === '' ? setEmptyEmail(true) : setEmptyEmail(false);
    e.target.value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
      ? setValidateEmail(true)
      : setValidateEmail(false);
    setEmailExist(false);
  };
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPhone(e.target.value);
    e.target.value === '' ? setEmptyPhone(true) : setEmptyPhone(false);
    e.target.value.length >= 10 && e.target.value.length < 14 ? setValidatePhone(true) : setValidatePhone(false);
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
  const handleCurrentPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
    e.target.value === '' ? setEmptyCurrentPassword(true) : setEmptyCurrentPassword(false);
    e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      ? setValidateCurrentPassword(true)
      : setValidateCurrentPassword(false);
    setInvalidCurrentPassword(false);
  };
  const handleNewPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    e.target.value === '' ? setEmptyNewPassword(true) : setEmptyNewPassword(false);
    e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      ? setValidateNewPassword(true)
      : setValidateNewPassword(false);
  };
  const handleConfirmPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    e.target.value === '' ? setEmptyConfirmPassword(true) : setEmptyConfirmPassword(false);
    e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      ? setValidateConfirmPassword(true)
      : setValidateConfirmPassword(false);
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
              className={!emptyFullName ? styles.input : styles.input_error}
              value={newFullName}
              onChange={handleFullNameInput}
              required
            />
            <label className={!emptyFullName ? styles.placeholder : styles.placeholder__error}>Full Name</label>
            <label className={styles.label_error}>{emptyFullName && 'Required info is missing'}</label>
          </div>
          {/* Email */}
          <div className={styles.input_group}>
            <input
              type="text"
              id="email"
              className={!emptyEmail && validateEmail && !emailExist ? styles.input : styles.input_error}
              value={newEmail}
              onChange={handleEmailInput}
              required
            />
            <label
              className={!emptyEmail && validateEmail && !emailExist ? styles.placeholder : styles.placeholder__error}
            >
              Email
            </label>
            <label className={styles.label_error}>
              {emailExist
                ? 'Such email is already used'
                : emptyEmail
                ? 'Required info is missing'
                : !validateEmail && 'Incorrect data'}
            </label>
          </div>
          {/* Phone */}
          <div className={styles.input_group}>
            <input
              type="number"
              id="phone"
              className={!emptyPhone && validatePhone ? styles.input : styles.input_error}
              value={newPhone}
              onChange={handlePhoneInput}
              required
            />
            <label className={!emptyPhone && validatePhone ? styles.placeholder : styles.placeholder__error}>
              Phone
            </label>
            <label className={styles.label_error}>
              {emptyPhone ? 'Required info is missing' : !validatePhone && 'Incorrect data'}
            </label>
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
            <label className={styles.label_error}></label>
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
            <label className={styles.label_error}></label>
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
            <label className={styles.label_error}></label>
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
              type={showCurrentPassword ? 'text' : 'password'}
              onChange={handleCurrentPasswordInput}
              value={currentPassword}
              id="password"
              className={styles.input}
              required
            />
            <button
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className={styles.password_btn}
            >
              <img
                alt="password_show"
                src={icon_password_eye}
              ></img>
            </button>
            <label className={styles.placeholder}>Current password</label>
            <label className={styles.label_error}></label>
          </div>
          <div className={styles.input_group}>
            <input
              type={showNewPassword ? 'text' : 'password'}
              onChange={handleNewPasswordInput}
              value={newPassword}
              id="newpass"
              className={styles.input}
              required
            />
            <button
              onClick={() => setShowNewPassword(!showNewPassword)}
              className={styles.password_btn}
            >
              <img
                alt="password_show"
                src={icon_password_eye}
              ></img>
            </button>
            <label className={styles.placeholder}>New password</label>
            <label className={styles.label_error}></label>
          </div>
          <div className={styles.input_group}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              onChange={handleConfirmPasswordInput}
              value={confirmPassword}
              id="confpass"
              className={styles.input}
              required
            />
            <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={styles.password_btn}
            >
              <img
                alt="password_show"
                src={icon_password_eye}
              ></img>
            </button>
            <label className={styles.placeholder}>Confirm password</label>
            <label className={styles.label_error}>
              {invalidCurrentPassword
                ? 'Wrong current password'
                : emptyCurrentPassword ||
                  emptyNewPassword ||
                  emptyConfirmPassword ||
                  !validateCurrentPassword ||
                  !validateNewPassword ||
                  !validateConfirmPassword
                ? 'Invalid Data'
                : newPassword !== confirmPassword && `Passwords don't match`}
            </label>
          </div>

          <label className={styles.password_label}>
            The password has to be at least 8 characters, contain at least 1 letter, 1 special symbol, 1 number
          </label>
          <button
            disabled={
              !emptyCurrentPassword &&
              !emptyNewPassword &&
              !emptyConfirmPassword &&
              validateCurrentPassword &&
              validateNewPassword &&
              validateConfirmPassword &&
              newPassword === confirmPassword
                ? false
                : true
            }
            onClick={handleChangePasswordBtnClick}
            className={styles.save_btn}
          >
            Change password
          </button>
        </div>
      </div>
      <ToastContainer
      className={styles.Toastify__toast__container}
      autoClose={3000} />
    </div>
  );
}
