import React, { useState,useEffect } from 'react'
import {useMutation, useQuery} from '@apollo/client'
import {ALL_AUTHORS, EDIT_BORN} from '../queries'
import Select from 'react-select'

const SetBirthYear = ({changeBirthYear}) => {
  const [born,setBorn] = useState('')
  const [selectedOption,setSelectedOption] = useState(null)
  const allAuthors = useQuery(ALL_AUTHORS).data.allAuthors.map(author => {
    const option = {value:author,label:author.name}
    return option
  })

  const options = allAuthors

  const submit = (event) => {
    event.preventDefault()
    const bornInt = born===''?0:parseInt(born)
    try{
    const name = selectedOption.value.name
    changeBirthYear({variables:{name,bornInt}})
    }catch(e){
      console.error(`name must not be emtpy`)
    }
    setSelectedOption(null)
    setBorn('')
  }
  return (
    <div>
      <form onSubmit={submit}>
        <Select 
          value={selectedOption}
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          born <input type="text" value=  {born} onChange={({target})=>setBorn(target.value)}/>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS,{onError:(error)=>{
    console.log(error.message)
  }})

  const [changeBirthYear,returnedResult] = useMutation(EDIT_BORN,{
    onError:(error) => console.log('error: ',error.message)
  })
  
  if(!props.show)
  {
    return null
  }
  if(result.loading)
  {
    return <div>loading....</div>
  }
  const authors = result.data.allAuthors
  return (
  <div>
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <div>
       <h2>Set birthyear</h2>
       <SetBirthYear changeBirthYear={changeBirthYear}/>
    </div>
</div>
  )
}

export default Authors