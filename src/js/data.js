import {scoresList} from "./scoresList"

/************************************ DATA **************************************/
let allData = [];   
export let images = [];
export let continents = [];
  

//Get data from API---------------------------------------------------------------
export async function getData() {
    let res = await fetch('https://api.myjson.com/bins/a6da9');
    const myJson = await res.json();
    allData = [...myJson];
    insertData();
    scoresList();
}

// Make an array of images and continents-----------------------------------------
function insertData() {
    allData.forEach(i => {                
        images.push(i.image);
        continents.push(i.continent);  
    })           
}  
 

