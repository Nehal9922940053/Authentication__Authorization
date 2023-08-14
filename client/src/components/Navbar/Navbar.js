import React from 'react'
import "./Navbar.css"

const Navbar = () => {
  return (
    <div>
    <header>
    <div className="brand"><a href="#">Pokemon API</a></div>

    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/getpokemon">PokemonList</a></li>
            <li><a href="/create">Add New Pokemon</a></li>
            <li><a href="#">Contact</a></li>
            <li><button className="btn">Logout</button></li>
        </ul>
    </nav>
</header>
    </div>
  )
}

export default Navbar