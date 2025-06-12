import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const buscarListaPokemon = async () => {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
        if (response != null) {
          setPokemonList(response.data.results);
        }
    };

    buscarListaPokemon();
  }, []);

  const buscarDetallesPokemon = async (url) => {
      const response = await axios.get(url);
      if (response) {
        setSelectedPokemon(response.data);
      }
  };

  return (
    <div>
      <h1>Pokémon List</h1>

      <ul>
        {pokemonList.map((poke) => (
          <li key={poke.name}>
            <button onClick={() => buscarDetallesPokemon(poke.url)}>
              {poke.name}
            </button>
          </li>
        ))}
      </ul>

      {selectedPokemon && (
        <div>
          <h2>{selectedPokemon.name.toUpperCase()}</h2>
          <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name}/>
          <p><strong>Altura:</strong> {selectedPokemon.height}</p>
          <p><strong>Peso:</strong> {selectedPokemon.weight}</p>
          <p><strong>Tipos:</strong> {selectedPokemon.types.map(t => t.type.name).join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;