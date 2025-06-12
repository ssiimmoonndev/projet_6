
// Définit une fonction asynchrone (qui peut être mise en pause pendant qu'elle attend une réponse)
async function getPhotographers() {
  // Structure qui permet de gérer les erreurs
  try { 
    // "fetch" envoie une requête pour récupérer le fichier photographers.json
    // "await" fait attendre le code jusqu'à ce que la requête soit terminée
    // le résultat est stocké dans "response"
    const response = await fetch('./data/photographers.json'); 
    // Convertit la réponse en objet JavaScript
    // "await" est nécéssaire car cette conversion prend du temps
    const data = await response.json(); 
    // renvoie les données récupérées
    return data 
  }
  // Structure qui permet de gérer les erreurs
  catch {
    // Si une erreur se produit durant la requête, affiche "error" dans la console
    console.log("error"); 
  }
}

// Si une erreur se produit durant la requête, affiche "error" dans la console
async function displayData(photographers) { 
  // Affiche les données des photographes dans la console
  console.log(photographers);
  
  // Sélectionne l'élément HTML avec la classe "photographer_section" où les cartes des photographes seront affichées
  const photographersSection = document.querySelector(".photographer_section");
    

  // Parcourt chaque photographe dans le tableau
  photographers.forEach((photographer) => { 
      // Crée un modèle de photographe en utilisant la fonction "photographerTemplate"
      const photographerModel = photographerTemplate(photographer); 
      // Génère l'élément HTML représentant la carte du photographe
      const userCardDOM = photographerModel.getUserCardDOM(); 
      // Ajoute cette carte à la section des photographes dans le DOM
      photographersSection.appendChild(userCardDOM); 
  
  });
}

// Fonction d'initialisation
// Définit la fonction d'initialisation qui sera exécutée au chargement de la page
async function init() { 
    // Structure qui permet de gérer les erreurs
    try { 
        // Appelle la fonction "getPhotographers" et attend sa réponse\
        // Utilise la déstructuration pour extraire directement la propriété "photographers" des données renvoyées
        const {photographers} = await getPhotographers();
        // Passe les photographes à la fonction d'affichage
        displayData(photographers) 
      // Structure qui permet de gérer les erreurs
    } catch (error) { 
        // Affiche un message d'erreur détaillé si quelque chose se passe mal
        console.error('Erreur lors de l\'initialisation:', error); 
    }
}

  // Appeler init() au chargement de la page
  init();