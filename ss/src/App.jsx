import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Home/Navbar';
import Home from './Components/Home/Home';
import {Route,Routes} from 'react-router-dom';
import Login from './Components/LogReg/Login';
import Register from './Components/LogReg/Register';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>  
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
