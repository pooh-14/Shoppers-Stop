import logo from './logo.svg';
import './App.css';
// import Navbar from './Components/Home/Navbar';
import Home from './Components/Home/Home';
import {Route,Routes} from 'react-router-dom';
import Login from './Components/LogReg/Login';
import Register from './Components/LogReg/Register';
import Multiple from './Components/Categories/Multiple';
import Single from './Components/Categories/Single';

function App() {
  return (
    <div>
      {/* <Navbar/> */}
      <Routes>
        <Route exact path='/' element={<Home/>}/>  
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/multiple' element={<Multiple/>}/> 
        <Route exact path='/single/:id' element={<Single/>}/>  
      </Routes>
    </div>
  );
}

export default App;
