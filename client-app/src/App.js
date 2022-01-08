import { CheckLoggedIn } from './redux/slices/authenticationSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import Manage from './components/Manage';
import Login from './components/Login';
import Home from './components/Home';
import Cart from './components/Cart';
import Menu from './components/Menu';
import './App.css';

function App()
{
  const dispatch = useDispatch();

  useEffect(() =>
  {
    dispatch(CheckLoggedIn());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>


      <ToastContainer
        position="top-center"
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
