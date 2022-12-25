import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setTrainerGlobal } from '../store/slices/trainer.slice'
import './styles/home.css'

const Home = () => {

const dispatch = useDispatch()
const navigate = useNavigate()

const handleSubmit = e => {
    e.preventDefault()
    dispatch(setTrainerGlobal(e.target.name.value.trim()))
    e.target.name.value = ''
    navigate('/pokedex')
   
}

  return (
    <div className='home__container'>
        <div className='home__box'>
            <img className='home__img' src="/Home/pokedex.png" alt="" />
            <h1 className='home__title'>Hi trainer!</h1>
            <p className='home__text'><span className='home__span'>Please give me your name to start</span></p>
            <form className='home__form' onSubmit={handleSubmit}>
                <input className='home__input' id='name' type="text" placeholder='Your name...'/>
                <button className='home__btn'>Start</button>
            </form>
            <footer className='footer'>
                <div className='footer__black'>
                    <div className='footer__circle'></div>
                </div>
            </footer> 
        </div>
    </div>
  )
}

export default Home