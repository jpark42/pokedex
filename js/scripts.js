let pokemonRepository = (function() {
    //defining a list of pokemon in an array
    let pokemonList = [
        {name: 'Charmelion', height: 43, types: ['fire']},
        {name: 'Blaziken', height: 75, types: ['fire', 'fighting']},
        {name: 'Aron', height: 16, types: ['rock', 'steel']}
    ];

    //define seperate function getAll()
    function getAll () {
        return pokemonList;
    }

    //define seperate function addItem()
    function add(item) {
        pokemonList.push(item);
    }

    //return object as new public function assigned as keys
    return {
        getAll: getAll,
        add: add
    }

}) ()    

//defining height threshhold for what is considered big
let heightBig = 72;

//adding a pokemon to pokemonRepository by using add function
pokemonRepository.add({name: 'Chikorita', height: 35, types: ['leaf']});

//creating a forEach function to reiterate over each pokemon in pokemonList
pokemonRepository.getAll().forEach(function(pokemon) {
    //if height of pokemon is greater than 1.9, then it will display 'Wow, that's big!' after it lists the pokemon
    if (pokemon.height >= heightBig) {
        document.write(`<li>${pokemon.name}, (height: ${pokemon.height} inches), - Wow, that's big! Type(s):${pokemon.types}</li>`);
    } else {
    //for all other pokemon that are not greater than 1.9, it will normally list the pokemon as a list
        document.write(`<li>${pokemon.name}, (height: ${pokemon.height} inches), Type(s):${pokemon.types}</li>`);
    }
});

