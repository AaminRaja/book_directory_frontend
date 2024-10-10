import React, { useEffect, useState } from 'react'
import publisherStyle from './Publishers.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Publishers = () => {
  let[publisherList, setPublisherList] = useState([])
  let[publisherBooksList, setPublisherBookList] = useState([])
  let[currentPublisher, setCurrentPublisher] = useState()

  let navigateToSingleBook = useNavigate()

  let fetchAllPublishers = async() => {
    try {
      let {data} = await axios.get(`http://192.168.0.117:5100/book/allPublishers`)
      console.log(data);
      setPublisherList(data.publishers)
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  let fetchBooksByPublisher = async(bookPublisher) => {
    // bookCategory = JSON.stringify(bookCategory)
    localStorage.setItem('currentPublisher', bookPublisher)
    setCurrentPublisher(bookPublisher)
    try {
      let {data} = await axios.get(`http://192.168.0.117:5100/book/booksByPublisher?publisher=${bookPublisher}`)
      console.log(data);
      setPublisherBookList(data.books)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllPublishers()
  }, [])

  useEffect(() => {
    let publisherInLocal = localStorage.getItem('currentPublisher')
    if(publisherInLocal && publisherInLocal !== "undefined"){
      setCurrentPublisher(publisherInLocal)
      fetchBooksByPublisher(publisherInLocal)
    }else{
      fetchBooksByPublisher(publisherList[0])
    }
  }, [publisherList])

  useEffect(() => {
    console.log(publisherList);
    console.log(publisherBooksList);
    console.log(localStorage.getItem('currentPublisher'));
  })
  return (
    <div className={publisherStyle.publishersContainer}>
      <div className={publisherStyle.publisherSideBar}>
        <div className={publisherStyle.publisherSideTitleDiv}>
          <h4 className={publisherStyle.publisherSideTitle}>PUBLISHERS</h4>
        </div>
        <div className={publisherStyle.sideBarPublishersListDiv}>
          {publisherList.map((publisher) => {
            return (
              <div className={publisherStyle.sideBarPublishersSingleDiv} onClick={() => {fetchBooksByPublisher(publisher)}}>
                <h5 className={publisherStyle.sideBarPublishersSingle}>{publisher}</h5>
              </div>
            )
          })}
        </div>
      </div>
      {/* &&& */}
      <div className={publisherStyle.booksAndTitleContainer}>
              <div className={publisherStyle.currentPublisherDiv}>
                  <h3 className={publisherStyle.currentPublisher}>Publisher : {currentPublisher}</h3>
              </div>
              <div className={publisherStyle.publishersBooksDiv}>
                  {publisherBooksList?.map((book) => {
                      return (
                          <div className={publisherStyle.singleBookDiv} onClick={() => {navigateToSingleBook(`/singleBook/${book._id}`)}}>
                              <div className={publisherStyle.singleBookDivs}>
                                  <h5 className={`${publisherStyle.singleBookContents} ${publisherStyle.sigleBookTitle}`}>{book.title}</h5>
                              </div>
                              <div className={publisherStyle.singleBookDivs}>
                                  <h5 className={`${publisherStyle.singleBookContents} ${publisherStyle.singleBookAuthor}`}>{book.author}</h5>
                              </div>
                              <div className={publisherStyle.singleBookDivs}>
                                  <h5 className={`${publisherStyle.singleBookContents} ${publisherStyle.singleBookCategory}`}>{book.category}</h5>
                              </div>
                              <div className={publisherStyle.singleBookDivs}>
                                  <h5 className={`${publisherStyle.singleBookContents} ${publisherStyle.singleBookLanguage}`}>{book.language}</h5>
                              </div>
                              <div className={publisherStyle.singleBookDivs}>
                                  <h5 className={`${publisherStyle.singleBookContents} ${publisherStyle.singleBookPublisher}`}>{book.publisher}</h5>
                              </div>
                              <div className={publisherStyle.singleBookDivs}>
                                  <h5 className={`${publisherStyle.singleBookContents} ${publisherStyle.singleBookEditor}`}>{book.edition}</h5>
                              </div>
                              <div className={publisherStyle.singleBookDivs}>
                                  <h5 className={`${publisherStyle.singleBookContents} ${publisherStyle.singleBookPrice}`}>Rs . {book.price}</h5>
                              </div>
                              <div className={publisherStyle.singleBookDivs}>
                                  <h5 className={`${publisherStyle.singleBookContents} ${publisherStyle.singleBookPiecesLeft}`}>{book.numberOfPieces} Pieces left</h5>
                              </div>
                          </div>
                      )
                  })}
              </div>
                
      </div>
    </div>
  )
}

export default Publishers
