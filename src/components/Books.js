import React, { useEffect, useState } from 'react'
import {useQuery} from '@apollo/client'
import {ALL_BOOKS,BOOK_ADDED} from '../queries'
const Books = (props) => {

  const [genre,setGenre] = useState('all genres')
  const [books,setBooks] = useState(null)
  const result = useQuery(ALL_BOOKS,{
    onError:(error) => {
      console.log(error.message)
    }
  })

  useEffect(() => {
    if(result.data)
    {
      setBooks(result.data.allBooks)
    }
  },[result.data])

  if(!props.show){
    return null
  }

  if(result.loading)
  {
    return <div>loading...</div>
  }
  if(books){
  return (
    <div>
      <h2>books</h2>
      in genre <b>{genre}</b>
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
          {genre!=='all genres' && books.filter(book => book.genres.includes(genre)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )
          }
          {genre==='all genres' && books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )
          }

        </tbody>
      </table>
        <div>
          <button  onClick={(event)=>setGenre(event.target.innerText)}>refactoring</button>
          <button  onClick={(event)=>setGenre(event.target.innerText)}>agile</button>
          <button  onClick={(event)=>setGenre(event.target.innerText)}>patters</button>
          <button  onClick={(event)=>setGenre(event.target.innerText)}>design</button>
          <button  onClick={(event)=>setGenre(event.target.innerText)}>crime</button>
          <button  onClick={(event)=>setGenre(event.target.innerText)}>classic</button>
          <button  onClick={(event)=>setGenre(event.target.innerText)}>all genres</button>
        </div>
    </div>
  )
 }
}

export default Books