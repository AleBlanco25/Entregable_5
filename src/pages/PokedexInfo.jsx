import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles/pokedexInfo.css'

const PokedexInfo = () => {

const {id} = useParams()
const [pokemon, setPokemon] = useState()

useEffect(()=>{
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
    axios.get(URL)
    .then(res => setPokemon(res.data))
    .catch(err => console.log(err))
},[id])


  return (
    <section className='poke-info__container'>

        <main className='container'>

            <header className={'poke__header'}>
                <div className={`poke__img bg-${pokemon?.types[0].type.name}`}>
                    <img className='image' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
                </div>
            </header>

            <section className='body__container'>
                <div className="body__info">
                    <span className="info__id">#{pokemon?.id}</span>
                    <div className="info__name">
                        <div className='name-line'></div>
                        <h2 className={`info__name color-${pokemon?.types[0].type.name}`}>
                            {pokemon?.name}
                        </h2>
                        <div className='name-line'></div>
                    </div>
                    <div className="info__measures">
                        <ul className='info__measure-items'>
                            <li className='info__item'><span className='item-stat'>Peso</span><b className='item'>{pokemon?.weight}</b></li>
                            <li className='info__item'><span className='item-stat'>Altura</span><b className='item'>{pokemon?.height}</b></li>
                        </ul>
                    </div>
                </div>

                <article className='qualities__container'>
                    <div className='types__container'>
                        <h3 className='type__title'>Type</h3>
                        <ul className='type__items'>
                            {
                                pokemon?.types.map(type => (
                                    <li
                                        className={`type__item bg-${type.type.name}`}
                                        key={type.type.name}>
                                        {type.type.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className='skills__container'>
                        <h3 className='skill__title'>Skills</h3>
                        <ul className='skill__items'>
                            {
                                pokemon?.abilities.map(skils => (
                                    <li
                                        className='skill__item'
                                        key={skils.ability.name}>
                                        {skils.ability.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </article>

                <article className='stats__container'>
                    <div className="content__title-img">
                        <h3 className='stats__title'>Stats</h3>
                        <div className='line'></div>
                        <img className='stats__img' src="/Home/pokebola.png" alt="" />
                    </div>
                    <div className='stats__body'>
                        {
                            pokemon?.stats.map(stat => (
                                <div className='stats__content' key={stat.stat.name}>
                                    <div className='stats__description'>
                                        <span className='stats__description-span'>
                                            {stat.stat.name}:
                                        </span>
                                        <span className='stats__description-base'>
                                            {stat.base_stat}/ 150
                                        </span>
                                    </div>
                                    <div className='stats__progress'>
                                        <div
                                            className={`progress__fill bg-${pokemon?.types[0].type.name}`}
                                            style={{ width: `${stat.base_stat / 1.5}%` }}>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </article>

            </section>

        </main>

        <footer className='footer__container'>
                <section className='footer__box'>
                    <div className="footer__title-img">
                        <h3 className='footer__title'>Movements</h3>
                        <div className='footer__line'></div>
                        <img className='stats__img' src="/Home/pokebola.png" alt="" />
                    </div>
                    <ul className='footer__list'>
                        {
                        pokemon?.moves.map(move => (
                                <li className='footer__items' key={move.move.name}>
                                    {move.move.name}
                                </li>
                            ))
                        }
                    </ul>
                </section>
            </footer>

    </section>
    
    
  )
}

export default PokedexInfo


