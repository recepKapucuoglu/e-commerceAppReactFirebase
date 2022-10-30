import React, { useState } from 'react';
import styles from './auth.module.scss';
import loginImg from '../../assets/login.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import Card from '../../components/card/Card';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success('Login Succesfully..');
        navigate('/');
      })
      .catch((error) => {
        setIsLoading(false);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        toast.error(error.message);
      });
  };

  const provider = new GoogleAuthProvider();
  // Login With Google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        toast.success('Login Successful');
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      {isLoading && <Loader />}

      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="500" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login Page</h2>

            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Please enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Please enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div>
                <Link to="/reset">Reset your password</Link>
              </div>
              <p>-- or --</p>
              <button
                className="--btn --btn-danger --btn-block"
                onClick={signInWithGoogle}
              >
                <FaGoogle color="" style={{ marginRight: '5px' }} /> Login With
                Google
              </button>
            </form>
            <span className={styles.register}>
              <p>Don't you have an account?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
