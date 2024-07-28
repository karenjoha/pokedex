import axios from 'axios';

const saludo= ()=>{
    console.log("Hola Karen");
};

saludo();

const getPokemons= async ()=>{
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto');
    } catch (error) {
        error.log("Error", error)
    }
}

getPokemons();