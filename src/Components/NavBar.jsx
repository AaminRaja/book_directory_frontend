import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import navStyle from './NavBar.module.css'

const NavBar = ({fixPreviousPath}) => {
  let[placeHolderShow, setPlaceHolderShow] = useState(true)
  
  let inputRef = useRef(null)

  let navigateToHome = useNavigate()
  let navigateToAddBook = useNavigate()

  let location = useLocation();

  let toAllBook = () => {
    navigateToHome('/')
  }

  let getFromInput = (event) => {
    console.log(event.target.value);
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
  })
  return (
    <nav className={navStyle.nav}>
      <div className={navStyle.logoDiv} onClick={toAllBook}>
        <h3 className={navStyle.logo}><span className={navStyle.logoBook}>BOOK</span><span className={navStyle.logoDirectory}>DIRECTORY</span></h3>
      </div>
      <div className={navStyle.inputBtnDiv} >
        <input type="text" className={navStyle.input} placeholder={placeHolderShow ? 'Search Book' : ''} onClick={() => {setPlaceHolderShow(false)}} onChange={getFromInput} ref={inputRef} />
        <button className={navStyle.button}>SEARCH</button>
        {/* {addingBook ? <button className={`${navStyle.button} ${navStyle.addBookBtn}`} disabled>ADD A NEW BOOK</button> : <button className={`${navStyle.button} ${navStyle.addBookBtn}`} onClick={toAddBook}>ADD A NEW BOOK</button>} */}
        <button className={`${navStyle.button} ${navStyle.addBookBtn}`} onClick={toAddBook}>ADD A NEW BOOK</button>
      </div>
    </nav>
  )
}

export default NavBar
