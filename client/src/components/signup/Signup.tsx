/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import styles from "./Signup.module.css";
import { useState, type ChangeEvent } from "react";
import { emailRegex, passwordRegex } from "../../utils/Regex";

import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../Loader/Loader";
import { motion } from "motion/react";

const Signup = () => {
  const [userDetail, setUserDetail] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // loading variable

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    //console.log(event.target.value);
    const { name, value } = event.target;
    setUserDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSingup = async () => {
    if (!userDetail.username) {
      toast.error("Please enter username!");
      return;
    }
    if (!emailRegex.test(userDetail.email)) {
      toast.error("Please enter valid email!");
      return;
    }
    if (!passwordRegex.test(userDetail.password)) {
      toast.error(
        "Password must 8 characters long, Should contain Capital charater, Number, one Special character!",
      );
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/user/register`,
        userDetail,
      );
      toast.success(response.data.message);

      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
      setIsLoading(false);
    }

    //toast.success("Submit Successfully!");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      }}
      className={styles.container}
    >
      <div className={styles.formContainer}>
        <h2>Sign Up...</h2>
        <div className={styles.inputContainer}>
          <input
            value={userDetail.username}
            name="username"
            type="username"
            placeholder="Enter your username..."
            onChange={handleInputChange}
          />
          <input
            value={userDetail.email}
            name="email"
            type="email"
            placeholder="Enter your email..."
            onChange={handleInputChange}
          />
          <div className={styles.passwordContainer}>
            <input
              value={userDetail.password}
              name="password"
              type={show ? "text" : "password"}
              placeholder="Enter your password..."
              onChange={handleInputChange}
            />
            <button onClick={() => setShow(!show)}>
              {show ? "HIDE" : "SHOW"}
            </button>
          </div>
          <button style={{ fontSize: "20px" }} onClick={handleSingup}>
            {isLoading ? <Loader /> : "Sign Up"}
          </button>
        </div>
        <Link to={"/"}>Already have an Account? Login</Link>
      </div>
    </motion.div>
  );
};

export default Signup;
