import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.scss';
import regImg from '../../assets/register.png';
import Card from '../../components/card/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import Loader from '../../components/loader/Loader';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/slice/authSlice';
import ShowOnLogin, {
  ShowOnLogout,
} from '../../components/hiddenLink/hiddenLink';

const Register = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log(isLoggedIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    // console.log(email, password, cPassword);
    if (password !== cPassword) {
      toast.error("Passwords don't matching!!");
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success('Registeration is Success...');
        navigate('/login');
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      console.log(isLoggedIn);
      navigate('/');
    } else {
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      {isLoading && <Loader />}
      <ShowOnLogin>
        <div>
          <h1>Zaten giriş yaptınız :)))</h1>
        </div>
      </ShowOnLogin>
      <ShowOnLogout>
        <section className={`container ${styles.auth}`}>
          <Card>
            <div className={styles.form}>
              <h2>Register Page</h2>

              <form onSubmit={registerUser}>
                <input
                  type="email"
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
                <input
                  type="password"
                  placeholder="Please confirm your password"
                  required
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="--btn --btn-primary --btn-block"
                >
                  Register
                </button>
              </form>
              <span className={styles.register}>
                <p>Already an account?</p>
                <Link to="/login">Login</Link>
              </span>
            </div>
          </Card>
          <div className={styles.img}>
            <img src={regImg} alt="Register" width="500" />
          </div>
        </section>
      </ShowOnLogout>
    </>
  );
};

export default Register;
