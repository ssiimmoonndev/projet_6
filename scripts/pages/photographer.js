
const params = new URL(document.location).searchParams;
const id = parseInt(params.get("id"));

let currentIndex = 0;
let allPhotos = [];

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

const picture = `/assets/photographers/SamplePhotos/Photographers_ID_Photos/`;

// Affiche les informations du photographe
const displayPhotographerInfo = (photographer) => {

  const photographerNameHtml = document.querySelector(".photographer-name");
  photographerNameHtml.innerHTML = photographer.name
  let photographerCityHtml = document.querySelector(".photographer-city");
  photographerCityHtml.innerHTML = photographer.city + ", " + photographer.country
  // let photographerCountryHtml = document.querySelector(".photographer-country");
  // photographerCountryHtml.innerHTML = photographer.country
  let photographerTagLineHtml = document.querySelector(".photographer-tagline");
  photographerTagLineHtml.innerHTML = photographer.tagline
  let photographerImage = document.querySelector(".photographer-image");
  photographerImage.src = `/assets/photographers/SamplePhotos/Photographers_ID_Photos/${photographer.portrait}`;
}

// Fonction pour filtrer et afficher les données du photographe
async function displayPhotographerData() {
  const { photographers, media } = await fetchData();  
  
  const imageSection = document.querySelector(".photos-photographer");

  // Filtre pour trouver le photographe correspondant à l'ID
  const photographer = photographers.find(photographer => photographer.id === id);

  displayPhotographerInfo(photographer)
  
  // Filtre pour obtenir uniquement les médias du photographe
  const photographerMedia = media.filter(item => item.photographerId === id);
  
  // Affiche les médias du photographe

  allPhotos = photographerMedia.map(media => {
    if (media.image) {
      return {
        src:`/assets/photographers/SamplePhotos/${media.photographerId}/${media.image}`,
        title:media.title,
        type:"image"
      }
    } else if (media.video) {
      return {
        src:`/assets/photographers/SamplePhotos/${media.photographerId}/${media.video}`,
        title:media.title,
        type:"video"
      }
    }
  });
  

  photographerMedia.forEach((media, index) => {
    
    const imagePhotographer = imageTemplate(media, index);
    const mediaCardDOM = imagePhotographer.getMediaDOM();
    
    imageSection.appendChild(mediaCardDOM);
  });

  document.querySelector(".previous").addEventListener("click", showPreviousImage);
    document.querySelector(".next").addEventListener("click", showNextImage);
  
}


displayPhotographerData()
