import React,{useState,useEffect} from 'react'
import "./CreatePokemon.css"
import {Grid} from "@mui/material"
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const CreatePokemon = () => {
  const [pokemon_id,setPokemon_Id] = useState();
    const [name,setName] = useState();
    const [type,setType] = useState();
    const [image,setImage] = useState(null);
    const navigate = useNavigate();
  
    axios.defaults.withCredentials=true;
   useEffect(() =>{
    axios.get('http://localhost:5000/')
    .then(result => {console.log(result)
    if(result.data !== "Success"){
      navigate('/login')
    }
  })
  .catch(err => console.log(err))
  },[]);

    const handleUpload = async(e) => {
      e.preventDefault();
       const formData = new FormData();
       formData.append('pokemon_id',pokemon_id);
      formData.append('name', name);
      formData.append('type', type);
      formData.append('image', image);
   await axios.post('http://localhost:5000/create',formData)
      .then(res => {
        console.log(res);
        if(res.data === 'Success'){
           navigate('/getpokemon');
          }
        })
        .catch(err => {
           console.log(err,"err")
      });
    }
  
  return (
<div>
    <Grid container>
    <Grid item xs={11}>
    <div className="main_loginpage">
    <div className="rightcomponent_loginpage">
    <div className="title">
    <h1>Add New Pokemon</h1>
    </div>
   
   
    <form action="/create" className="form" onSubmit={handleUpload} encType="multipart/form-data">
    <input type="text"  className="inp" name="pokemon_id" placeholder="Enter Pokemon Id"  
    onChange={(e)=>setPokemon_Id(e.target.value)}
    />

    <input type="text"  className="inp" name="name" placeholder="Enter Pokemon Name"  
    onChange={(e)=>setName(e.target.value)}
    />

  <input type='text'  className="inp" name='type' id='type' placeholder='Enter Pokemon Type'    
  onChange={(e)=>setType(e.target.value)}
    />     

    <input type='file' className="inp" name='image' id='image' placeholder='Upload Image'    
    onChange={(e)=>setImage(e.target.files[0])}
      />     
   
<button className="btn" type='submit'>Submit</button>
</form>
  


    </div>
   </div> 
    
    </Grid>
    </Grid>
    </div>


  )
}

export default CreatePokemon