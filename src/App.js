import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Searching from './Components/Searching';
import SelectBooks from './Components/SelectBooks';
import AllBooks from './Components/AllBooks';

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<AllBooks />} />
          <Route path="/searching" element={<Searching />} />
          <Route path="/sidebar" element={<SelectBooks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
