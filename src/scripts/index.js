import "../styles/main.scss";
import pokebola from "../images/pokebola.png";
import pokodex from "../images/pokedex-logo.png";
import axios from "axios";

// Asigna las imagenes a las constantes 
const pokebolaImg = document.querySelector(".pokebola");
const pokedexLogoImg = document.querySelector(".pokedexIcon");

pokebolaImg.src = pokebola;
pokedexLogoImg.src = pokodex;


// Función para obtener y mostrar datos de un Pokémon por su nombre
const PokemonData = async (pokemonName) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const dataApi = response.data;

    // Actualiza el contenido de los elementos con los datos del Pokémon
    document.querySelector(".pokemon-name").textContent =
      dataApi.name.toUpperCase();
    document.querySelector(".pokeImg").src = dataApi.sprites.front_default;
    document.querySelector(".pokemon-No").textContent = dataApi.id;
    document.querySelector(".pokemon-level").textContent =
      Math.floor(Math.random() * 100) + 1;
    document.querySelector(".pokemon-type").textContent = dataApi.types
      .map((type) => type.type.name)
      .join(", ")
      .toUpperCase();
    document.querySelector(".pokemon-ability").textContent = dataApi.abilities
      .map((ability) => ability.ability.name)
      .join(", ")
      .toUpperCase();
    document.querySelector(".pokemon-height").textContent = `${
      dataApi.height / 10
    } M`;
    document.querySelector(".pokemon-weight").textContent = `${
      dataApi.weight / 10
    } KG`;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
  }
};


// Función para obtener un Pokémon aleatorio y mostrar sus datos
const fetchRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 898) + 1;
  await PokemonData(randomId);
};


// Función para obtener otros Pokémon aleatorios y mostrar sus imágenes
const fetchRandomOtherPokemons = async () => {
  const otherPokemonSelectors = document.querySelectorAll(".PokeOthers");

  for (let i = 0; i < otherPokemonSelectors.length; i++) {
    const randomId = Math.floor(Math.random() * 898) + 1;
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      const dataApi = response.data;
      otherPokemonSelectors[i].src = dataApi.sprites.front_default;
      otherPokemonSelectors[i].dataset.name = dataApi.name;
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  }
};

// Agrega un listener a los elementos de otros Pokémon para actualizar su información al hacer clic
const addOtherPokemonClickListener = () => {
  const otherPokemonSelectors = document.querySelectorAll(".PokeOthers");

  otherPokemonSelectors.forEach((element) => {
    element.addEventListener("click", async () => {
      const pokemonName = element.dataset.name;
      if (pokemonName) {
        PokemonData(pokemonName);
      }

      const randomId = Math.floor(Math.random() * 898) + 1;
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );
        const dataApi = response.data;
        element.src = dataApi.sprites.front_default;
        element.dataset.name = dataApi.name;
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    });
  });
};


// Ejecuta las funciones al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
  fetchRandomPokemon();
  fetchRandomOtherPokemons();
  addOtherPokemonClickListener();
});


// Agrega un listener al botón de búsqueda para obtener datos del Pokémon ingresado
const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");

searchButton.addEventListener("click", () => {
  const pokemonName = searchInput.value.trim().toLowerCase();
  if (pokemonName) {
    PokemonData(pokemonName);
  } else {
    console.error("Please enter a Pokémon name.");
  }
});
