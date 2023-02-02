import React from 'react'
import './Comments.css'
import {auth} from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import {db} from '../../config/firebaseConfig'
import {getDocs, collection, addDoc, doc, deleteDoc, query, where, onSnapshot} from 'firebase/firestore'


function Comments({articleId}) {

  //get user data
  const [user] = useAuthState(auth);
//   console.log("user data", user)

  //create state for comment
  const [newComment, setNewComment] = React.useState('')

  //create state for all comments
  const [comments, setComments] = React.useState([])

 React.useEffect(
    () =>{
        //get all comments for this article
        const commentsRef = collection(db, 'comments')
        //filter to show only this article
        const q = query(commentsRef, where('articleId', '==', articleId) )
        //get docs
        // getDocs(q, commentsRef)
        // .then(res => {
        //                 //get data and store in array FIREBASE FORMULA
        //                 const comments = res.docs.map(item =>(
        //                     {id: item.id, 
        //                     ...item.data()}
        //                 ))
        //                 //store in state
        //                 setComments(comments)

        // })
        // .catch(err => console.log(err))


        //if no filter just use commentsRef not q
        onSnapshot(q, (snapshot)=>{
            //convert data to array
             const comments = snapshot.docs.map(item =>(
                            {id: item.id, 
                            ...item.data()}
                        ))
            //store in state
             setComments(comments)

        })

        // .catch(err => console.log(err))

        

    }, []
 ) 

  const addNewComment = (e) => {
    e.preventDefault();
    console.log(newComment)
    //add new document to comments collection
    //create reference to comments collection
    const commentsRef = collection(db, "comments")
    //add a document with the date
    addDoc(commentsRef, {
        userId:user?.uid,
        articleId: articleId,
        content: newComment,
        username: user?.displayName
    })
    .then(res=>{
        alert('comment added')
        //clear textbox
        setNewComment('')
    })
    .catch(err=>console.log(err))
  }

const deleteComment = (id) => {
    //delete a specific comment
    console.log(id)
    //get ref to the specific document
    const commentRef = doc(db, 'comments', id)
    //now delete this document
    deleteDoc(commentRef)
    .then (res=>{
        alert('comment deleted')
    })
    .catch(err=>console.log(err))



    //in one step vvvv
    //deleteDoc(doc(db, 'comments', id))

}

  return (
    <div>
        <div className="comments-container">
            {
                comments.map(item=>
                <div key={item.id} className="comment">
                    <p><span>{item.username}</span>
                     {item.content}</p>
                     {
                        //each comment has userid, complate with logged in user
                        user?.uid === item.userId ?
                        <button onClick={()=>deleteComment(item.id)}>Delete</button>
                        :
                        null
                     }
                </div>
               )
            }
        </div>
        {
            user?
            <form onSubmit={addNewComment}>
                <input type="text" 
                        placeholder="add comment"
                        value={newComment}
                        onChange={(e)=>setNewComment(e.target.value)} />
            <button>Submit</button>
            </form>
            :
            <p>Please login to comment</p>
        }
    </div>
  )
}

export default Comments