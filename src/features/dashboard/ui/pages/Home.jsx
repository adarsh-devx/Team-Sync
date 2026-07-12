import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../../../../shared/state/ThemeSlice' 

const Home = () => {

  let dispatch = useDispatch()

  let handleThemeChange = () => {
    dispatch(toggleTheme())
  }



  return (
    <div>
        <h1>This is my dashboard home page</h1>
        <button onClick={handleThemeChange}>Change Theme</button>
    </div>
  )
}

export default Home