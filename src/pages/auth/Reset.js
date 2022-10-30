import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import resImg from '../../assets/forgot.png';
import Card from '../../components/card/Card';
import Loader from '../../components/loader/Loader';
import { auth } from '../../firebase/config';
import styles from './auth.module.scss';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success('Check your email box!');
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resImg} alt="Reset Password" width="500" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login Page</h2>

            <form onSubmit={resetPassword}>
              <input
                type="text"
                placeholder="Please enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button type="submit" className="--btn --btn-primary --btn-block">
                Reset Password
              </button>
              <div className={styles.links}>
                <p>
                  <Link to="/login">- Login</Link>
                </p>
                <p>
                  <Link to="/register">- Register</Link>
                </p>
                {/* <p>-- or --</p> */}
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Reset;
