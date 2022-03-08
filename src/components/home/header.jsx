import React from 'react'
import voltage from '@/assets/images/voltage_icon.png'
import {useNavigate} from 'react-router-dom'

function Header () {
  const navigate = useNavigate()

  return (
    <div className='header'>
      <img style={{cursor: 'pointer'}} className='icon' alt='voltage' src={voltage} onClick={() => {navigate('/')}}/>
    </div>
  )
}

export default Header
