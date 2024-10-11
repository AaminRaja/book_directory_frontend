import React, { useEffect, useState } from 'react'
import categoryStyle from './Categories.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Categories = ({fixPreviousPath}) => {
  let[categoriesList, setCategoriesList] = useState([])
  let[categoryBooksList, setCategoryBookList] = useState([])
  let[currentCategory, setCurrentCategory] = useState()

  let navigateToSingleBook = useNavigate()

  let fetchAllCategories = async() => {
    try {
      let {data} = await axios.get(`http://192.168.0.117:5100/book/allCategories`)
      console.log(data);
      setCategoriesList(data.categories)
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  let fetchBooksByCategory = async(bookCategory) => {
    // bookCategory = JSON.stringify(bookCategory)
    localStorage.setItem('currentCategory', bookCategory)
    setCurrentCategory(bookCategory)
    try {
      let {data} = await axios.get(`http://192.168.0.117:5100/book/booksByCategory?category=${bookCategory}`)
      console.log(data);
      setCategoryBookList(data.books)
    } catch (error) {
      console.log(error);
    }
  }

  let toSingleBook = (id) => {
    fixPreviousPath('/categories')
    navigateToSingleBook(`/singleBook/${id}`)
  }

  useEffect(() => {
    fetchAllCategories()
  }, [])

  useEffect(() => {
    let categoryInLocal = localStorage.getItem('currentCategory')
    if(categoryInLocal && categoryInLocal !== "undefined"){
      setCurrentCategory(categoryInLocal)
      fetchBooksByCategory(categoryInLocal)
    }else{

      fetchBooksByCategory(categoriesList[0])
    }
  }, [categoriesList])

  useEffect(() => {
    console.log(categoriesList);
    console.log(categoryBooksList);
    console.log(localStorage.getItem('currentCategory'));
  })
  return (
    <div className={categoryStyle.categoriesContainer}>
      <div className={categoryStyle.categorySideBar}>
        <div className={categoryStyle.categorySideTitleDiv}>
          <h4 className={categoryStyle.categorySideTitle}>CATEGORIES</h4>
        </div>
        <div className={categoryStyle.sideBarCategoriesListDiv}>
          {categoriesList.map((category) => {
            return (
              <div className={categoryStyle.sideBarCategoriesSingleDiv} onClick={() => {fetchBooksByCategory(category)}}>
                <h5 className={categoryStyle.sideBarCategoriesSingle}>{category}</h5>
              </div>
            )
          })}
        </div>
      </div>
      {/* &&& */}
      <div className={categoryStyle.booksAndTitleContainer}>
              <div className={categoryStyle.currentCategoryDiv}>
                  <h3 className={categoryStyle.currentCategory}>Category : {currentCategory}</h3>
              </div>
              <div className={categoryStyle.categoryiesBooksDiv}>
                  {categoryBooksList?.map((book) => {
                      return (
                          <div className={categoryStyle.singleBookDiv} onClick={() => {toSingleBook(book._id)}}>
                              <div className={categoryStyle.singleBookDivs}>
                                  <h5 className={`${categoryStyle.singleBookContents} ${categoryStyle.sigleBookTitle}`}>{book.title}</h5>
                              </div>
                              <div className={categoryStyle.singleBookDivs}>
                                  <h5 className={`${categoryStyle.singleBookContents} ${categoryStyle.singleBookAuthor}`}>{book.author}</h5>
                              </div>
                              <div className={categoryStyle.singleBookDivs}>
                                  <h5 className={`${categoryStyle.singleBookContents} ${categoryStyle.singleBookCategory}`}>{book.category}</h5>
                              </div>
                              <div className={categoryStyle.singleBookDivs}>
                                  <h5 className={`${categoryStyle.singleBookContents} ${categoryStyle.singleBookLanguage}`}>{book.language}</h5>
                              </div>
                              <div className={categoryStyle.singleBookDivs}>
                                  <h5 className={`${categoryStyle.singleBookContents} ${categoryStyle.singleBookPublisher}`}>{book.publisher}</h5>
                              </div>
                              <div className={categoryStyle.singleBookDivs}>
                                  <h5 className={`${categoryStyle.singleBookContents} ${categoryStyle.singleBookEditor}`}>{book.edition}</h5>
                              </div>
                              <div className={categoryStyle.singleBookDivs}>
                                  <h5 className={`${categoryStyle.singleBookContents} ${categoryStyle.singleBookPrice}`}>Rs . {book.price}</h5>
                              </div>
                              <div className={categoryStyle.singleBookDivs}>
                                  <h5 className={`${categoryStyle.singleBookContents} ${categoryStyle.singleBookPiecesLeft}`}>{book.numberOfPieces} Pieces left</h5>
                              </div>
                          </div>
                      )
                  })}
              </div>
                
      </div>
    </div>
  )
}

export default Categories
