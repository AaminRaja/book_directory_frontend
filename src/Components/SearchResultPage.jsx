import React, { useEffect } from 'react'
import searchResultStyle from './SearchResultPage.module.css'
import { useNavigate } from 'react-router-dom'

const SearchResultPage = ({fixPreviousPath, booksBySearchInApp}) => {

    let navigateToSingleBook = useNavigate()

    let toSingleBook = (id) => {
        fixPreviousPath('/searchResultPage')
        navigateToSingleBook(`/singleBook/${id}`)
    }
    useEffect(() => {
        console.log(booksBySearchInApp.length);
        if(!booksBySearchInApp.length){
            navigateToSingleBook('/')
        }
    })
  return (
    <div className={searchResultStyle.searchResultContainer}>
      {booksBySearchInApp.map((book) => {
        return (
            <div className={searchResultStyle.singleBookDiv} onClick={() => {toSingleBook(book._id)}}>
                <div className={searchResultStyle.singleBookDivs}>
                    <h5 className={`${searchResultStyle.singleBookContents} ${searchResultStyle.sigleBookTitle}`}>{book.title}</h5>
                </div>
                <div className={searchResultStyle.singleBookDivs}>
                    <h5 className={`${searchResultStyle.singleBookContents} ${searchResultStyle.singleBookAuthor}`}>{book.author}</h5>
                </div>
                <div className={searchResultStyle.singleBookDivs}>
                    <h5 className={`${searchResultStyle.singleBookContents} ${searchResultStyle.singleBookCategory}`}>{book.category}</h5>
                </div>
                <div className={searchResultStyle.singleBookDivs}>
                    <h5 className={`${searchResultStyle.singleBookContents} ${searchResultStyle.singleBookLanguage}`}>{book.language}</h5>
                </div>
                <div className={searchResultStyle.singleBookDivs}>
                    <h5 className={`${searchResultStyle.singleBookContents} ${searchResultStyle.singleBookPublisher}`}>{book.publisher}</h5>
                </div>
                <div className={searchResultStyle.singleBookDivs}>
                    <h5 className={`${searchResultStyle.singleBookContents} ${searchResultStyle.singleBookEditor}`}>{book.edition}</h5>
                </div>
                <div className={searchResultStyle.singleBookDivs}>
                    <h5 className={`${searchResultStyle.singleBookContents} ${searchResultStyle.singleBookPrice}`}>Rs . {book.price}</h5>
                </div>
                <div className={searchResultStyle.singleBookDivs}>
                    <h5 className={`${searchResultStyle.singleBookContents} ${searchResultStyle.singleBookPiecesLeft}`}>{book.numberOfPieces} Pieces left</h5>
                </div>
            </div>
        )
      })}
    </div>
  )
}

export default SearchResultPage
