import styles from "./SignIn.module.css";
import React, { useState } from "react";

interface signInProps {
  setCreateAccountOpen?: (e: boolean) => void;
}
interface signInData {
  username: string;
  password: string;
}
const SignIn = ({ setCreateAccountOpen }: signInProps) => {
  const [signInData, setSignInData] = useState<signInData>({
    username: "",
    password: "",
  });
  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send to back end
    console.log(signInData);
    setSignInData({ username: "", password: "" });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.body}>
        <div className={styles.username}>
          <p>Username</p>
          <input
            placeholder="Enter username"
            onChange={handleUpdate}
            type="text"
            name="username"
            value={signInData.username}
          />
        </div>
        <div className={styles.password}>
          <p>Password</p>
          <input
            placeholder="Enter password"
            onChange={handleUpdate}
            type="password"
            name="password"
            value={signInData.password}
          />
        </div>
        <button className={styles.button} type="submit">
          Sign In
        </button>
        {setCreateAccountOpen && (
          <p>
            Not registered?
            <span
              onClick={() => {
                setCreateAccountOpen(true);
              }}
            >
              {" "}
              <a>Create an account here</a>
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default SignIn;
