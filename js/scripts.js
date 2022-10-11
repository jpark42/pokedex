let pokemonRepository = (function() {
    //defining a list of pokemon in an array
    let pokemonList = [];
    //API Url for pokedex with a pagination limit of 150 pokemon
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let modalContainer = document.querySelector('#modal-container');

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
    };
    //define seperate function getAll()
    function getAll () {
        return pokemonList;
    };

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
    };

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
    };

    //function to load details of the pokemon by fetching them from the pokedex API
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
        //added details to the item
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    };
      //define a separate function showDetails() that uses a callback function to load details of pokemon and object to the console
      function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
            showModal(pokemon);
        });
    };

    function showModal(pokemon) {
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add modal button close
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.imageUrl;

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = 'Height: ' + pokemon.height;

        let pokemonTypes = document.createElement('p');
        pokemonTypes = 'Types: ' + pokemon.types;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(pokemonImage);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonTypes);
        modalContainer.appendChild(modal);

        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal container,
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
    });


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