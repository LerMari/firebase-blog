import React from 'react'
import './Banner.css'
import {db} from '../../config/firebaseConfig'
import {getDocs, collection, query, orderBy, limit} from 'firebase/firestore'

function Banner() {
    //state for articles
    const [mainArticle, setMainArticle] = React.useState('')
    const [otherArticles, setOtherArticles] = React.useState([])

// get data from articles collection to display when Banner loads

React.useEffect(
    ()=>{
        //create reference to articles collection
        const articleRef = collection(db, 'articles')


        //set up query to filter data
        const q = query(articleRef, 
                  orderBy("createdAt", "desc"),
                  limit(5))


        //get documents from this colletion
        //getDocs(articleRef)


        //use the query to get the data    
        getDocs(q, articleRef)


        .then(res =>{
            console.log(res.docs[0].data())
            //get data and store in array FIREBASE FORMULA
            const articles = res.docs.map(item =>(
                {id: item.id, 
                ...item.data()}
            ))
            console.log(articles)
            //store in state
            setMainArticle(articles[0])
            setOtherArticles(articles.splice(1))
        })
        .catch(err=>console.log(err))

    }, []
)

  return (
    <div className="banner-container">
        <div className="main-article-container"
              style={{backgroundImage: `url(${mainArticle?.imageUrl})`}}>
            <div className="banner-info">
                <h2>{mainArticle?.title}</h2>
                <div className="main-article-info">
                    <p>{mainArticle?.createdAt?.toDate().toDateString()}</p>
                </div>
            </div>

        </div>
        <div className="other-articles-container">
            {
                otherArticles.map(item => (
                    <div key={item.id} 
                    className="other-article-item"
                    style={{backgroundImage: `url(${item?.imageUrl})`}}>
                            <div className="banner-info">
                            <h3>{item?.title}</h3>
                          <small>{item?.createdAt?.toDate().toDateString()}</small>
                  </div>
      
              </div>

                )
                
                )
            }

        </div>
        
    </div>
  )
}

export default Banner