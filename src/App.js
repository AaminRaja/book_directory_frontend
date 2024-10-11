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
import UpdateSection from './Components/UpdateSection';
import AddABook from './Components/AddABook';

function App() {
  let [previousPath, setPrevPath] = useState()
  // let[addingBook, setAddingBook] = useState(false)

  let fixPreviousPath = (path) => {
    setPrevPath(path)
  }

  // let fixAddingBook = (data) => {
  //   setAddingBook(data)
  // }

  return (
    <div>
      <BrowserRouter>
        <NavBar fixPreviousPath={fixPreviousPath} />
        <BottomNavBar />
        <Routes>
          <Route path="/" element={<AllBooks fixPreviousPath={fixPreviousPath} />} />
          <Route path='/authors' element={<Authors fixPreviousPath={fixPreviousPath} />} />
          <Route path='/categories' element={<Categories fixPreviousPath={fixPreviousPath} />} />
          <Route path='/languages' element={<Languages fixPreviousPath={fixPreviousPath} />} />
          <Route path='/publishers' element={<Publishers fixPreviousPath={fixPreviousPath} />} />
          <Route path='/singleBook/:id' element={<SingleBookDetails previousPath={previousPath} fixPreviousPath={fixPreviousPath} />} />
          <Route path='/updateBook/:id' element={<UpdateSection previousPath={previousPath} />} />
          <Route path='/addNewBook' element={<AddABook previousPath={previousPath} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
