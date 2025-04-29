//Mettre le code JavaScript lié à la page photographer.html

const params = new URL(document.location).searchParams;
const id = parseInt(params.get("id"));
console.log(id);

// Je veux récupérer toutes les données de mon fichier photographers.json
// Ensuite je dois filtrer les données car je veux récupérer que les médias d'un seul photographer + son profil

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

// Fonction pour filtrer et afficher les données du photographe
async function displayPhotographerData() {
  const { photographers, media } = await fetchData();
  
  // Filtre pour trouver le photographe correspondant à l'ID
  const photographer = photographers.find(photographer => photographer.id === id);
  
  // Filtre pour obtenir uniquement les médias du photographe
  const photographerMedia = media.filter(item => item.photographerId === id);
  
  // Affiche les informations du photographe
  displayPhotographerInfo(photographer);
  
  // Affiche les médias du photographe
  displayPhotographerMedia(photographerMedia);
}