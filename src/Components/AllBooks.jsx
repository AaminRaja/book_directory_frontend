import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AllBooks = () => {
    let[allBooks, setAllBooks] = useState([])

    let fetchAllBooks = async() => {
        try {
            let response = await axios.get('https://book-directory-backend-17.onrender.com/book/allBooks')
            // let response = await axios.get('http://192.168.0.117:5100/book/allBooks')
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllBooks()
    }, [])
  return (
    <div>
      <h1>All</h1>
    </div>
  )
}

export default AllBooks
