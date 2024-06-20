import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored"></ToastContainer>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/registration' element={<Registration />}></Route>
      </Routes>
    </div>
  );
}

export default App;
