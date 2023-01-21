import React from 'react'
import './AddArticle.css'
import {storage, db, auth} from '../../config/firebaseConfig'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import {v4} from 'uuid'
import {useAuthState} from 'react-firebase-hooks/auth'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

function AddArticle() {

//activate navigate
let navigate = useNavigate();    

//get user date
  const [user] = useAuthState(auth);

  //array for topics
  const categories = ["Health", "Food", "Travel", "Tech"]


 //create state to hold form data
 const [formData, setFormData] = React.useState({
    title: "",
    summary: "",
    paragraphOne: "",
    paragraphTwo: "",
    paragraphThree: "",
    category: "",
    image: ""
 })
 
 const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    //create a reference for the image
    const imageRef= ref(storage, `images/${formData.image.name+v4()}`)
    //upload image to bucket
    uploadBytes(imageRef, formData.image)
    .then(res =>{
        //console.log(res.ref)
        //now get urm from this ref in bucket
        getDownloadURL(res.ref)
        .then(url=>{
            //now we have all data and img url - save to collection
            //create reference to articles collection
            const articleRef = collection(db, 'articles')
            //use addDoc to add a document to the collection
            addDoc(articleRef, {
                title: formData.title,
                summary: formData.summary,
                paragraphOne: formData.paragraphOne,
                paragraphTwo: formData.paragraphTwo,
                paragraphThree: formData.paragraphThree,
                category: formData.category,
                imageUrl: url,
                createdAt: Timestamp.now().toDate(),
                createdBy: user.displayName,
                userId: user.uid
            })
        }
        )
        .then(res =>{
            // alert('article saved!')
            toast('Article saved!', {
                type:"success",
                autoClose: 1500
            })
            //pause before nav to home
            setTimeout(()=>{
                navigate('/')
            }, 2000)
        })
    })
    .catch(err=>{
        console.log(err)
        toast('could not save :(', {type:"error"})
    })
 }
 
  return (
    <div className="add-article-container">
        <form className="add-article-form" onSubmit={handleSubmit} >
            <h2>Create Article</h2>
            <div className="input-group">
                <label htmlFor="title">Title</label>
                <input type="text"  id="title"
                placeholder="Maximum 100 characters"
                maxLength="100"
                onChange={
                    (e)=>setFormData({...formData, title: e.target.value})
                }
                />
            </div> 
            <div className="input-group">        
                <label htmlFor="summary">Summary</label>
                <textarea id="summary"
                placeholder="Maximum 120 characters"
                maxLength="120"
                onChange={
                    (e)=>setFormData({...formData, summary: e.target.value})
                }
                />
            </div> 
            <div className="input-group">
                <label htmlFor="paragraphOne">Paragraph One</label>
                <textarea name="paragraphOne" 
                placeholder="Maximum 650 characters"
                maxLength="650"
                onChange={
                    (e)=>setFormData({...formData, paragraphOne: e.target.value})
                }
                
                />
            </div>
            <div className="input-group">
                <label htmlFor="paragraphTwo">Paragraph Two</label>
                <textarea id="paragraphTwo"
                placeholder="Maximum 650 characters"
                maxLength="650"
                onChange={
                    (e)=>setFormData({...formData, paragraphTwo: e.target.value})
                }
                
                />
            </div>
            <div className="input-group">
                <label htmlFor="paragraphThree">Paragraph Three</label>
                <textarea id="paragraphThree" 
                placeholder="Maximum 650 characters"
                maxLength="650"
                onChange={
                    (e)=>setFormData({...formData, paragraphThree: e.target.value})
                }
                
                />
            </div>
            <div className="input-group">
                <label htmlFor="category">Category</label>
                <select name="category" 
                        onChange={
                                (e)=>setFormData({...formData, category: e.target.value})
                                } >
                    
                    <option value="">Select</option>
                    {
                        categories.map((item, index)=> <option key ={index} 
                                                               value={item}>{item}</option>)
                    }
                    
                </select>
            </div>
            <div className="input-group">
                <label>Upload Image</label>
                <input type="file" name="image" accept="image/*"
                        onChange={
                                (e)=>setFormData({...formData, image: e.target.files[0]})
                                }
                
                />
            </div>
            <button type="submit">Submit</button>
        </form>

    </div>
  )
}

export default AddArticle