import { refs } from "./js/refs";
import axios from "axios";
const BASE_URL =' https://pokeapi.co/api/v2/pokemon/'

const { form,
        formInput,
        submitBtn,
        pokemonsList,
        openModalBtn,
        closeModalBtn,
        backdrop,
        modal,
        wrapper } = refs

renderAllPoks()
form.addEventListener('submit', onFormSubmit)

function onFormSubmit(e) {
    e.preventDefault()
}

function fetchPokemons() {
    return axios.get(`${BASE_URL}?limit=40`)
}

async function renderAllPoks() {
    const pokemonsData = await fetchPokemons()
    
    const pokemonsArr = pokemonsData.data.results
    pokemonsArr.map(async (pokemon, index) => {
        const pokemonInfo = await axios.get(pokemon.url)
        
        const markup = `<li class = 'pokemon-item' id="${index+1}" data-modal-open><img src="${pokemonInfo.data.sprites.front_default}" alt="" loading="lazy"><p>${pokemon.name}</p></li>`
        
        pokemonsList.insertAdjacentHTML("beforeend", markup)
    } )
    
}   

pokemonsList.addEventListener('click', onPokemonClick)

async function onPokemonClick(e) {
    if(e.target.nodeName === 'UL') return
    const pokemonId = e.target.closest('.pokemon-item').id
    const pokemonInfo = await axios.get(`${BASE_URL}${pokemonId}`)
    const markup = `<img src ="${pokemonInfo.data.sprites.other.dream_world.front_default}" class ="modal-img"/>`
    wrapper.insertAdjacentHTML('beforeend', markup)
    openModal()
    
}

refs.closeModalBtn.addEventListener("click", closeModal);
  
function openModal() {
   refs.backdrop.classList.remove("is-hidden");
}

function closeModal() {
    wrapper.innerHTML = ''
    refs.backdrop.classList.add('is-hidden')
}






