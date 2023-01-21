import React from 'react'
import './CategoryArticle.css'
import {useParams} from 'react-router-dom'
import {db} from '../../config/firebaseConfig'
import {getDocs, collection, query, where} from 'firebase/firestore'
import ArticleCard from '../../components/ArticleCard/ArticleCard'


function CategoryArticle() {
    //get category from url
    const {categoryName} = useParams();

    //state to hold data
    const [articles, setArticles] = React.useState([])


    //show articles from this cat. when componenet loads
    React.useEffect(
        ()=>{
            //create ref to collection
            const articleRef = collection(db, 'articles')
            //get data, only want articles from this specific category
            //set up query to filter data
            const q = query(articleRef, 
                            where("category", "==", categoryName))
            //get docs that match query
            getDocs(q, articleRef)
            .then(res=>{
                 //get data and store in array FIREBASE FORMULA
                const articles = res.docs.map(item =>(
                    {id: item.id, 
                      ...item.data()}
            ))
            console.log(articles)
            //store in state
            setArticles(articles)
            })
            .catch(err=>console.log(err))
        }, [categoryName]
    )


  return (
    <div className="category-articles">
        {
            articles.map(item=><ArticleCard article={item} />)
        }




        {/* {
            articles.map(item=><p>{item.title}</p>)
        } */}
    </div>
  )
}

export default CategoryArticle