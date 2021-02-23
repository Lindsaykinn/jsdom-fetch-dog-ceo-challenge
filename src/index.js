let breeds = []


document.addEventListener("DOMContentLoaded", function(){
  loadImages();
  allDogBreeds();
})

function loadImages(){
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
  fetch(imgUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      json.message.forEach(image => addImage(image))
    })
}

function addImage(dogPic){
  let container = document.getElementById('dog-image-container');
  let newImageEl = document.createElement('img');
  newImageEl.src = dogPic;
  container.appendChild(newImageEl);
}

function allDogBreeds(){
  const breedUrl = 'https://dog.ceo/api/breeds/list/all' 
  fetch(breedUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      breeds = Object.keys(json.message);
      updateBreedList(breeds);
      addBreedSelectListener();
    })
}

function updateBreedList(breeds){
  let ul = document.getElementById('dog-breeds');
  removeChildren(ul);
  breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element){
  let child = element.lastElementChild;
  while(child){
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function selectBreedsStartingWith(letter){
  updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener(){
  let breedDropdown = document.getElementById('breed-dropdown');
  breedDropdown.addEventListener('change', function(e){
    selectBreedsStartingWith(e.target.value);
  })
}

function addBreed(breed) {
  let ul = document.querySelector('#dog-breeds');
  let li = document.createElement('li');
  li.innerText = breed;
  li.style.cursor = 'pointer';
  ul.appendChild(li);
  li.addEventListener('click', updateColor);
}

function updateColor(event) {
  event.target.style.color = 'magenta';
}



