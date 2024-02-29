import styles from "./CreateAccount.module.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { FormControl, MenuItem, Select } from "@mui/material";

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
                id="firstName-input"
                label="First name"
                type="text"
                name="firstName"
                onChange={handleUpdate}
                value={data.firstName}
              />
            </FormControl>
          </div>
          <div className={styles.last}>
            <p>Last name</p>
            <FormControl fullWidth>
              <TextField
                id="lastName-input"
                label="Last name"
                type="text"
                name="lastName"
                onChange={handleUpdate}
                value={data.lastName}
              />
            </FormControl>
          </div>
          <div className={styles.email}>
            <p>Email</p>
            <FormControl fullWidth>
              <TextField
                id="email-input"
                label="Email address"
                type="text"
                name="email"
                onChange={handleUpdate}
                onBlur={handleEmailBlur}
                value={data.email}
              />
            </FormControl>
            {emailErr && <p>{emailErr}</p>}
          </div>
          <div className={styles.country}>
            <p>Country</p>
            <FormControl fullWidth>
              <Select
                labelId="country"
                id="country-input"
                name="country"
                value={data.country}
                label="Country"
                onChange={handleUpdate}
              >
                <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                <MenuItem value="Brazil">Brazil</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="China">China</MenuItem>
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="Indonesia">Indonesia</MenuItem>
                <MenuItem value="Pakistan">Pakistan</MenuItem>
                <MenuItem value="Mexico">Mexico</MenuItem>
                <MenuItem value="Nigeria">Nigeria</MenuItem>
                <MenuItem value="Russia">Russia</MenuItem>
                <MenuItem value="United States">United States</MenuItem>
              </Select>
            </FormControl>

            {/* <TextField
              id="outlined-password-input"
              label="Country"
              type="text"
              name="country"
              onChange={handleUpdate}
              value={data.country}
            /> */}
          </div>
          <div className={styles.state}>
            <p>State</p>
            <TextField
              id="state-input"
              label="State"
              type="text"
              name="state"
              onChange={handleUpdate}
              value={data.state}
            />
          </div>
          <div className={styles.city}>
            <p>City</p>
            <TextField
              id="city-input"
              label="City"
              type="text"
              name="city"
              onChange={handleUpdate}
              value={data.city}
            />
          </div>
          <div className={styles.zip}>
            <p>Zip Code</p>
            <TextField
              id="zipcode-input"
              label="Zip code"
              type="text"
              name="zipcode"
              onChange={handleUpdate}
              value={data.zipcode}
            />
          </div>
          <div className={styles.user}>
            <p>Username</p>
            <FormControl fullWidth>
              <TextField
                id="username-input"
                label="Username"
                type="text"
                name="username"
                onChange={handleUpdate}
                value={data.username}
              />
            </FormControl>
          </div>
          <div className={styles.pass}>
            <p>Password</p>
            <FormControl fullWidth>
              <TextField
                error={!!passwordErr}
                helperText={passwordErr ? passwordErr : ""}
                id="password-input"
                label="Password"
                type="password"
                name="password"
                onBlur={handlePasswordBlur}
                onChange={handleUpdate}
                value={data.password}
              />
            </FormControl>
          </div>
          <div className={styles.confirmPass}>
            <p>Confirm Password</p>
            <FormControl fullWidth>
              <TextField
                id="confirmPassword-input"
                label="Confirm password"
                type="password"
              />
            </FormControl>
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
