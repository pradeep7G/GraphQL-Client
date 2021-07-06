import {gql} from '@apollo/client'

export const ALL_AUTHORS = gql`
 query{
   allAuthors {
     name
     born
     bookCount
     id
   }
 }
`

export const ALL_BOOKS = gql`
query allBooks($author:String,$genre:String){
  allBooks(
    author: $author
    genre : $genre
  ) {
    title
    genres
    author{
      name
    }
    published
    id
  }
}
`
export const ADD_BOOK = gql`
mutation newBook($title:String!,$author:String!,$publishedInt:Int!,$genres:[String!]!){
  addBook(
    title:$title 
    author:$author 
    published:$publishedInt 
    genres:$genres
  ){
    title
    author{
      name
    }
    published
    genres
    id
  }
}
`
export const EDIT_BORN = gql`
mutation editBorn($name:String!,$bornInt:Int!) {
  editAuthor(
    name:$name 
    setBornTo:$bornInt
  ){
    name
    born
    bookCount
    id
  }
}
`
export const LOGIN = gql`
mutation login($username: String!,$password:String!) {
  login(
    username: $username 
    password: $password
  ){
    value
  }
}
`
export const USER = gql`
query{
  me{
    username
    favoriteGenre
  }
}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    title
    author{
      name
    }
    id
    published
    genres
  }
}
`