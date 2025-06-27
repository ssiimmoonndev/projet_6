// Initialisation du select personnalisé
function initCustomSelect() {
  const customSelect = document.querySelector('.custom-select');
  if (!customSelect) return;
  
  const customSelectButton = customSelect.querySelector('.custom-select-button');
  const customSelectOptions = customSelect.querySelector('.custom-select-options');
  const options = customSelect.querySelectorAll('.custom-select-option');
  const originalSelect = document.getElementById('Trier');

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
  });

  // Ferme le menu si on clique ailleurs
  document.addEventListener('click', function(event) {
      if (!customSelect.contains(event.target)) {
          customSelectOptions.classList.remove('show');
          customSelectButton.classList.remove('open');
          customSelectButton.setAttribute('aria-expanded', 'false');
      }
  });

  // Gestion du clavier
  customSelectButton.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          customSelectButton.click();
      }
  });
}

// Initialise le select personnalisé quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initCustomSelect);