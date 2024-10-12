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
import SearchResultPage from './Components/SearchResultPage';

function App() {
  let [previousPath, setPrevPath] = useState()
  let [booksBySearchInApp, setBooksBySearchInApp] = useState([])
  let [noDataOrNotValidInputError, setNoDataOrNotValidinputError] = useState(false)
  // let[addingBook, setAddingBook] = useState(false)

  let fixPreviousPath = (path) => {
    setPrevPath(path)
  }

  let getBooksFromNav = (booksFromNavBar) => {
    console.log(booksFromNavBar);
    setBooksBySearchInApp([...booksFromNavBar])
  }

  let getErrorFromNav = (errorStatus) => {
    setNoDataOrNotValidinputError(errorStatus)
  }

  // let fixAddingBook = (data) => {
  //   setAddingBook(data)
  // }

  useEffect(() => {
    console.log(booksBySearchInApp);
  })

  return (
    <div>
      <BrowserRouter>
        <NavBar fixPreviousPath={fixPreviousPath} getBooksFromNav={getBooksFromNav} getErrorFromNav={getErrorFromNav} />
        <BottomNavBar />
        <Routes>
          <Route path="/" element={<AllBooks fixPreviousPath={fixPreviousPath} noDataOrNotValidInputError={noDataOrNotValidInputError} />} />
          <Route path='/searchResultPage' element={<SearchResultPage fixPreviousPath={fixPreviousPath} booksBySearchInApp={booksBySearchInApp} />} />
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
