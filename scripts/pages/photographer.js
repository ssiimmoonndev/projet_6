//Mettre le code JavaScript lié à la page photographer.html

const params = new URL(document.location).searchParams;
const id = parseInt(params.get("id"));
console.log(id);

// Fonction pour récupérer les données depuis le fichier JSON
async function fetchData() {
  try {
    const response = await fetch("./data/photographers.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}

// Affiche les informations du photographe
const displayPhotographerInfo = (photographer) => {
  console.log(photographer);
  // const portrait = photographer.portrait
  // const { name, portrait } = photographer
  // const picture = `/assets/photographers/SamplePhotos/Photographers_ID_Photos/${portrait}`;
  const photographerNameHtml = document.querySelector(".photographer-name");
  photographerNameHtml.innerHTML = photographer.name
  photographerCityHtml = document.querySelector(".photographer-city");
  photographerCityHtml.innerHTML = photographer.city + ","
  photographerCountryHtml = document.querySelector(".photographer-country");
  photographerCountryHtml.innerHTML = photographer.country
  photographerTagLineHtml = document.querySelector(".photographer-tagline");
  photographerTagLineHtml.innerHTML = photographer.tagline
  // photographerImage = document.querySelector(".photographe-image");
  // photographerImage = photographer.portrait
}

// Fonction pour filtrer et afficher les données du photographe
async function displayPhotographerData() {
  const { photographers, media } = await fetchData();  
  
  
  // Filtre pour trouver le photographe correspondant à l'ID
  const photographer = photographers.find(photographer => photographer.id === id);

  displayPhotographerInfo(photographer)
  
  // Filtre pour obtenir uniquement les médias du photographe
  const photographerMedia = media.filter(item => item.photographerId === id);
  
  // Affiche les médias du photographe
  // displayPhotographerMedia(photographerMedia);
}


displayPhotographerData()
