import React from 'react'
import UserContextProvider from './Context/UserContextProvider'
import Login from './Components/Login'
import Profile from './Components/Profile'

export default function App() {
  return (
    <UserContextProvider>
      <h1>hello</h1>
      <Login/>
      <Profile/>
    </UserContextProvider>
  )
}
