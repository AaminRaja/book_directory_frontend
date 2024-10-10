import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import singleBookStyle from './SingleBookDetails.module.css'
import axios from 'axios'

const SingleBookDetails = () => {
    let[currentBook, setCurrentBook] = useState()

    let {id} = useParams()

    let fetchBookDetails = async() => {
        try {
            let response = await axios.get(`http://192.168.0.117:5100/book/getBook/${id}`)
            console.log(response);
            setCurrentBook(response.data.book)
        } catch (error) {
            console.log(error);
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
        <div className={singleBookStyle.signleBookDivs}>
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
        <div className={singleBookStyle.signleBookDivs}>
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
              <h5 className={singleBookStyle.content}>{currentBook?.price}</h5>
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

        <div className={singleBookStyle.signleBookDivs}>
          <button>UPDATE</button>
          <button>DELETE</button>
        </div>
      </div>
    </div>
  )
}

export default SingleBookDetails
