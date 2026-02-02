/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import styles from "./FrogetPassword.module.css";
import { emailRegex, passwordRegex } from "../../utils/Regex";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { motion } from "motion/react";

function ForgetPassword() {
  const [step, setStep] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      }}
      className={styles.container}
    >
      <div className={styles.formContainer}>
        <h2>Forgot Password...</h2>
        {step === 0 && <EmailComponent setStep={setStep} />}
        {step === 1 && <OTPComponent setStep={setStep} />}
        {step === 2 && <PasswordComponent />}
      </div>
    </motion.div>
  );
}

const EmailComponent = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // loading variable
  const getOTP = async () => {
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid Email Address.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/user/resetPassword`,
        { email },
      );
      toast.success(response.data.message);
      localStorage.setItem("email", email);
      setStep(1);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.inputContainer}>
      <input
        value={email}
        name="email"
        type="email"
        placeholder="Enter your email..."
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button disabled={isLoading} onClick={getOTP}>
        {isLoading ? <Loader /> : "GET OTP"}
      </button>
      <Link to={"/"}>Back to Login?</Link>
    </div>
  );
};

const OTPComponent = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [OTP, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false); // loading variable
  const verifyOtp = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/user/verifyPasswordOTP`,
        { OTP },
      );
      toast.success(response.data.message);
      setStep(2);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message + " Please try again");
      setStep(0);
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.inputContainer}>
      <input
        value={OTP}
        placeholder="Enter Your OTP..."
        type="text"
        onChange={(e) => setOTP(e.target.value)}
      />
      <button disabled={isLoading} onClick={verifyOtp}>
        {isLoading ? <Loader /> : "Verify OTP"}
      </button>
    </div>
  );
};

const PasswordComponent = () => {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // loading variable
  const navigate = useNavigate();
  const restPassword = async () => {
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must 8 characters long, Should contain Capital charater, Number, one Special character!",
      );
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/user/resetPassword`,
        { password, isOTPVerified: true, email: localStorage.getItem("email") },
      );

      toast.success(response.data.message);
      navigate("/");
      localStorage.removeItem("email");
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.PasswordContainer}>
      <div className={styles.passwordContainer}>
        <input
          value={password}
          name="password"
          type={show ? "text" : "password"}
          placeholder="Enter your new password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={() => setShow(!show)}>{show ? "HIDE" : "SHOW"}</button>
      </div>
      <div className={styles.inputContainer}>
        <button disabled={isLoading} onClick={restPassword}>
          {isLoading ? <Loader /> : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
