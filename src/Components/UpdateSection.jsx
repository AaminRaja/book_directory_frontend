import React, { useEffect, useState } from 'react'
import updateStyle from './UpdateSection.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateSection = ({previousPath}) => {
    let[bookDetails, setBookDetails] = useState({title:"", author:"", category:"", language:"", publisher:"", edition:"", price:"", numberOfPieces:""})
    let[fillAllError, setFillAllError] = useState(false)

    let {id} = useParams()

    let navigateToBack = useNavigate()

    let fetchBookDetailsFromBackend = async() => {
        try {
            let {data} = await axios.get(`http://192.168.0.117:5100/book/getBook/${id}`)
            console.log(data);
            let bookData = data.book            
            if(!data.error){
                setBookDetails({...bookData})
            }
        } catch (error) {
            console.log(error);
        }
    }

    let updateData = ({target:{name, value}}) => {
        setBookDetails({...bookDetails, [name]:value})
    }

    let updateBook = async(bookData) => {
        console.log(bookData);
        try {
            let {data} = await axios.put(`http://192.168.0.117:5100/book/updateBook/${id}`, bookData)
            console.log(data.error);
            if(!data.error){
                navigateToBack(`${previousPath}`)
            }
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
            numberOfPieces: bookDetails.numberOfPieces,
        };
        console.log(trimmedBookDetails);
        if (trimmedBookDetails.title && trimmedBookDetails.author && 
            trimmedBookDetails.category && trimmedBookDetails.language && 
            trimmedBookDetails.publisher && trimmedBookDetails.edition && 
            trimmedBookDetails.price && trimmedBookDetails.numberOfPieces){
                updateBook(trimmedBookDetails)
                setBookDetails({title:"", author:"", category:"", language:"", publisher:"", edition:"", price:"", numberOfPieces:""})
        }else{
            setFillAllError(true)
        }
        
    }

    let resetFormData = () => {
        setBookDetails({title:"", author:"", category:"", language:"", publisher:"", edition:"", price:"", numberOfPieces:""})
    }

    useEffect(() => {
        fetchBookDetailsFromBackend()
    }, [])

    useEffect(() => {
        console.log(bookDetails);
    })

  return (
    <div className={updateStyle.updateSectionContainer}>
      <div className={updateStyle.updateSectionDiv}>
        <div className={updateStyle.titleDiv}>
            <h4 className={updateStyle.title}>Update Book</h4>
        </div>
        <form action="" onSubmit={submitData} onClick={() => {setFillAllError(false)}} className={updateStyle.form}>
            <div className={updateStyle.inputsDiv}>
                <div className={updateStyle.inputsDivLeft}>
                    <div className={updateStyle.inputDiv}>
                        <h5 className={updateStyle.inputId}>Title</h5>
                        <input type="text" name='title' onChange={updateData} value={bookDetails.title} className={updateStyle.input} />
                    </div>
                    <div className={updateStyle.inputDiv}>
                        <h5 className={updateStyle.inputId}>Category</h5>
                        <input type="text" name='category' onChange={updateData} value={bookDetails.category} className={updateStyle.input}/>
                    </div>
                    <div className={updateStyle.inputDiv}>
                        <h5 className={updateStyle.inputId}>Publisher</h5>
                        <input type="text" name='publisher' onChange={updateData} value={bookDetails.publisher} className={updateStyle.input}/>
                    </div>
                    <div className={updateStyle.inputDiv}>
                        <h5 className={updateStyle.inputId}>Price</h5>
                        <input type="text" name='price' onChange={updateData} value={bookDetails.price} className={updateStyle.input}/>
                    </div>
                </div>
                <div className={updateStyle.inputsDivRight}>
                    <div className={updateStyle.inputDiv}>
                        <h5 className={updateStyle.inputId}>Author</h5>
                        <input type="text" name='author' onChange={updateData} value={bookDetails.author} className={updateStyle.input}/>
                    </div>
                    <div className={updateStyle.inputDiv}>
                        <h5 className={updateStyle.inputId}>Language</h5>
                        <input type="text" name='language' onChange={updateData} value={bookDetails.language} className={updateStyle.input}/>
                    </div>
                    <div className={updateStyle.inputDiv}>
                        <h5 className={updateStyle.inputId}>Edition</h5>
                        <input type="text" name='edition' onChange={updateData} value={bookDetails.edition} className={updateStyle.input}/>
                    </div>
                    <div className={updateStyle.inputDiv}>
                        <h5 className={updateStyle.inputId}>Book Count</h5>
                        <input type="text" name='numberOfPieces' onChange={updateData} value={bookDetails.numberOfPieces} className={updateStyle.input}/>
                    </div>
                </div>
            </div>
            <div className={updateStyle.errorDiv}>
                {fillAllError ? <h4 className={updateStyle.error}>*Every input is mandatory</h4> : <h4 className={updateStyle.error}></h4>}
            </div>
            <div className={updateStyle.buttonsDiv}>
                <button type='button' className={`${updateStyle.button} ${updateStyle.goBackButton}`} onClick={() => {navigateToBack(`${previousPath}`)}}>GO BACK</button>
                <button type='button' className={`${updateStyle.button} ${updateStyle.resetButton}`} onClick={resetFormData}>RESET</button>
                <button type='submit' className={`${updateStyle.button} ${updateStyle.saveButton}`}>SAVE</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateSection
