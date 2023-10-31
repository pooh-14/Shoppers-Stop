import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import {Route,Routes} from 'react-router-dom';
import Login from './Components/LogReg/Login';
import Register from './Components/LogReg/Register';
import Multiple from './Components/Categories/Multiple';
import Single from './Components/Categories/Single';
import Cart from './Components/Cart/Cart';
import { useContext } from 'react';
import Navbar from './Components/Home/Navbar';
import { AuthContext } from './Context/AuthContext';

function App() {
  const { state } = useContext(AuthContext);
  return (
    <div>
      <Navbar/> 
      <Routes>
        <Route exact path='/' element={<Home/>}/>  
        {/* <Route exact path='/login' element={<Login/>}/> */}
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/multiple' element={<Multiple/>}/> 
        <Route exact path='/single/:id' element={<Single/>}/>  
        <Route exact path='/cart' element={<Cart/>}/>  

      </Routes>
    </div>
  );
}

export default App;
