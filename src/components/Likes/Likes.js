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
    const [likeCount, setLikeCount] = React.useState(0)

    React.useEffect(
        ()=>{
            //when page loads, find out did user like this article
            //to initialize isLiked properly
            //need refernce to likes
            const likesRef = collection(db, 'likes')
            if (user){
            //make a query to see if record with this userid and articleid
            const q = query(likesRef, where("articleId", "==", articleId),
                                  where('userId', '==', user?.uid))
                //look for documents with this query
                getDocs(q, likesRef)
                .then(res=>{
                    //is there a match?
                    console.log(res.size)
                    //gives you number of matches
                    if (res.size > 0) {
                        setIsLiked(true)
                    }
                })
                .catch(err=>console.log(err))
            }

                //find out number of likes
                //make a query to count records with this articleid
                const q2 = query(likesRef, where("articleId", "==", articleId))
                getDocs(q2, likesRef)
                .then (res =>{
                    setLikeCount(res.size)
                })
                .catch(err => console.log(err))
        }, [user, isLiked]
    )

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
                                  where('userId', '==', user && user?.uid))
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
            <div className="like-icon">
                <FaHeart onClick={handleUnlike} />
                <span>{likeCount}</span>
            </div>
            :
            <div className="like-icon">
            <FaRegHeart 
            onClick={handleLike}/>
            <span>{likeCount}</span>
            </div>
        }
    </div>
  )
}

export default Likes