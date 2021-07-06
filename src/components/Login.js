import React,{useEffect, useState} from 'react'
import { useMutation } from '@apollo/client'
import {LOGIN} from '../queries'

const Login = ({setToken,show}) => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const [login,result] = useMutation(LOGIN,{
    onError: (error) => {
      console.log(error.message)
    }
  })

  useEffect(() => {
    if(result.data)
    {
      const token = result.data.login.value 
      setToken(token)
      localStorage.setItem('user-token',token)
    }
  },[result.data])

  const submit =async (event) => {
    event.preventDefault()
    login({variables:{username,password}})
    setUsername('')
    setPassword('')
  }
  if(!show)
  {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input 
          type="text"
          value={username}
          onChange={({target})=>setUsername(target.value)}
          />
        </div>
        <div>
          passowrd <input 
          type="text"
          value={password}
          onChange={({target})=>setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login