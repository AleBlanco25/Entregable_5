import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pokedex/Pagination'
import PokeCard from '../components/Pokedex/PokeCard'
import './styles/pokedex.css'

const Pokedex = () => {

  const {trainer} = useSelector(state => state)

  const [pokemons, setPokemons] = useState()
  const [types, setTypes] = useState()
  const [typeSelect, setTypeSelect] = useState('All pokemons')

  const navigate = useNavigate()

useEffect (()=>{
  const URL = 'https://pokeapi.co/api/v2/type'
  axios.get(URL)
  .then(res => setTypes(res.data.results))
  .catch(err => console.log(err))
},[])

  useEffect(()=> {

    if(typeSelect !== 'All pokemons'){
      axios.get(typeSelect)
      .then(res => setPokemons(res.data.pokemon.map(e => e.pokemon)))
      .catch(err => console.log(err))
    }else{
      const URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000`
      axios.get(URL)
      .then(res => setPokemons(res.data.results))
      .catch(err => console.log(err))
    } 
  }, [typeSelect])

  const handleSubmit = (e) => {
    e.preventDefault()
    const input = (e.target.search.value.trim().toLowerCase())
    navigate(`/pokedex/${input}`)
  }

  const handleChange = (e) => {
    setTypeSelect(e.target.value);
    setPage(1)
  }

  //! lógica de la paginación

const [page, setPage] = useState(1)
const [pokePerPage, setPokePerPage] = useState(8)
const initialPoke = (page -1) * pokePerPage
const finalPoke = page * pokePerPage
const maxPage = pokemons && Math.ceil(pokemons.length / pokePerPage)

  return (
    <div className='pokedex'>
          <h2 className='poke__intro'><span className='poke__welcome'> Welcome {trainer}</span>, here you can find your favorite Pokemon.</h2>
          <form className='poke__form' onSubmit={handleSubmit}>
            <input className='poke__input' id='search' type="text" placeholder='Find a Pokemon' />
            <button className='poke__btn'>Search</button>
            <select className='poke__select' onChange={handleChange}>
                <option className='poke__options' value="All pokemons">All pokemons</option>
                {
                  types?.map(type => (
                  <option className='poke__types' key={type.url} value={type.url}>{type.name}</option>
                  ))
                }
            </select>
          </form>
              <Pagination 
              page={page}
              maxPage= {maxPage}
              setPage={setPage}
              />
          <div className='poke-container'>
            {
              pokemons?.slice(initialPoke, finalPoke).map(poke =>(
                <PokeCard key={poke.url} 
                url={poke.url}
                />
              ))
            }
          </div>
              <Pagination 
              page={page}
              maxPage= {maxPage}
              setPage={setPage}
              />
    </div>
  )
}

export default Pokedex

