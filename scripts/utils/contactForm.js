function displayModal() {

  // Ajoute la classe 'no-scroll' au body, qui a pour style 'overflow: hidden'
  // 'overflow: hidden' permet dans mon cas de ne pas afficher la barre de scroll et de nous empêcher de scroller
  document.body.classList.add('no-scroll');

  const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {

  // Enlève la classe 'no-scroll' au body, qui a pour style 'overflow: hidden'
  // 'overflow: hidden' permet dans mon cas de ne pas afficher la barre de scroll et de nous empêcher de scroller
  document.body.classList.remove('no-scroll');

  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

const prenom = document.getElementById("first"); // Champ prenom
const nom = document.getElementById("last"); // Champ nom
const mail = document.getElementById("email"); // Champ mail
const phone = document.getElementById("number"); // Champ phone


document.querySelector("form").addEventListener("submit", function(event) { // Ajout d'un écouteur d'événement sur le formulaire lors de sa soumission
  event.preventDefault(); // Empêche l'envoi si le formulaire est invalide
  
    console.log(prenom.value);
    console.log(nom.value);
    console.log(mail.value);
    console.log(phone.value);
    
  });