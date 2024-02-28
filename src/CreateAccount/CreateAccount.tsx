import styles from "./CreateAccount.module.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";

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
  const [passwordErr, setPasswordErr] = useState<string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmailBlur = () => {
    setEmailErr(validateEmail(data.email));
  };

  const handlePasswordBlur = () => {
    setPasswordErr(validatePassword(data.password));
  };

  const validateEmail = (email: string) => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return "Email address is not valid.";
    }
    return "";
  };

  const validatePassword = (pass: string) => {
    if (pass.length < 10) {
      return "Password needs to be at least 10 characters long.";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
      return "Password needs at least one special character.";
    }
    if (!/[A-Z]/.test(pass)) {
      return "Password needs at least one uppercase character.";
    }
    if (!/\d/.test(pass)) {
      return "Password needs at least one number.";
    }
    return "";
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
            <FormControl fullWidth>
              <TextField
                id="outlined-password-input"
                label="First name"
                type="text"
                name="firstName"
                onChange={handleUpdate}
                value={data.firstName}
              />
            </FormControl>

            {/* <input
              placeholder="Jane"
              onChange={handleUpdate}
              type="text"
              name="firstName"
              value={data.firstName}
            /> */}
          </div>
          <div className={styles.last}>
            <p>Last name</p>
            <FormControl fullWidth>
              <TextField
                id="outlined-password-input"
                label="Last name"
                type="text"
                name="lastName"
                onChange={handleUpdate}
                value={data.lastName}
              />
            </FormControl>

            {/* <input
              placeholder="Doe"
              onChange={handleUpdate}
              type="text"
              name="lastName"
              value={data.lastName}
            /> */}
          </div>
          <div className={styles.email}>
            <p>Email</p>
            <FormControl fullWidth>
              <TextField
                id="outlined-password-input"
                label="Email address"
                type="text"
                name="email"
                onChange={handleUpdate}
                value={data.email}
              />
            </FormControl>

            {/* <input
              placeholder="name@example.com"
              onChange={handleUpdate}
              type="text"
              name="email"
              onBlur={handleEmailBlur}
              value={data.email}
            /> */}
            {emailErr && <p>{emailErr}</p>}
          </div>
          <div className={styles.country}>
            <p>Country</p>

            <TextField
              id="outlined-password-input"
              label="Country"
              type="text"
              name="country"
              onChange={handleUpdate}
              value={data.country}
            />
            {/* <input
              placeholder="United States"
              onChange={handleUpdate}
              type="text"
              name="country"
              value={data.country}
            /> */}
          </div>
          <div className={styles.state}>
            <p>State</p>
            <TextField
              id="outlined-password-input"
              label="State"
              type="text"
              name="state"
              onChange={handleUpdate}
              value={data.state}
            />
            {/* <input
              placeholder="California"
              onChange={handleUpdate}
              type="text"
              name="state"
              value={data.state}
            /> */}
          </div>
          <div className={styles.city}>
            <p>City</p>
            <TextField
              id="outlined-password-input"
              label="City"
              type="text"
              name="city"
              onChange={handleUpdate}
              value={data.city}
            />
            {/* <input
              placeholder="San Luis Obispo"
              onChange={handleUpdate}
              type="text"
              name="city"
              value={data.city}
            /> */}
          </div>
          <div className={styles.zip}>
            <p>Zip Code</p>
            <TextField
              id="outlined-password-input"
              label="Zip code"
              type="text"
              name="zipcode"
              onChange={handleUpdate}
              value={data.zipcode}
            />
            {/* <input
              placeholder="11111"
              onChange={handleUpdate}
              type="text"
              name="zipcode"
              value={data.zipcode}
            /> */}
          </div>
          <div className={styles.user}>
            <p>Username</p>
            <FormControl fullWidth>
              <TextField
                id="outlined-password-input"
                label="Username"
                type="text"
                name="username"
                onChange={handleUpdate}
                value={data.username}
              />
            </FormControl>

            {/* <input
              placeholder="Enter username"
              onChange={handleUpdate}
              type="text"
              name="username"
              value={data.username}
            /> */}
          </div>
          <div className={styles.pass}>
            <p>Password</p>
            <FormControl fullWidth>
              <TextField
                error={!!passwordErr}
                helperText={passwordErr ? passwordErr : ""}
                id="outlined-password-input"
                label="Password"
                type="password"
                name="password"
                onBlur={handlePasswordBlur}
                onChange={handleUpdate}
                value={data.password}
              />
            </FormControl>

            {/*<input
              placeholder="Enter password"
              onChange={handleUpdate}
              onBlur={handlePasswordBlur}
              type="password"
              name="password"
              value={data.password}
            />
             */}
            {/* {passwordErr && <p>{passwordErr}</p>} */}
          </div>
          <div className={styles.confirmPass}>
            <p>Confirm password</p>
            <FormControl fullWidth>
              <TextField
                id="outlined-password-input"
                label="Confirm password"
                type="password"
              />
            </FormControl>

            {/* <input placeholder="Confirm password" type="password" /> */}
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
