import { CheckLoggedIn } from './redux/slices/authenticationSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateFood from './components/ManageFood/CreateFood';
import EditFood from './components/ManageFood/EditFood';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from './components/Other/NotFound';
import ManageOrder from './components/ManageOrder';
import ManageFood from './components/ManageFood';
import Navigation from './components/Navigation';
import ManageUser from './components/ManageUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './components/Checkout';
import Register from './components/Register';
import React, { useEffect } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Cart from './components/Cart';
import Menu from './components/Menu';
import './App.css';

function App()
{
  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication);

  useEffect(() =>
  {
    dispatch(CheckLoggedIn());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navigation />

        <Routes>
          <Route path="" element={<Home />} />
          <Route path="menu" element={<Menu />} />
          {
            user.role === "admin" &&
            <Route path="manage">
              <Route path="food" element={<ManageFood />} />
              <Route path="food/create" element={<CreateFood />} />
              <Route path="food/edit/:foodId" element={<EditFood />} />

              <Route path="order" element={<ManageOrder />} />
              <Route path="user" element={<ManageUser />} />
            </Route>
          }
          {
            user.id &&
            <Route path="checkout" element={<Checkout />} />
          }
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>


      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
