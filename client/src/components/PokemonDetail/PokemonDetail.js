import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PokemonDetail = () => {
    const {pokemon_id} = useParams();
    const [pokemons, setPokemons] = useState([]);
    const navigate = useNavigate();
    
   axios.defaults.withCredentials=true;

    useEffect(() => {
    axios.get('http://localhost:5000/')
     .then(result => {
        console.log(result)
    if(result.data !== "Success"){
      navigate('/login')
    }
  })
  // .catch(err => console.log(err))
  fetchPokemons();
  },[]);


        const fetchPokemons = async() => {
          console.log("test");
          try {
            const response = await axios.get(`http://localhost:5000/pokemon_detail/5`);
            setPokemons(response.data);
            // console.log(response.data);
          } catch (error) {
            console.error('Error fetching Pokemon:',error);
          }
        };
    
     

     

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
<tr key={pokemons.pokemon_id}>
<td>{pokemons.pokemon_id}</td> 
  <td>{pokemons.name}</td>
  <td>{pokemons.type}</td>
  <td><img src={`http://localhost:5000/${pokemons.imagePath}`} alt=''/></td>
</tr>

</table>
</div>
    </div>
  )
}

export default PokemonDetail