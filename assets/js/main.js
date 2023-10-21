function convertPokemonToLi(pokemon) {
    return `
    <button class="pokeButton" onclick="createPokemonDetailPage(${pokemon.id})">
    <li class="pokemon ${pokemon.mainType}">
    <span class="number">#${pokemon.id}</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">
        <ol class="types">
            ${pokemon.types.map((typeSlot) => `<li class="type ${typeSlot.type.name}">${typeSlot.type.name}</li>`).join("")}
        </ol>

        <img src="${pokemon.image}"
            alt="${pokemon.name}">
    </div>
    </li>
    </button>`
}
function getPokemon(id){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
        document.getElementById('id01').style.display='block'
        return fetch(url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
            .then((detailRequest) => Promise.resolve(detailRequest))
            .then((pokemonDetail) => pokemonDetail)
}
function createPokemonDetailPage(id) {
   
    getPokemon(id).then((pokemon) => {
            const newHtml = convertPokemonToHTMLDetail(pokemon)
            document.getElementById("pokemonModalDetail").innerHTML = newHtml
        })
    
}

function convertPokemonToHTMLDetail(pokemon) {
    return `<span>${pokemon.name}</span>
    <img  id="pokemonDetailImg" style="max-width=50%" src="${pokemon.image}">
    <div id="pokeStats">
        <table>
            <tr>
                <th>HP</th>
                <th>${pokemon.hp}</th>
            </tr>
            <tr>
                <th>ATK</th>
                <th>${pokemon.attack}</th>
            </tr>
            <tr>
                <th>DEF</th>
                <th>${pokemon.defense}</th>
            </tr>
            <tr>
                <th>SP.ATK</th>
                <th>${pokemon.special_attack}</th>
            </tr>
            <tr>
                <th>SP.DEF</th>
                <th>${pokemon.special_defense}</th>
            </tr>
            <tr>
                <th>SPEED</th>
                <th>${pokemon.speed}</th>
            </tr>
        </table>
    </div>
    `
}

const pokemons = document.getElementById("pokemons")
let pokeNumber
let pagination = 0

function loadPokemons(offSet) {
    pokeApi.getPokemons(offSet, 10).then((pokemonList = []) => {
        const newHtml = pokemonList.map(convertPokemonToLi).join('')
        pokemons.innerHTML = newHtml
    })
    .catch(error => console.log(error))
}

function nextPage(){
    loadPokemons(pagination+10, 10)
    pagination += 10
}

function previousPage(){
    loadPokemons(pagination -10, 10)
    pagination -= 10
}

loadPokemons(0)

nextButton.addEventListener('click', () => nextPage())
previousButton.addEventListener('click', () => previousPage())