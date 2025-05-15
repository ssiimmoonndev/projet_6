function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// // DOM Elements
// const closeBtn = document.querySelector(".close"); // Séléctionne le bouton qui ferme la modale

// // launch modal event
// modalBtns.forEach(btn => { // Parcourt chaque élément "btn"
//   btn.addEventListener("click", displayModal);
// });

// // close modal event
// closeBtn.addEventListener("click", closeModal); // Ajoute un écouteur d'évènement 'click' au bouton de fermeture de la modale
