// Variables pour gérer le focus
let lastFocusedElement = null;

window.displayModal = function() {
  // Sauvegarde l'élément qui avait le focus avant l'ouverture de la modale
  lastFocusedElement = document.activeElement;

  // Ajoute la classe 'no-scroll' au body
  document.body.classList.add('no-scroll');

  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  
  // Focus sur le premier élément focusable de la modale
  const firstFocusableElement = modal.querySelector('input, button, textarea, select');
  if (firstFocusableElement) {
    firstFocusableElement.focus();
  }
  
  // Piège le focus dans la modale
  trapFocus(modal);
}

window.closeModal = function() {
  // Enlève la classe 'no-scroll' au body
  document.body.classList.remove('no-scroll');

  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  
  // Restaure le focus sur l'élément qui l'avait avant l'ouverture
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
  
  // Supprime le piège de focus
  removeFocusTrap();
}

// Fonction pour piéger le focus dans un élément
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'input, button, textarea, select, a[href], [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return;
  
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  // Gestionnaire d'événement pour la navigation au clavier
  window.modalKeydownHandler = function(event) {
    // Fermer la modale avec Escape
    if (event.key === 'Escape') {
      closeModal();
      return;
    }
    
    // Gestion de la tabulation
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift + Tab (navigation vers l'arrière)
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        // Tab (navigation vers l'avant)
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  };
  
  // Ajout de l'écouteur d'événement
  document.addEventListener('keydown', window.modalKeydownHandler);
}

// Fonction pour supprimer le piège de focus
function removeFocusTrap() {
  if (window.modalKeydownHandler) {
    document.removeEventListener('keydown', window.modalKeydownHandler);
    window.modalKeydownHandler = null;
  }
}

const prenom = document.getElementById("first");
const nom = document.getElementById("last");
const mail = document.getElementById("email");
const phone = document.getElementById("number");

document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  console.log(prenom.value);
  console.log(nom.value);
  console.log(mail.value);
  console.log(phone.value);
});