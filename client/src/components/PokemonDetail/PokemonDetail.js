import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./PokemonDetail.css"

const PokemonDetail = () => {
    const {pokemon_id} = useParams();
    const [pokemons, setPokemons] = useState([]);
    const navigate = useNavigate();
    
   axios.defaults.withCredentials=true;

    useEffect(() => {
  {/*  axios.get('http://localhost:5000')
     .then(result => {
        console.log(result)
    if(result.data !== "Success"){
      navigate('/login')
    }
  }) */}

  // .catch(err => console.log(err))
  fetchPokemons();
  },[]);


        const fetchPokemons = async() => {
          console.log(pokemon_id);
         {/* try {
            const response = await axios.get('http://localhost:5000/pokemon_detail/'+pokemon_id);
            setPokemons(response.data);
            // console.log(response.data);
          } catch (error) {
            console.error('Error fetching Pokemon:',error);
          }*/}
          const response =await axios.get("http://localhost:5000/pokemon_detail/5");
          setPokemons(response.data);
        };
    
     

     

  return (
    <div>
<div className="">
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
  {/*<td><img src={`http://localhost:5000/${pokemons.imagePath}`} alt=''/></td>*/} 
</tr>

  </table>

{/*<div className="acontainer">
<div className="sub-container">
<img src="https://img.freepik.com/premium-photo/circular-wireframe-mesh-logo-element-vector-illustration-eps10-digital-background-posters-circles-lines-effect_299644-1509.jpg?w=350" alt=''/>
<div className='name'><h1>Pikachu</h1></div>
</div>
<div className="desc">
<h3>Hp:30</h3>
<h3>attack:60</h3>
<h3>defense:60</h3>
<h3>special-attack:60</h3>
<h3>speed</h3>
</div>
  </div>*/}
</div>

</div>
  )
}

export default PokemonDetail