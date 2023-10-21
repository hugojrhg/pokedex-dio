const pokeApi = {}

function convertPokeApiDetailToPokemon(pokemonDetail) {
    const pokemon = new Pokemon();
    pokemon.id = pokemonDetail.id
    pokemon.name = pokemonDetail.name
    pokemon.types = pokemonDetail.types
    pokemon.mainType = pokemon.types[0].type.name
    pokemon.image = pokemonDetail.sprites.other.dream_world.front_default
    pokemon.hp = pokemonDetail.stats[0].base_stat
    pokemon.attack = pokemonDetail.stats[1].base_stat
    pokemon.defense = pokemonDetail.stats[2].base_stat
    pokemon.special_attack = pokemonDetail.stats[3].base_stat
    pokemon.special_defense = pokemonDetail.stats[4].base_stat
    pokemon.speed = pokemonDetail.stats[5].base_stat

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offSet, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemonList) => pokemonList.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.log(error))
}