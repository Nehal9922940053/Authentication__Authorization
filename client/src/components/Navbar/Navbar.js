import React from 'react'
import "./Navbar.css"
import axios from 'axios';

const Navbar = () => {

  axios.defaults.withCredentials=true;
  const handleLogout=() => {
    axios.get('http://localhost:5000/logout')
    .then(res =>{
      if(res.data.Status === "Success"){
         window.location.reload(true);
      }else{
        alert("error");
      }
    
    }).catch(err => console.log(err)); 
  };

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
            <li><button className="btn" onClick={handleLogout}>Logout</button></li>
        </ul>
    </nav>
</header>
    </div>
  )
}

export default Navbar