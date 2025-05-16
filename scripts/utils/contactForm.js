function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const prenom = document.getElementById("first");
const nom = document.getElementById("last"); // Champ nom
const mail = document.getElementById("email"); // Champ mail
function validate() {
  let isValid = true;

  // Prenom
  const nameRegex = /^([a-zA-ZÀ-ÖØ-öø-ÿ]{2,})$/; // Création d'une regex pour vérifier que le prénom contient uniquement des lettres en majuscules et minuscules et a une longueur minimale de 2 caractères
  if (!nameRegex.test(prenom.value)) { // Vérifie si le prénom ne correspond pas à la regex
    displayError(prenom, "Le prénom doit contenir au moins 2 caractères"); // Affcihe ce message d'erreur si la validation échoue
    isValid = false; // Marque le formulaire comme invalide
  }

  // Nom
  if (!nameRegex.test(nom.value)) { // Regex identique àcelle du prénom
    displayError(nom, "Le nom doit contenir au moins 2 caractères"); // Affcihe ce message d'erreur si la validation échoue
    isValid = false; // Marque le formulaire comme invalide
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex qui vérifie le format d'une adresse mail
  if (!emailRegex.test(mail.value)) { // Vérifie si l'email ne correspond pas au format attendu
    displayError(mail, "Veuillez entrer une adresse mail valide"); // Affiche ce message d'erreur si la validation échoue
    isValid = false;  // Marque le formulaire comme invalide
  }

  // Ici, ça veut dire que le formulaire est bon, donc gérer le message de confirmation avec son apparition et sa disparition
  if (isValid === true) { // Si toutes les validations sont ok
    showConfirmation(); // Affiche le message de confirmation
    return true // Retourne true pour indiquer que le formulaire est valide
  }

  return isValid; // Retourne le statue de validation (true ou false)

}

document.querySelector("form").addEventListener("submit", function(event) { // Ajout d'un écouteur d'événement sur le formulaire lors de sa soumission
  console.log("Envoyer");
  
  if (!validate()) { // Vérifie la validation du formulaire
    event.preventDefault(); // Empêche l'envoi si le formulaire est invalide
  } else {
    event.preventDefault(); // Empêche la soumission réelle pour la démonstration
    showConfirmation(); // Affiche le message de confirmation
  }});