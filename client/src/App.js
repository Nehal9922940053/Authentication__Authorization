import './App.css';

import LoginPage from './components/LoginPage/LoginPage';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import SignupPage from './components/SignupPage/SignupPage';
import HomePage from './components/HomePage/HomePage';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import PokemonTable from './components/PokemonTable/PokemonTable';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <BrowserRouter>
    <Routes>
    
    <Route path="/pokemon_detail/:id" element={<PokemonDetail/>}/>
    <Route path="/getpokemon" element={<PokemonTable/>}/>
    <Route path="/create" element={<CreatePokemon/>}/>
   <Route path="/signup" element={<SignupPage/>}/>
   <Route path="/login" element={<LoginPage/>}/>
   <Route path="/" element={<HomePage/>}/>

    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
