let pokemonRepository = (function() {
    //defining a list of pokemon in an array
    let pokemonList = [];
    //API Url for pokedex with a pagination limit of 150 pokemon
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    
    //define seperate function getAll()
    function getAll () {
        return pokemonList;
    }

    //define seperate function addPokemon()
    function add(pokemon) {
        if (
          typeof pokemon === 'object' &&
          'name' in pokemon
        ) {
          pokemonList.push(pokemon);
        } else {
          console.log('pokemon is not correct');
        }
    }
    
    function addListItem(pokemon){
        //create a variable for pokemonList and selected the class we defined in html page using the querySelector function
        let pokemonList = document.querySelector('.pokemon-list');
        //create an li element using createElement function
        let listItem = document.createElement('li');
        //create a button using the createElement function
        let button = document.createElement('button');
        //gave the button inner text of pokemon.name
        button.innerText = pokemon.name;
        //gave the button we created a class
        button.classList.add('button');
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemon-modal')
        //add group-list-item class to li elements created
        button.classList.add('group-list-item');
        //append the button to the <li>
        listItem.appendChild(button);
        //append the <li> into the <ul> which is pokemonList
        pokemonList.appendChild(listItem);

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
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
        //added details to the item
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.imageUrlBack = details.sprites.back_default;
        pokemon.height = details.height; // 10
        pokemon.types = [];
        for (var i = 0; i < details.types.length; i++) {
          pokemon.types.push(details.types[i].type.name);
        }
        pokemon.weight = details.weight;
        }).catch(function (e) {
            /* eslint no-console: "error" */
            console.log('Log a debug level message.');
            console.error(e);
        });
    }
      //define a separate function showDetails() that uses a callback function to load details of pokemon and object to the console
      function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        //show modal content
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        let modalHeader = $('.modal-header');
        
        //clear content for modal
        modalTitle.empty();
        modalBody.empty();

        //creating element for name in modal content
        let nameElement = $('<h1>' + pokemon.name + '</h1>');
        //creating img in modal content
        let imageElement = $('<img class="modal-img" style="width:50%">');
        imageElement.attr('src', pokemon.imageUrl);
        let imageElementBack = $('<img class="modal-img" style="width:50%">');
        imageElementBack.attr('src', pokemon.imageUrlBack);
        
        //creating element for height in modal content
        let heightElement = $('<p>' + 'Height : ' + pokemon.height + '</p>');
        //creating element for weight in modal content
        let weightElement = $('<p>' + 'Weight : ' + pokemon.weight + '</p>')
        //creating element for type in modal content
        let typesElement = $('<p>' + 'Types : ' + pokemon.types + '</p>')

        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
    }    

    //return object as new public function assigned as keys
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
    };
}) ();    


pokemonRepository.loadList().then(function () {
    //creating a forEach function to reiterate over each pokemon in pokemonList
    pokemonRepository.getAll().forEach(function (pokemon) {
    //forEach function will the run the loop over addListItem for the pokemonList array
        pokemonRepository.addListItem(pokemon);
    });
});