import React, { useEffect, useState } from 'react'
import newBookStyle from './AddABook.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddABook = ({previousPath}) => {
    let[bookDetails, setBookDetails] = useState({title:"", author:"", category:"", language:"", publisher:"", edition:"", price:"", numberOfPieces:""})
    let[fillAllError, setFillAllError] = useState(false)

    let navigateToBack = useNavigate()

    let updateData = ({target:{name, value}}) => {
        setBookDetails({...bookDetails, [name]:value})
    }

    let AddABook = async(bookData) => {
        try {
            let {data} = await axios.post(`http://192.168.0.117:5100/book/addBook`, bookData)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    let submitData = (e) => {
        console.log("Submitting");
        e.preventDefault()
        let trimmedBookDetails = {
            title: bookDetails.title.trim(),
            author: bookDetails.author.trim(),
            category: bookDetails.category.trim(),
            language: bookDetails.language.trim(),
            publisher: bookDetails.publisher.trim(),
            edition: bookDetails.edition.trim(),
            price: bookDetails.price.trim(),
            numberOfPieces: bookDetails.numberOfPieces.trim(),
        };
        if (trimmedBookDetails.title && trimmedBookDetails.author && 
            trimmedBookDetails.category && trimmedBookDetails.language && 
            trimmedBookDetails.publisher && trimmedBookDetails.edition && 
            trimmedBookDetails.price && trimmedBookDetails.numberOfPieces){
                AddABook(trimmedBookDetails)
                setBookDetails({title:"", author:"", category:"", language:"", publisher:"", edition:"", price:"", numberOfPieces:""})
        }else{
            setFillAllError(true)
        }
        
    }

    let resetFormData = () => {
        setBookDetails({title:"", author:"", category:"", language:"", publisher:"", edition:"", price:"", numberOfPieces:""})
    }

    useEffect(() => {
        console.log(bookDetails);
    }, [bookDetails])

  return (
    <div className={newBookStyle.newBookContainer}>
      <div className={newBookStyle.newBookDiv}>
        <div className={newBookStyle.titleDiv}>
            <h4 className={newBookStyle.title}>New Book</h4>
        </div>
        <form action="" onSubmit={submitData} onClick={() => {setFillAllError(false)}} className={newBookStyle.form}>
            <div className={newBookStyle.inputsDiv}>
                <div className={newBookStyle.inputsDivLeft}>
                    <div className={newBookStyle.inputDiv}>
                        <h5 className={newBookStyle.inputId}>Title</h5>
                        <input type="text" name='title' onChange={updateData} value={bookDetails.title} className={newBookStyle.input} />
                    </div>
                    <div className={newBookStyle.inputDiv}>
                        <h5 className={newBookStyle.inputId}>Category</h5>
                        <input type="text" name='category' onChange={updateData} value={bookDetails.category} className={newBookStyle.input}/>
                    </div>
                    <div className={newBookStyle.inputDiv}>
                        <h5 className={newBookStyle.inputId}>Publisher</h5>
                        <input type="text" name='publisher' onChange={updateData} value={bookDetails.publisher} className={newBookStyle.input}/>
                    </div>
                    <div className={newBookStyle.inputDiv}>
                        <h5 className={newBookStyle.inputId}>Price</h5>
                        <input type="text" name='price' onChange={updateData} value={bookDetails.price} className={newBookStyle.input}/>
                    </div>
                </div>
                <div className={newBookStyle.inputsDivRight}>
                    <div className={newBookStyle.inputDiv}>
                        <h5 className={newBookStyle.inputId}>Author</h5>
                        <input type="text" name='author' onChange={updateData} value={bookDetails.author} className={newBookStyle.input}/>
                    </div>
                    <div className={newBookStyle.inputDiv}>
                        <h5 className={newBookStyle.inputId}>Language</h5>
                        <input type="text" name='language' onChange={updateData} value={bookDetails.language} className={newBookStyle.input}/>
                    </div>
                    <div className={newBookStyle.inputDiv}>
                        <h5 className={newBookStyle.inputId}>Edition</h5>
                        <input type="text" name='edition' onChange={updateData} value={bookDetails.edition} className={newBookStyle.input}/>
                    </div>
                    <div className={newBookStyle.inputDiv}>
                        <h5 className={newBookStyle.inputId}>Book Count</h5>
                        <input type="text" name='numberOfPieces' onChange={updateData} value={bookDetails.numberOfPieces} className={newBookStyle.input}/>
                    </div>
                </div>
            </div>
            <div className={newBookStyle.errorDiv}>
                {fillAllError ? <h4 className={newBookStyle.error}>*Every input is mandatory</h4> : <h4 className={newBookStyle.error}></h4>}
            </div>
            <div className={newBookStyle.buttonsDiv}>
                <button type='button' className={`${newBookStyle.button} ${newBookStyle.goBackButton}`} onClick={() => {navigateToBack(`${previousPath}`)}}>GO BACK</button>
                <button type='button' className={`${newBookStyle.button} ${newBookStyle.resetButton}`} onClick={resetFormData}>RESET</button>
                <button type='submit' className={`${newBookStyle.button} ${newBookStyle.saveButton}`}>SAVE</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default AddABook
