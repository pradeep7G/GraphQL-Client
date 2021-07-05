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
query{
  allBooks {
    title
    author
    published
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
    author
    published
    genres
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