//define a list of pokemon in an array
let pokemonList = [
    {name: 'Charmelion', height: 1.1, types: ['fire']},
    {name: 'Blaziken', height: 1.9, types: ['fire', 'fighting']},
    {name: 'Aron', height: 0.4, types: ['rock', 'steel']}
]

//defining height threshhold for what is considered big
let heightBig = 1.9;
for (i = 0; i < pokemonList.length; i++) {
    //if height of pokemon is greater than 1.9, then it will display 'Wow, that's big!' after it lists the pokemon
    if (pokemonList[i].height >= heightBig) {
        document.write(`<li>${pokemonList[i].name} (height: ${pokemonList[i].height}m) - Wow, that's big!</li>`);
    } else {
    //for all other pokemon that are not greater than 1.9, it will normally list the pokemon as a list
        document.write(`<li>${pokemonList[i].name} (height: ${pokemonList[i].height}m)</li>`);
    }
}


/* Loop to display all objects
let text = " ";
let i = 0;
for (;pokemonList[i];) {
text = text + " " + pokemonList[i].name + " " + pokemonList[i].height;
i++;
}
document.write(text)
*/