import React, { useEffect, useState } from 'react'
import languageStyle from './Languages.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Languages = () => {
  let[languagesList, setLanguagesList] = useState([])
  let[languageBooksList, setLanguageBooksList] = useState([])
  let[currentLanguage, setCurrentLanguage] = useState()

  let navigateToSingleBook = useNavigate()

  let fetchAllLanguages = async() => {
    try {
      let {data} = await axios.get(`http://192.168.0.117:5100/book/allLanguages`)
      console.log(data);
      setLanguagesList(data.languages)
    } catch (error) {
      console.log(error);
    }
  }

  let fetchBooksByLanguage = async(bookLanguage) => {
    // bookCategory = JSON.stringify(bookCategory)
    localStorage.setItem('currentLanguage', bookLanguage)
    setCurrentLanguage(bookLanguage)
    try {
      let {data} = await axios.get(`http://192.168.0.117:5100/book/booksByLanguage?language=${bookLanguage}`)
      console.log(data);
      setLanguageBooksList(data.books)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllLanguages()
  }, [])

  useEffect(() => {
    let languageInLocal = localStorage.getItem('currentLanguage')
    if(languageInLocal && languageInLocal !== "undefined"){
      setCurrentLanguage(languageInLocal)
      fetchBooksByLanguage(languageInLocal)
    }else{
      fetchBooksByLanguage(languagesList[0])
    }
  }, [languagesList])

  useEffect(() => {
    console.log(languagesList);
    console.log(languageBooksList);
    // console.log(JSON.parse(localStorage.getItem('currentLanguage')));
  })
  return (
    <div className={languageStyle.languagesContainer}>
      <div className={languageStyle.languageSideBar}>
        <div className={languageStyle.languageSideTitleDiv}>
          <h4 className={languageStyle.languageSideTitle}>LANGUAGES</h4>
        </div>
        <div className={languageStyle.sideBarLanguagesListDiv}>
          {languagesList.map((language) => {
            return (
              <div className={languageStyle.sideBarLanguagesSingleDiv} onClick={() => {fetchBooksByLanguage(language)}}>
                <h5 className={languageStyle.sideBarLanguagesSingle}>{language}</h5>
              </div>
            )
          })}
        </div>
      </div>
      {/* &&& */}
      <div className={languageStyle.booksAndTitleContainer}>
              <div className={languageStyle.currentLanguageDiv}>
                  <h3 className={languageStyle.currentLanguage}>Language : {currentLanguage}</h3>
              </div>
              <div className={languageStyle.languagesBooksDiv}>
                  {languageBooksList?.map((book) => {
                      return (
                          <div className={languageStyle.singleBookDiv} onClick={() => {navigateToSingleBook(`/singleBook/${book._id}`)}}>
                              <div className={languageStyle.singleBookDivs}>
                                  <h5 className={`${languageStyle.singleBookContents} ${languageStyle.sigleBookTitle}`}>{book.title}</h5>
                              </div>
                              <div className={languageStyle.singleBookDivs}>
                                  <h5 className={`${languageStyle.singleBookContents} ${languageStyle.singleBookAuthor}`}>{book.author}</h5>
                              </div>
                              <div className={languageStyle.singleBookDivs}>
                                  <h5 className={`${languageStyle.singleBookContents} ${languageStyle.singleBookCategory}`}>{book.category}</h5>
                              </div>
                              <div className={languageStyle.singleBookDivs}>
                                  <h5 className={`${languageStyle.singleBookContents} ${languageStyle.singleBookLanguage}`}>{book.language}</h5>
                              </div>
                              <div className={languageStyle.singleBookDivs}>
                                  <h5 className={`${languageStyle.singleBookContents} ${languageStyle.singleBookPublisher}`}>{book.publisher}</h5>
                              </div>
                              <div className={languageStyle.singleBookDivs}>
                                  <h5 className={`${languageStyle.singleBookContents} ${languageStyle.singleBookEditor}`}>{book.edition}</h5>
                              </div>
                              <div className={languageStyle.singleBookDivs}>
                                  <h5 className={`${languageStyle.singleBookContents} ${languageStyle.singleBookPrice}`}>Rs . {book.price}</h5>
                              </div>
                              <div className={languageStyle.singleBookDivs}>
                                  <h5 className={`${languageStyle.singleBookContents} ${languageStyle.singleBookPiecesLeft}`}>{book.numberOfPieces} Pieces left</h5>
                              </div>
                          </div>
                      )
                  })}
              </div>
                
      </div>
    </div>
  )
}

export default Languages
