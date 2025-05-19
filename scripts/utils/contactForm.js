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
const phone = document.getElementById("number");


document.querySelector("form").addEventListener("submit", function(event) { // Ajout d'un écouteur d'événement sur le formulaire lors de sa soumission
  event.preventDefault(); // Empêche l'envoi si le formulaire est invalide
  
    console.log(prenom.value);
    console.log(nom.value);
    console.log(mail.value);
    console.log(phone.value);
    
  });