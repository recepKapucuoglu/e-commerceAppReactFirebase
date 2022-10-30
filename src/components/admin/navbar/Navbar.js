import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../../redux/slice/authSlice';
import styles from './Navbar.module.scss';

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '');

const Navbar = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="white" />
        <h5 style={{ letterSpacing: '3px' }}>{userName}</h5>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
            <NavLink to="/admin/all-products" className={activeLink}>
              All Products
            </NavLink>
            <NavLink to="/admin/add-products/ADD" className={activeLink}>
              Add Product
            </NavLink>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
