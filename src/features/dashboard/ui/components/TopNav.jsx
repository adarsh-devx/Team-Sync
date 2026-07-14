import { Bell, Lightbulb, Menu, Moon, Search, Sun } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../../../shared/state/ThemeSlice'

const TopNav = () => {

  let dispatch = useDispatch()

  let {mode} = useSelector((store) => store.theme)

  let handleThemeChange = () => {
    dispatch(toggleTheme())
  }




  return (
    <div className='flex justify-between items-center'>
       <div className='flex gap-4 items-center w-[30%] rounded-xl px-3 py-2 bg-[var(--bg-surface)] border border-gray-600'>
        <Search size={23} />
        <input className='outline-none w-full' type="text"  placeholder='Search workspace...'/>
        </div>
       <div className='flex gap-4'>
        {
          mode === 'light' ? (
            <Sun size={23} className=' cursor-pointer'   onClick={handleThemeChange}/>
          ) : (
            <Moon size={23} className='cursor-pointer'  onClick={handleThemeChange}/>
          )
        }
        <Bell size={23} />
        <Menu  size={23}/>
       </div>
    </div>
  )
}

export default TopNav