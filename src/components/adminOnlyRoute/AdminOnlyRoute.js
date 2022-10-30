import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/slice/authSlice';

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === 'hakanak1453@gmail.com') {
    return children;
  }
  return (
    <section style={{ height: '80vh' }}>
      <div className="container">
        <h2>Permission Denied!</h2>
        <p>This page can only be viewed by admin! </p>
        <br />
        <Link to="/">
          <button className="--btn">Back To Home Page</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === 'hakanak1453@gmail.com') {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
