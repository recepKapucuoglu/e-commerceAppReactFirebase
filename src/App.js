import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Componentler buradadır. Klasöründeki index.js'ten gönderildi.
import { Header, Footer } from './components/index';
// Pageler buradadır. Klasöründeki index.js'ten gönderildi.
import { Home, Contact, Login, Register, Reset, Admin } from './pages/index';
import { ToastContainer } from 'react-toastify';
import GuardRoute from './pages/auth/GuardRoute';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './redux/slice/authSlice';
import AdminOnlyRoute from './components/adminOnlyRoute/AdminOnlyRoute';

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <GuardRoute isLoggedIn={isLoggedIn == false}>
                <Register />
              </GuardRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuardRoute isLoggedIn={isLoggedIn == false}>
                <Login />
              </GuardRoute>
            }
          />

          <Route
            path="/contact"
            element={
              <GuardRoute isLoggedIn={isLoggedIn == true}>
                <Contact />
              </GuardRoute>
            }
          />

          <Route
            path="/reset"
            element={
              <GuardRoute isLoggedIn={isLoggedIn == false}>
                <Reset />
              </GuardRoute>
            }
          />

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
