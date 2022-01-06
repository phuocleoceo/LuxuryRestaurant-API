import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Menu from './components/Menu';
import './App.css';

function App()
{
  return (
    <>
      <BrowserRouter>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="menu" element={<Menu />} />
        </Routes>
      </BrowserRouter>


      <ToastContainer
        position="top-center"
        autoClose={3000}
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
