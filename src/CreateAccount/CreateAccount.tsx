import styles from "./CreateAccount.module.css";
import React, { useState } from "react";

interface createAccountData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  username: string;
  password: string;
}

const CreateAccount = () => {
  const [data, setData] = useState<createAccountData>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    username: "",
    password: "",
  });
  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    setData({
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      state: "",
      city: "",
      zipcode: "",
      username: "",
      password: "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.first}>
            <p>First name</p>
            <input
              placeholder="Jane"
              onChange={handleUpdate}
              type="text"
              name="firstName"
              value={data.firstName}
            />
          </div>
          <div className={styles.last}>
            <p>Last name</p>
            <input
              placeholder="Doe"
              onChange={handleUpdate}
              type="text"
              name="lastName"
              value={data.lastName}
            />
          </div>
          <div className={styles.email}>
            <p>Email</p>
            <input
              placeholder="name@example.com"
              onChange={handleUpdate}
              type="text"
              name="email"
              value={data.email}
            />
          </div>
          <div className={styles.country}>
            <p>Country</p>
            <input
              placeholder="United States"
              onChange={handleUpdate}
              type="text"
              name="country"
              value={data.country}
            />
          </div>
          <div className={styles.state}>
            <p>State</p>
            <input
              placeholder="California"
              onChange={handleUpdate}
              type="text"
              name="state"
              value={data.state}
            />
          </div>
          <div className={styles.city}>
            <p>City</p>
            <input
              placeholder="San Luis Obispo"
              onChange={handleUpdate}
              type="text"
              name="city"
              value={data.city}
            />
          </div>
          <div className={styles.zip}>
            <p>Zip Code</p>
            <input
              placeholder="11111"
              onChange={handleUpdate}
              type="text"
              name="zipcode"
              value={data.zipcode}
            />
          </div>
          <div className={styles.user}>
            <p>Username</p>
            <input
              placeholder="Enter username"
              onChange={handleUpdate}
              type="text"
              name="username"
              value={data.username}
            />
          </div>
          <div className={styles.pass}>
            <p>Password</p>
            <input
              placeholder="Enter password"
              onChange={handleUpdate}
              type="password"
              name="password"
              value={data.password}
            />
          </div>
          <div className={styles.confirmPass}>
            <p>Confirm Password</p>
            <input placeholder="Confirm Password" type="password" />
          </div>
          <button className={styles.button} type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateAccount;
