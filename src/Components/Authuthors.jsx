import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import authorsStyle from './Authuthors.module.css'

const Authuthors = () => {
    let[tenAuthorsList, setTenAuthorsList] = useState([])
    let[authorsList, setAuthorsList] = useState([])
    let[currentAuthor, setCurrentAuthor] = useState()
    let[authorBooks, setAuthorBooks] = useState([])
    let[placeHolderShow, setPlaceHolderShow] = useState(true)
    let[allAuthorsShow, setAllAuthorsShow] = useState(false)

    let inputRef = useRef(null)

    let fetchTenAuthorsList = async() => {
        try {
            // let response = await axios.get('https://book-directory-backend-17.onrender.com/book/tenAuthorsList')
            let {data} = await axios.get(`http://192.168.0.117:5100/book/tenAuthorsList`)
            console.log(data);
            setTenAuthorsList(data.tenAuthorsList)
        } catch (error) {
            console.log(error);
        }
    }

    let fetchAllAuthors = async() => {
        setAllAuthorsShow(true)
        try {
            let {data} = await axios.get(`http://192.168.0.117:5100/book/allAuthors`)
            console.log(data);
            setAuthorsList(data.authors)
        } catch (error) {
            console.log(error);
        }
    }

    let fetchAuthorBooks = async(bookAuthor) => {
        console.log(bookAuthor);
        setCurrentAuthor(bookAuthor)
        setAllAuthorsShow(false)
        localStorage.setItem('currentAuthor', JSON.stringify(bookAuthor))
        try {
            // let response = await axios.get('https://book-directory-backend-17.onrender.com/book/booksByAuthor')
            let {data} = await axios.get(`http://192.168.0.117:5100/book/booksByAuthor?author=${bookAuthor}`)
            console.log(data);
            setAuthorBooks(data.books)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTenAuthorsList()

        let currentAuthorInLocal = JSON.parse(localStorage.getItem('currentAuthor'))
        if(currentAuthorInLocal){
            setCurrentAuthor(currentAuthorInLocal)
            fetchAuthorBooks(currentAuthorInLocal)
        }else{
            fetchAuthorBooks(tenAuthorsList[0].author)
        }

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
        console.log(tenAuthorsList);
        console.log(placeHolderShow);
        console.log(currentAuthor);
        console.log(authorsList);
    })
  return (
    <div className={authorsStyle.authorsContainer}>
      <div className={authorsStyle.sideBar}>
            <div className={authorsStyle.titleDiv}>
                <h4 className={authorsStyle.title}>AUTHORS</h4>
            </div>
            <div className={authorsStyle.searchDiv}>
                <input type="text" className={authorsStyle.input} placeholder={placeHolderShow ? 'Search Book' : ''} onClick={() => {setPlaceHolderShow(false)}} ref={inputRef} />
                <button className={authorsStyle.button}>SEARCH</button>
            </div>
            {!allAuthorsShow &&
                <div className={authorsStyle.tenAuthorsDiv}>
                    {tenAuthorsList.map((author) => {
                        return (
                            <div className={authorsStyle.tenAuthorsSingleDiv} onClick={() => fetchAuthorBooks(author)}>
                                <h4 className={authorsStyle.tenAuthorsSingle}>{author}</h4>
                            </div>
                        )
                    })}
                    <div className={authorsStyle.tenAuthorsButtonDiv}>
                        <button className={authorsStyle.tenAuthorsButton} onClick={fetchAllAuthors}>All Authors List...</button>
                    </div>
                </div>
            }
            
      </div>
      {allAuthorsShow ?
      <div className={authorsStyle.allAuthorsPart}>
                <div className={authorsStyle.allAuthorsTitleDiv}>
                    <h4 className={authorsStyle.allAuthorsTitle}>Authors List</h4>
                </div>
                <div className={authorsStyle.alluthorsDiv}>
                    {authorsList.map((author) => {
                        return (
                            <div className={authorsStyle.allAuthorsSingleDiv} onClick={() => fetchAuthorBooks(author)}>
                                <h4 className={authorsStyle.allAuthorsSingle}>{author}</h4>
                            </div>
                        )
                    })}
                    <div className={authorsStyle.allAuthorsButtonDiv}>
                        <button className={authorsStyle.allAuthorsButton} onClick={() => {setAllAuthorsShow(false)}}>Clear Authors</button>
                    </div>
                </div>
      </div>
        
        :
      
      <div className={authorsStyle.booksAndTitleContainer}>
            <div className={authorsStyle.currentAuthorDiv}>
                <h3 className={authorsStyle.currentAuthor}>{currentAuthor}'s Books</h3>
            </div>
            <div className={authorsStyle.authorsBooksDiv}>
                {authorBooks.map((book) => {
                    return (
                        <div className={authorsStyle.singleBookDiv}>
                            <div className={authorsStyle.singleBookDivs}>
                                <h5 className={`${authorsStyle.singleBookContents} ${authorsStyle.sigleBookTitle}`}>{book.title}</h5>
                            </div>
                            <div className={authorsStyle.singleBookDivs}>
                                <h5 className={`${authorsStyle.singleBookContents} ${authorsStyle.singleBookAuthor}`}>{book.author}</h5>
                            </div>
                            <div className={authorsStyle.singleBookDivs}>
                                <h5 className={`${authorsStyle.singleBookContents} ${authorsStyle.singleBookCategory}`}>{book.category}</h5>
                            </div>
                            <div className={authorsStyle.singleBookDivs}>
                                <h5 className={`${authorsStyle.singleBookContents} ${authorsStyle.singleBookPublisher}`}>{book.publisher}</h5>
                            </div>
                            <div className={authorsStyle.singleBookDivs}>
                                <h5 className={`${authorsStyle.singleBookContents} ${authorsStyle.singleBookEditor}`}>{book.edition}</h5>
                            </div>
                            <div className={authorsStyle.singleBookDivs}>
                                <h5 className={`${authorsStyle.singleBookContents} ${authorsStyle.singleBookPrice}`}>Rs . {book.price}</h5>
                            </div>
                            <div className={authorsStyle.singleBookDivs}>
                                <h5 className={`${authorsStyle.singleBookContents} ${authorsStyle.singleBookPiecesLeft}`}>{book.numberOfPieces} Pieces left</h5>
                            </div>
                        </div>
                    )
                })}
            </div>
            
      </div>
      }
    </div>
  )
}

export default Authuthors
