import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import allBooksStyle from './AllBooks.module.css'
import { useLocation, useNavigate } from 'react-router-dom'

const AllBooks = ({fixPreviousPath, noDataOrNotValidInputError}) => {
    let[allBooks, setAllBooks] = useState([])

    let navigateToSingleBook = useNavigate()

    let fetchAllBooks = async() => {
        try {
            // let response = await axios.get('https://book-directory-backend-17.onrender.com/book/allBooks')
            let response = await axios.get('http://192.168.0.117:5100/book/allBooks')
            console.log(response);
            setAllBooks(response.data.books)
        } catch (error) {
            console.log(error);
        }
    }

    let toSingleBook = (id) => {
        fixPreviousPath('/')
        navigateToSingleBook(`/singleBook/${id}`)
    }

    useEffect(() => {
            fetchAllBooks()
    }, [])

    useEffect(() => {
        console.log(allBooks);
        console.log(noDataOrNotValidInputError);
    })
  return (
    <div className={allBooksStyle.allBooksContainer}>
      {noDataOrNotValidInputError ? <div className={allBooksStyle.errorMsgDiv}><h4 className={allBooksStyle.errorMsg}>Zero Books For This Title</h4></div> : 
      <div className={allBooksStyle.allBookDiv}>
        {allBooks.map((book) => {
          return (
              <div className={allBooksStyle.singleBookDiv} onClick={() => {toSingleBook(book._id)}}>

                  <div className={allBooksStyle.singleBookDivs}>
                      <h5 className={`${allBooksStyle.singleBookContents} ${allBooksStyle.sigleBookTitle}`}>{book.title}</h5>
                  </div>
                  <div className={allBooksStyle.singleBookDivs}>
                      <h5 className={`${allBooksStyle.singleBookContents} ${allBooksStyle.singleBookAuthor}`}>{book.author}</h5>
                  </div>
                  <div className={allBooksStyle.singleBookDivs}>
                      <h5 className={`${allBooksStyle.singleBookContents} ${allBooksStyle.singleBookCategory}`}>{book.category}</h5>
                  </div>
                  <div className={allBooksStyle.singleBookDivs}>
                      <h5 className={`${allBooksStyle.singleBookContents} ${allBooksStyle.singleBookLanguage}`}>{book.language}</h5>
                  </div>
                  <div className={allBooksStyle.singleBookDivs}>
                      <h5 className={`${allBooksStyle.singleBookContents} ${allBooksStyle.singleBookPublisher}`}>{book.publisher}</h5>
                  </div>
                  <div className={allBooksStyle.singleBookDivs}>
                      <h5 className={`${allBooksStyle.singleBookContents} ${allBooksStyle.singleBookEditor}`}>{book.edition}</h5>
                  </div>
                  <div className={allBooksStyle.singleBookDivs}>
                      <h5 className={`${allBooksStyle.singleBookContents} ${allBooksStyle.singleBookPrice}`}>Rs . {book.price}</h5>
                  </div>
                  <div className={allBooksStyle.singleBookDivs}>
                      <h5 className={`${allBooksStyle.singleBookContents} ${allBooksStyle.singleBookPiecesLeft}`}>{book.numberOfPieces} Pieces left</h5>
                  </div>
              </div>
          )
        })}
      </div>}
    </div>
  )
}

export default AllBooks
