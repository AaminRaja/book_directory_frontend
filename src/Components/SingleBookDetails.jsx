import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import singleBookStyle from './SingleBookDetails.module.css'
import axios from 'axios'

const SingleBookDetails = ({previousPath, fixPreviousPath}) => {
    let[currentBook, setCurrentBook] = useState()

    let {id} = useParams()

    let navigateToBack = useNavigate()
    let navigateToUpdate = useNavigate()

    let fetchBookDetails = async() => {
        try {
            let response = await axios.get(`http://192.168.0.117:5100/book/getBook/${id}`)
            console.log(response);
            setCurrentBook(response.data.book)
        } catch (error) {
            console.log(error);
        }
    }

    let goBack = () => {
        fixPreviousPath('')
        navigateToBack(previousPath)
    }

    let toupdate = () => {
        navigateToUpdate(`/updateBook/${id}`)
    }

    let deleteBook = async() => {
        let {data} = await axios.delete(`http://192.168.0.117:5100/book/deleteBook/${id}`)
        // console.log(data);
        if(!data.error){
            navigateToBack(previousPath)
        }
    }

    useEffect(() => {
        fetchBookDetails()
    }, [])

    useEffect(() => {
        console.log(id);
        console.log(currentBook);
    })
  return (
    <div className={singleBookStyle.signleBookContainer}>
      <div className={singleBookStyle.signleBookDiv}>
        
        <div className={`${singleBookStyle.signleBookDivs} ${singleBookStyle.titleDiv}`}>
          <h4 className={singleBookStyle.title}>{currentBook?.title}</h4>
        </div>
        <div className={singleBookStyle.signleBookDivs}>
          <div className={singleBookStyle.left}>
              <h5 className={singleBookStyle.content}>Author</h5>
          </div>
          <div>
              <h5>:</h5>
          </div>
          <div className={singleBookStyle.right}>
              <h5 className={singleBookStyle.content}>{currentBook?.author}</h5>
          </div>
        </div>
        <div className ={singleBookStyle.signleBookDivs}>
          <div className={singleBookStyle.left}>
              <h5 className={singleBookStyle.content}>Category</h5>
          </div>
          <div>
              <h5>:</h5>
          </div>
          <div className={singleBookStyle.right}>
              <h5 className={singleBookStyle.content}>{currentBook?.category}</h5>
          </div>
        </div>
        <div className={singleBookStyle.signleBookDivs}>
          <div className={singleBookStyle.left}>
              <h5 className={singleBookStyle.content}>Language</h5>
          </div>
          <div>
              <h5>:</h5>
          </div>
          <div className={singleBookStyle.right}>
              <h5 className={singleBookStyle.content}>{currentBook?.language}</h5>
          </div>
        </div>
        <div className={singleBookStyle.signleBookDivs}>
          <div className={singleBookStyle.left}>
              <h5 className={singleBookStyle.content}>Publisher</h5>
          </div>
          <div>
              <h5>:</h5>
          </div>
          <div className={singleBookStyle.right}>
              <h5 className={singleBookStyle.content}>{currentBook?.publisher}</h5>
          </div>
        </div>
        <div className={singleBookStyle.signleBookDivs}>
          <div className={singleBookStyle.left}>
              <h5 className={singleBookStyle.content}>Edition</h5>
          </div>
          <div>
              <h5>:</h5>
          </div>
          <div className={singleBookStyle.right}>
              <h5 className={singleBookStyle.content}>{currentBook?.edition}</h5>
          </div>
        </div>
        <div className={singleBookStyle.signleBookDivs}>
          <div className={singleBookStyle.left}>
              <h5 className={singleBookStyle.content}>Price</h5>
          </div>
          <div>
              <h5>:</h5>
          </div>
          <div className={singleBookStyle.right}>
              <h5 className={singleBookStyle.content}>Rs.{currentBook?.price}</h5>
          </div>
        </div>
        <div className={singleBookStyle.signleBookDivs}>
          <div className={singleBookStyle.left}>
              <h5 className={singleBookStyle.content}>Book Count</h5>
          </div>
          <div>
              <h5>:</h5>
          </div>
          <div className={singleBookStyle.right}>
              <h5 className={singleBookStyle.content}>{currentBook?.numberOfPieces}</h5>
          </div>
        </div>

        <div className={`${singleBookStyle.signleBookDivs} ${singleBookStyle.buttonsDiv}`}>
          <button onClick={goBack} className={`${singleBookStyle.button} ${singleBookStyle.goBack}`}>GO BACK</button>
          <button onClick={toupdate} className={`${singleBookStyle.button} ${singleBookStyle.update}`}>UPDATE</button>
          <button onClick={deleteBook} className={`${singleBookStyle.button} ${singleBookStyle.delete}`}>DELETE</button>
        </div>
      </div>
    </div>
  )
}

export default SingleBookDetails
