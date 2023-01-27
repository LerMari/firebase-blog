import React from 'react'
import './Likes.css'
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import {auth} from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import {db} from '../../config/firebaseConfig'
import {getDocs, collection, addDoc, doc, deleteDoc, query, where} from 'firebase/firestore'

function Likes({articleId}) {

  //get user data
  const [user] = useAuthState(auth);
  console.log("user data", user)

    //need state to know if liked
    const [isLiked, setIsLiked] = React.useState(false)

 const handleLike = () => {
    console.log('like');
    //make sure a user is logged in
    if (user) {
        //create a reference to likes collection, will create collec the first time
        const likesRef = collection(db, 'likes')
        //add a documet with this userid and articleid
        addDoc(likesRef, {
            userId: user?.uid,
            articleId: articleId
        })
        .then(res =>{console.log(res)
        setIsLiked(true)
        }
        )
        .catch(err =>{console.log(err)})
    }
 }    

 const handleUnlike = () => {
    console.log('unlike')
    if (user) {
        //need to find doc with this articleid and userid
        //make reference to collecton
        const likesRef = collection(db, 'likes')
        //set up query to find this one
        const q = query(likesRef, where("articleId", "==", articleId),
                                  where('userId', '==', user?.uid))
        //look for documents with this query
        getDocs(q, likesRef)
        .then(res=>{
            //need the id of this document
            console.log(res.docs[0].id)
            const likesId = res.docs[0].id
            //now delete this doc with this id
            deleteDoc(doc(db, 'likes', likesId))
            .then(res =>{
                //show as unliked on page
                setIsLiked(false)

            })
            .catch(err => console.log(err))
        })
        .catch(err=>console.log(err))
    }
 }

  return (
    <div>
        {
            isLiked?
            <FaHeart onClick={handleUnlike} />
            :
            <FaRegHeart 
            onClick={handleLike}/>
        }
    </div>
  )
}

export default Likes