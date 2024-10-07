import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Searching from './Searching';
import SelectBooks from './SelectBooks';

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/searching" element={<Searching/>}/>
          <Route path="/sidebar" element={<SelectBooks/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
