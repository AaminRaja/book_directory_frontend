import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import AllBooks from './Components/AllBooks';
import BottomNavBar from './Components/BottomNavBar';
import Categories from './Components/Categories';
import Languages from './Components/Languages';
import Publishers from './Components/Publishers';
import { useEffect, useState } from 'react';
import Authors from './Components/Authors';
import SingleBookDetails from './Components/SingleBookDetails';

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <BottomNavBar />
        <Routes>
          <Route path="/" element={<AllBooks />} />
          <Route path='/authors' element={<Authors />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/languages' element={<Languages />} />
          <Route path='/publishers' element={<Publishers />} />
          <Route path='/singleBook/:id' element={<SingleBookDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
