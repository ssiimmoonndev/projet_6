// Variables pour gérer le focus de la lightbox
let lastFocusedElementLightbox = null;

// Fonction pour ouvrir la lightbox
window.openLightBox = function(index) {
    // Sauvegarde l'élément qui avait le focus avant l'ouverture de la lightbox
    lastFocusedElementLightbox = document.activeElement;
    
    // Ajoute la classe 'no-scroll' au body
    document.body.classList.add("no-scroll");
    
    // Récupère le média à l'index donné dans le tableau allPhotos
    const media = window.allPhotos[index];
    const lightbox = document.getElementById("lightbox_modal");
    lightbox.style.display = "flex";
    const photoLightBox = document.querySelector(".photo-lightbox");
    lightbox.setAttribute("aria-hidden", "false");
    photoLightBox.innerHTML = ""; // Nettoie le conteneur avant d'ajouter

    // Si le média est une image
    if (media.type === "image") {
        const img = document.createElement("img");
        img.setAttribute("alt", `${media.title}, agrandir l'image`);
        img.setAttribute("src", media.src);
        photoLightBox.appendChild(img);
    } else { // Si le média est une vidéo
        const videoHtml = document.createElement("video");
        const source = document.createElement("source");
        source.setAttribute("src", media.src);
        videoHtml.setAttribute("data-index", index);
        videoHtml.setAttribute("controls", true);
        videoHtml.setAttribute("aria-label", `${media.title}, contrôles vidéo`);
        videoHtml.appendChild(source);
        photoLightBox.appendChild(videoHtml);
    }
    const photoTitle = document.createElement("h3");
    photoTitle.textContent = media.title;
    photoTitle.className = "lightbox-title";
    photoLightBox.appendChild(photoTitle);

    // Focus sur le bouton de fermeture
    const closeButton = lightbox.querySelector(".close-button");
    if (closeButton) {
        closeButton.focus();
    }
    
    // Piège le focus dans la lightbox
    trapFocusLightbox(lightbox);
};

// Fonction pour fermer la lightbox
window.closeLightBox = function() {
    // Enlève la classe 'no-scroll' au body
    document.body.classList.remove("no-scroll");

    const lightbox = document.getElementById("lightbox_modal");
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
    const photoLightBox = document.querySelector(".photo-lightbox");
    photoLightBox.innerHTML = "";

    // Restaure le focus sur l'élément qui l'avait avant l'ouverture
    if (lastFocusedElementLightbox) {
        lastFocusedElementLightbox.focus();
    }
    
    // Supprime le piège de focus
    removeFocusTrapLightbox();
};

// Fonction pour mettre à jour l'image dans la lightbox
window.updateLightBoxImage = function() {
    // Récupère le média à l'index actuel
    const media = window.allPhotos[window.currentIndex];
    
    const photoLightBox = document.querySelector(".photo-lightbox");
    photoLightBox.innerHTML = ""; // Nettoie le conteneur avant d'ajouter
    if (media.type === "image") { // Si le média est une image
        const img = document.createElement("img");
        img.setAttribute("alt", `${media.title}, agrandir l'image`);
        img.setAttribute("src", media.src);
        photoLightBox.appendChild(img);
    } else { // Si le média est une vidéo
        const videoHtml = document.createElement("video");
        const source = document.createElement("source");
        source.setAttribute("src", media.src);
        videoHtml.setAttribute("data-index", window.currentIndex);
        videoHtml.setAttribute("controls", true);
        videoHtml.setAttribute("aria-label", `${media.title}, contrôles vidéo`);
        videoHtml.appendChild(source);
        photoLightBox.appendChild(videoHtml);
    }
    const photoTitle = document.createElement("h3");
    photoTitle.textContent = media.title;
    photoTitle.className = "lightbox-title";
    photoLightBox.appendChild(photoTitle);
};

// Fonction pour afficher l'image précédente dans la lightbox
window.showPreviousImage = function() {
    window.currentIndex = (window.currentIndex - 1 + window.allPhotos.length) % window.allPhotos.length;
    window.updateLightBoxImage();
};

// Fonction pour afficher l'image suivante dans la lightbox
window.showNextImage = function() {
    window.currentIndex = (window.currentIndex + 1) % window.allPhotos.length;
    window.updateLightBoxImage();
};

// Fonction pour piéger le focus dans la lightbox
function trapFocusLightbox(element) {
    const focusableElements = element.querySelectorAll(
        'button, video[controls], [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    // Gestionnaire d'événement pour la navigation au clavier dans la lightbox
    window.lightboxKeydownHandler = function(event) {
        // Fermer la lightbox avec Escape
        if (event.key === 'Escape') {
            event.preventDefault();
            window.closeLightBox();
            return;
        }
        
        // Navigation avec les flèches
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            window.showPreviousImage();
            return;
        }
        
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            window.showNextImage();
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
    document.addEventListener('keydown', window.lightboxKeydownHandler);
}

// Fonction pour supprimer le piège de focus de la lightbox
function removeFocusTrapLightbox() {
    if (window.lightboxKeydownHandler) {
        document.removeEventListener('keydown', window.lightboxKeydownHandler);
        window.lightboxKeydownHandler = null;
    }
}