import React,{useState,useEffect} from 'react'
import {ALL_BOOKS, BOOK_ADDED, USER} from '../queries'
import {useQuery,useSubscription} from '@apollo/client'

const FavoriteBooks = ({favoriteGenre}) => {
  const [favoriteBooks,setFavoriteBooks] = useState(null)

  const favoriteBooksQuery = useQuery(ALL_BOOKS,{
    variables:{genre:favoriteGenre},
    onError:(error) => console.log(error.message)
  })

  useEffect(() => {
    if(favoriteBooksQuery.data)
    {
      setFavoriteBooks(favoriteBooksQuery.data.allBooks)
    }
  },[favoriteBooksQuery.data])

  useSubscription(BOOK_ADDED,{
    onSubscriptionData: ({subscriptionData}) => {
      console.log(subscriptionData)
      window.alert(`added new book ${subscriptionData}`)
    }
  })

  if(favoriteBooksQuery.loading)
  {
    return <div>loading...</div>
  }

  if(favoriteBooks)
  {
  return (
    <div>
     <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {favoriteBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )
          }
        </tbody>
      </table>
    </div>
  )
}
return <div>loading...</div>
}

const Recommend = (props) => {
  const result=useQuery(USER,{
    onError:(error) => console.log(error.message),
  })
  const [user,setUser] = useState(null)
  useEffect(() => {
    if(result.data)
    {
    setUser(result.data.me)
    }
  },[result.data])
  if(!props.show)
  {
    return null
  }
  if(result.loading)
  {
    return <div>loading...</div>
  }
  if(user){
  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        books in your favorite genre <b>{user.favoriteGenre}</b>
        <FavoriteBooks favoriteGenre={user.favoriteGenre}/>
      </div>
    </div>
  )
  }
}

export default Recommend