import { useEffect, useState, type ChangeEvent } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { emailRegex, passwordRegex } from "../../utils/Regex";
import Loader from "../Loader/Loader";
import { motion } from "motion/react";
interface User {
  email: string;
  username: string;
}
const Home = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isloading, setIsLoading] = useState(false);

  const [isEdit, setIsEdit] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const getUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/user/`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      // console.log(response);
      setUser(response.data.user);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setNewUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const updateUserData = async (type: string) => {
    if (!emailRegex.test(newUserData.email) && type === "email") {
      toast.error("Please enter valid email!");
      return;
    }
    if (!passwordRegex.test(newUserData.password) && type === "password") {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      );
      return;
    }
    if (!newUserData.username && type === "username") {
      toast.error("Name Filed can not be Empty.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_SERVER_URL}/user/updateUser`,
        { type, newUserData },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      toast.success(response.data.message);
      setIsEdit({ email: false, password: false, username: false });
      setNewUserData({ email: "", password: "", username: "" });
      getUser();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      //toast.error(error.response.data.message);
    }
  };
  return (
    <div className={styles.container}>
      {user && (
        <nav>
          <span>Hello {user.username}</span>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
              toast.success("User Logged Out.");
            }}
            className={styles.logoutBtn}
          >
            LOGOUT
          </button>
        </nav>
      )}
      {user && (
        <div className={styles.mainContainer}>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 1,
            }}
            className={styles.user}
          >
            <h3>User Details</h3>
            <p>Name : {user.username}</p>
            <p>Email : {user.email}</p>
          </motion.div>
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
            className={styles.editContainer}
          >
            <h2>Update User</h2>
            <div>
              <input
                name="username"
                value={newUserData.username}
                onChange={handleChange}
                disabled={!isEdit.username}
                placeholder="Update Username"
                type="text"
              />
              <button
                onClick={() => {
                  setIsEdit((prev) => ({ ...prev, username: true }));
                }}
                className={styles.edit}
              >
                EDIT
              </button>
              {isEdit.username && (
                <div className={styles.buttons}>
                  {isloading ? (
                    <Loader />
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          updateUserData("username");
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsEdit((prev) => ({ ...prev, username: false }));
                          setNewUserData((prev) => ({ ...prev, username: "" }));
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            <div>
              <input
                name="email"
                value={newUserData.email}
                onChange={handleChange}
                disabled={!isEdit.email}
                placeholder="Update Email"
                type="text"
              />
              <button
                onClick={() => {
                  setIsEdit((prev) => ({ ...prev, email: true }));
                }}
                className={styles.edit}
              >
                EDIT
              </button>
              {isEdit.email && (
                <div className={styles.buttons}>
                  {isloading ? (
                    <Loader />
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          updateUserData("email");
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsEdit((prev) => ({ ...prev, email: false }));
                          setNewUserData((prev) => ({ ...prev, email: "" }));
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className={styles.passwordEdit}>
              <div className={styles.passwordContainer}>
                <input
                  name="password"
                  value={newUserData.password}
                  onChange={handleChange}
                  disabled={!isEdit.password}
                  placeholder="Update Password"
                  type={show ? "password" : "text"}
                />
                <button onClick={() => setShow(!show)}>
                  {show ? "SHOW" : "HIDE"}
                </button>
              </div>
              <button
                onClick={() => {
                  setIsEdit((prev) => ({ ...prev, password: true }));
                }}
                className={styles.edit}
              >
                EDIT
              </button>
            </div>
            {isEdit.password && (
              <div className={styles.buttons}>
                {isloading ? (
                  <Loader />
                ) : (
                  <>
                    <button
                      onClick={() => {
                        updateUserData("password");
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEdit((prev) => ({ ...prev, password: false }));
                        setNewUserData((prev) => ({ ...prev, password: "" }));
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;
