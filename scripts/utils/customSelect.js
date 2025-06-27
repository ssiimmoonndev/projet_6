// Initialisation du select personnalisé
function initCustomSelect() {
  const customSelect = document.querySelector('.custom-select');
  if (!customSelect) return;
  
  const customSelectButton = customSelect.querySelector('.custom-select-button');
  const customSelectOptions = customSelect.querySelector('.custom-select-options');
  const options = customSelect.querySelectorAll('.custom-select-option');
  const originalSelect = document.getElementById('Trier');

  // Rend les options focusables
  options.forEach(option => {
    option.setAttribute('tabindex', '0');
  });

  // Toggle du menu
  customSelectButton.addEventListener('click', function() {
      const isOpen = customSelectOptions.classList.contains('show');
      
      if (isOpen) {
          customSelectOptions.classList.remove('show');
          customSelectButton.classList.remove('open');
          customSelectButton.setAttribute('aria-expanded', 'false');
      } else {
          customSelectOptions.classList.add('show');
          customSelectButton.classList.add('open');
          customSelectButton.setAttribute('aria-expanded', 'true');
      }
  });

  // Sélection d'une option
  options.forEach(option => {
      option.addEventListener('click', function() {
          const value = this.dataset.value;
          const text = this.textContent;

          // Met à jour l'apparence
          customSelectButton.textContent = text;
          
          // Met à jour les états selected
          options.forEach(opt => opt.classList.remove('selected'));
          this.classList.add('selected');

          // Met à jour le select original
          originalSelect.value = value;

          // Déclenche l'événement change sur le select original
          const changeEvent = new Event('change', { bubbles: true });
          originalSelect.dispatchEvent(changeEvent);

          // Ferme le menu
          customSelectOptions.classList.remove('show');
          customSelectButton.classList.remove('open');
          customSelectButton.setAttribute('aria-expanded', 'false');
      });

      // Ajout de la navigation clavier sur les options
      option.addEventListener('keydown', function(event) {
          if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              this.click(); // Déclenche le clic
          }
      });
  });

  // Ferme le menu si on clique ailleurs
  document.addEventListener('click', function(event) {
      if (!customSelect.contains(event.target)) {
          customSelectOptions.classList.remove('show');
          customSelectButton.classList.remove('open');
          customSelectButton.setAttribute('aria-expanded', 'false');
      }
  });

  // Gestion du clavier sur le bouton principal
  customSelectButton.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          customSelectButton.click();
      }
      
      // Navigation avec les flèches quand le menu est ouvert
      if (event.key === 'ArrowDown' && customSelectOptions.classList.contains('show')) {
          event.preventDefault();
          const firstOption = options[0];
          if (firstOption) {
              firstOption.focus();
          }
      }
  });

  // Navigation entre les options avec les flèches
  options.forEach((option, index) => {
      option.addEventListener('keydown', function(event) {
          if (event.key === 'ArrowDown') {
              event.preventDefault();
              const nextOption = options[index + 1] || options[0];
              nextOption.focus();
          }
          
          if (event.key === 'ArrowUp') {
              event.preventDefault();
              const prevOption = options[index - 1] || options[options.length - 1];
              prevOption.focus();
          }
          
          if (event.key === 'Escape') {
              event.preventDefault();
              customSelectOptions.classList.remove('show');
              customSelectButton.classList.remove('open');
              customSelectButton.setAttribute('aria-expanded', 'false');
              customSelectButton.focus();
          }
      });
  });
}

// Initialise le select personnalisé quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initCustomSelect);