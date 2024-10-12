import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import navStyle from './NavBar.module.css'
import axios from 'axios'

const NavBar = ({fixPreviousPath, getBooksFromNav, getErrorFromNav}) => {
  let[placeHolderShow, setPlaceHolderShow] = useState(true)
  let[title, setTitle] = useState()
  // let[validTitleError, setValidTitleError] = useState(false)
  // let[noDataError, setNoDataError] = useState(false)
  // let[booksBySearch, setBooksBySearch] = useState([])
  
  let inputRef = useRef(null)

  let navigateToHome = useNavigate()
  let navigateToAddBook = useNavigate()
  let navigateToAll = useNavigate()

  let location = useLocation();

  let toAllBook = () => {
    getErrorFromNav(false)
    navigateToHome('/')
  }

  let getFromInput = ({target}) => {
    console.log(target.value);
    setTitle(target.value.trim())
    // setValidTitleError(false)
  }
  let serachingTitle = async() => {
    console.log("Searching title");
    console.log(title);
    try {
      if(title){
        let {data} = await axios.get(`http://192.168.0.117:5100/book/booksByTitle?title=${title}`)
        // console.log(response);
        console.log(data);
        // setBooksBySearch(data.books)
        if(!data.error){
          getBooksFromNav(data.books)
          setTitle('')
          navigateToAll('/searchResultPage')
        }else{
          console.log('Reaching here');
          getErrorFromNav(true)
          navigateToAll('/')
          // setNoDataError(true)
        }
      }else{
        getErrorFromNav(true)
        // setValidTitleError(true)
        navigateToAll('/')
      }
    } catch (error) {
      console.log(error);
    }
  }

  let toAddBook = () => {
    console.log(location.pathname);
    if(location.pathname !== '/addNewBook'){
      fixPreviousPath(`${location.pathname}`)
      navigateToAddBook('/addNewBook')
    }
  }

  useEffect(() => {
    let handleClickOutside = (event) => {
      if(inputRef.current && !inputRef.current.contains(event.target)){
        console.log('Clicking');
        setPlaceHolderShow(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    console.log(placeHolderShow);
    // console.log(booksBySearch);
  })
  return (
    <nav className={navStyle.nav}>
      <div className={navStyle.logoDiv} onClick={toAllBook}>
        <h3 className={navStyle.logo}><span className={navStyle.logoBook}>BOOK</span><span className={navStyle.logoDirectory}>DIRECTORY</span></h3>
      </div>
      <div className={navStyle.inputBtnDiv} >
        {/* <input type="text" className={navStyle.input} placeholder={placeHolderShow ? 'Search Book' : ''} onClick={() => {setPlaceHolderShow(false)}} onChange={getFromInput} ref={inputRef} /> */}
        <input type="text" className={navStyle.input} placeholder={placeHolderShow ? 'Search Book' : ''} onClick={() => {setPlaceHolderShow(false)}} onChange={getFromInput} ref={inputRef} value={title} />
        <button className={navStyle.button} onClick={serachingTitle}>SEARCH</button>
        {/* {addingBook ? <button className={`${navStyle.button} ${navStyle.addBookBtn}`} disabled>ADD A NEW BOOK</button> : <button className={`${navStyle.button} ${navStyle.addBookBtn}`} onClick={toAddBook}>ADD A NEW BOOK</button>} */}
        <button className={`${navStyle.button} ${navStyle.addBookBtn}`} onClick={toAddBook}>ADD A NEW BOOK</button>
      </div>
    </nav>
  )
}

export default NavBar
