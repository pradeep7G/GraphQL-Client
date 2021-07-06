import React, {useEffect, useState} from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import {ALL_BOOKS, BOOK_ADDED} from './queries'

import { useApolloClient ,useSubscription } from '@apollo/client'
const App = () => {
  const [page,setPage] = useState('authors')
  const [token,setToken] = useState(null)
  const client = useApolloClient()

  useEffect(()=>{
    const token = localStorage.getItem('user-token')
    setToken(token)
  },[token])

  const updateCacheWith = (bookAdded) => {
    const includedIn = (set,object) => set.map(b => b.id).includes(object.id)

      const dataInStore = client.readQuery({query:ALL_BOOKS})

      if(!includedIn(dataInStore.allBooks,bookAdded))
      {
        client.writeQuery({
          query:ALL_BOOKS,
          data:{allBooks: dataInStore.allBooks.concat(bookAdded)}
        })
      }
  }

  useSubscription(BOOK_ADDED,{
    onSubscriptionData: ({subscriptionData}) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`added new book ${subscriptionData}`)
      updateCacheWith(addedBook)
    }
  })


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        { token && <button onClick={logout}>logout</button>}
      </div>

      <Login 
      show={page==='login'}
      setToken={setToken}
      />

      <Authors
        show={page === 'authors'} 
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommend 
        show={page === 'recommend'}
      />
    </div>
  )
}

export default App
