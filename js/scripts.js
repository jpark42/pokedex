let pokemonRepository = (function() {
    //defining a list of pokemon in an array
    let pokemonList = [];
    //API Url for pokedex with a pagination limit of 150 pokemon
    let apiUrl='https://pokeapi.co/api/v2/pokemon/?limit=150';


    //define seperate function addPokemon()
    function add(pokemon) {
        if (
          typeof pokemon === "object" &&
          "name" in pokemon
        ) {
          pokemonList.push(pokemon);
        } else {
          console.log("pokemon is not correct");
        }
    }
    //define seperate function getAll()
    function getAll () {
        return pokemonList;
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

        //add an event handler that calls the function showDetails(pokemon)
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        })
    }

    //defining function loadList to fetch a list from the pokedex API
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    //function to load details of the pokemon by fetching them from the pokedex API
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
        //added details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }
      //define a separate function showDetails() that uses a callback function to load details of pokemon and object to the console
      function showDetails(item) {
        loadDetails(item).then(function () {
            console.log(item);
        });
    }

    //return object as new public function assigned as keys
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
    };
}) ();    

//defining height threshhold for what is considered big
let heightBig = 72;

pokemonRepository.loadList().then(function () {
    //creating a forEach function to reiterate over each pokemon in pokemonList
    pokemonRepository.getAll().forEach(function (pokemon) {
    //forEach function will the run the loop over addListItem for the pokemonList array
        pokemonRepository.addListItem(pokemon);
    });
});