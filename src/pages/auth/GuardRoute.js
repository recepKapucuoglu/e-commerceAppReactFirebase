import { Navigate } from 'react-router-dom';
const GuardRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default GuardRoute;
