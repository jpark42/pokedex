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

    function addListItem(pokemon){
        //create a variable for pokemonList and selected the class we defined in html page using the querySelector function
        let pokemonList = document.querySelector(".pokemon-list");
        //create an li element using createElement function
        let listPokemon = document.createElement("li");
        //create a button using the createElement function
        let button = document.createElement("button");
        //gave the button inner text of pokemon.name
        button.innerText = pokemon.name;
        //gave the button we created a class
        button.classList.add("button-class");
        //append the button to the <li>
        listPokemon.appendChild(button);
        //append the <li> into the <ul>
        pokemonList.appendChild(button);
    }

    //return object as new public function assigned as keys
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }

}) ()    

//defining height threshhold for what is considered big
let heightBig = 72;

//adding a pokemon to pokemonRepository by using add function
pokemonRepository.add({name: 'Chikorita', height: 35, types: ['leaf']});

//creating a forEach function to reiterate over each pokemon in pokemonList
pokemonRepository.getAll().forEach(function(pokemon) {
    //forEach function will the run the loop over addListItem for the pokemonList array
    pokemonRepository.addListItem(pokemon)

    /*if height of pokemon is greater than 1.9, then it will display 'Wow, that's big!' after it lists the pokemon
    if (pokemon.height >= heightBig) {
        document.write(`<li>${pokemon.name}, (height: ${pokemon.height} inches), - Wow, that's big! Type(s):${pokemon.types}</li>`);
    } else {
    //for all other pokemon that are not greater than 1.9, it will normally list the pokemon as a list
        document.write(`<li>${pokemon.name}, (height: ${pokemon.height} inches), Type(s):${pokemon.types}</li>`);
    }
    */
});

