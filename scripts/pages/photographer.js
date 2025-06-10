
// Récupère les paramètres de l'URL
const params = new URL(document.location).searchParams;
// Extrait la valeur de l'id et la convertit en nombre
const id = parseInt(params.get("id"));

// Variable pour suivre l'index de l'image affichée dans la lightbox
let currentIndex = 0;
// Tableau contenant toutes les photos du photographe
let allPhotos = [];

// Variable pour stocker le prix du photographe
// Cette initialisation à zéro est logique car aucun prix n'a été calculé ou récupéré.
// La variable sera mise à jour plus tard avec le vrai prix du photographe
let photographerPrice = 0;

// Fonction pour récupérer les données depuis le fichier JSON
async function fetchData() {
  try {
    // Envoie une requête pour récupérer le fichier photographers.json
    const response = await fetch("./data/photographers.json");
    // Convertit la réponse en objet JavaScript
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}

const picture = `/assets/photographers/SamplePhotos/Photographers_ID_Photos/`;

// Affiche les informations du photographe
const displayPhotographerInfo = (photographer) => {

  // Sélectionne l'élément HTML où afficher le nom du photographe
  const photographerNameHtml = document.querySelector(".photographer-name");
  // Met le nom du photographe dans cet élément
  photographerNameHtml.innerHTML = photographer.name
  // Sélectionne l'élément HTML où afficher la ville du photographe
  let photographerCityHtml = document.querySelector(".photographer-city");
  photographerCityHtml.innerHTML = photographer.city + ", " + photographer.country
  // let photographerCountryHtml = document.querySelector(".photographer-country");
  // photographerCountryHtml.innerHTML = photographer.country
  let photographerTagLineHtml = document.querySelector(".photographer-tagline");
  // Met la ville et le pays du photographe dans cet élément
  photographerTagLineHtml.innerHTML = photographer.tagline
  let photographerImage = document.querySelector(".photographer-image");
  photographerImage.src = `/assets/photographers/SamplePhotos/Photographers_ID_Photos/${photographer.portrait}`;
}

// Fonction pour filtrer et afficher les données du photographe
async function displayPhotographerData() {
  // Récupère les données des photographes et des médias depuis le JSON
  const { photographers, media } = await fetchData();  
  
  // Sélectionne la section où afficher les photos du photographe
  const imageSection = document.querySelector(".photos-photographer");

  // Filtre pour trouver le photographe correspondant à l'ID
  const photographer = photographers.find(photographer => photographer.id === id);

  // Affiche les informations du photographe trouvé
  displayPhotographerInfo(photographer)
  
  // Filtre pour obtenir uniquement les médias du photographe
  const photographerMedia = media.filter(item => item.photographerId === id);


  photographerPrice = photographer.price; // ✅ stocke le prix globalement
  // Calcule le total initial des likes de tous les médias du photographe
  calculateInitialTotalLikes(photographerMedia);
  updateTotalLikesDisplay(); // ✅ ne passe plus de paramètre





  // calculateInitialTotalLikes(photographerMedia);
  // updateTotalLikesDisplay(photographer.price);
  
  
  // Affiche les médias du photographe
  allPhotos = photographerMedia.map(media => {
    // Si le média est une image
    if (media.image) {
      return {
        src:`/assets/photographers/SamplePhotos/${media.photographerId}/${media.image}`,
        // Récupère le titre de l'image
        title:media.title,
        // Définit le type comme "image"
        type:"image"
      }
    } else if (media.video) { // Si le média est une vidéo
      return {
        src:`/assets/photographers/SamplePhotos/${media.photographerId}/${media.video}`,
        // Récupère le titre de la vidéo
        title:media.title,
        // Définit le type comme "video"
        type:"video"
      }
    }
  });
  
  // Parcourt chaque média du photographe avec son index
  photographerMedia.forEach((media, index) => {
    
    // Crée un template pour chaque média
    const imagePhotographer = imageTemplate(media, index);
    // Génère l'élément DOM du média
    const mediaCardDOM = imagePhotographer.getMediaDOM();
    // Ajoute le média à la section des images
    imageSection.appendChild(mediaCardDOM);
  });

  document.querySelector(".previous").addEventListener("click", showPreviousImage);
    document.querySelector(".next").addEventListener("click", showNextImage);
}

// Appelle la fonction principale pour initialiser la page
displayPhotographerData()
