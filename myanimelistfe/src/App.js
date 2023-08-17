import logo from './logo.svg';
import './App.css';
import {Home} from './pages/Home'
import {Login} from './pages/Login'
import {NotFound} from './pages/NotFound'
import {BrowserRouter as Router,Routes,Route, useRoutes} from 'react-router-dom';
import RoutesMap from './RoutesMap.js';

function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/login" element={<Login />}/>
    <Route path ="/test" element={<NotFound />}/>  
    {/* <Route path="/home">
        <Home />
    </Route>
    <Route >
        <NotFound />
    </Route> */}
</Routes>
</Router>
  );
}

export default App;
