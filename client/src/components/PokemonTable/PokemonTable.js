import React,{useState,useEffect} from 'react'
import "./PokemonTable.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const PokemonTable = () => {

const navigate=useNavigate();
  const [pokemons, setPokemons] = useState([ ]);
 axios.defaults.withCredentials=true;
  useEffect(() => {
    axios.get('http://localhost:5000/')
    .then(result => {console.log(result)
    if(result.data !== "Success"){
      navigate('/login')
    }
  })
    fetchPokemons();
  },[]);


  const fetchPokemons = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getpokemon'); 
      setPokemons(response.data);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  };


  // const fetchPokemonById = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/getpokemon/${match.params.id}`); 
  //     setPokemons(response.data);
  //   } catch (error) {
  //     console.error('Error fetching Pokemon:', error);
  //   }
  // };

   

  


  return (
    <div>
    
<div className="table-list">
<table id="customers">
<tr>
  <th>ID</th>
  <th>Name</th>
  <th>Type</th>
  <th>Image</th>
</tr>
{/*
// {pokemons.filter((pokemon) => pokemon._id.str.includes(query))
//   .map((pokemon) => (*/}
  {pokemons.map((pokemon) => (
<tr key={pokemon.pokemon_id}>
   <td>{pokemon.pokemon_id}</td>
  <td>{pokemon.name}</td>
  <td>{pokemon.type}</td>
  <td><img src={`http://localhost:5000/${pokemon.imagePath}`} alt=''/></td>
</tr>
))}

</table>
</div>
 </div>
  )
}

export default PokemonTable