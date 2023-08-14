import React,{useEffect} from 'react'
import axios from 'axios';
import "./HomePage.css"

import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate =useNavigate();
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
  return (
    <div>
  <div className='container'>
    <article className="card">
  <img
    className="card__background"
    src="https://i.imgur.com/QYWAcXk.jpeg"
    alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
    width="1920"
    height="2193"
  />
  <div className="card__content | flow">
    <div className="card__content--container | flow">
      <h2 className="card__title">Colombia</h2>
 {/*    <p className="card__description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum in
        labore laudantium deserunt fugiat numquam.
      </p>*/}
    </div>
    <button class="card__button">More details</button>
  </div>
</article>
  </div>
    </div>
  )
}

export default HomePage