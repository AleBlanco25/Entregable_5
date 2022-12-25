import React from 'react'
import './styles/headerPoke.css'

const HeaderPoke = () => {
  return (
    <header className='header'>
        <div className='poke-img'>
            <img src="/Home/pokedex.png" alt="" />
        </div>
        <div className='header__black'>
            <div className='header__circle'></div>
        </div>
    </header>
  )
}

export default HeaderPoke