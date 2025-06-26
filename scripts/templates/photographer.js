// Fonction template qui crée une carte de photographe
window.photographerTemplate = function(data) {
    // Déstructuration pour extraire les propriétés de l'objet data
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `./assets/photographers/SamplePhotos/Photographers_ID_Photos/${portrait}`;

    // Fonction qui génère et retourne l'élément DOM de la carte du photographe
    function getUserCardDOM() {
        const a = document.createElement("a");
        const article = document.createElement("article");
        const img = document.createElement("img");
        img.className = "photographer-image";
        img.setAttribute("src", picture);
        const imageContainer = document.createElement("div");
        imageContainer.className = "photographe-info-image";
        const h2 = document.createElement("h2");
        h2.textContent = name;
        const h3 = document.createElement("h3");
        h3.textContent = city + ", " + country;
        const h5 = document.createElement("h5");
        h5.textContent = tagline;
        const p = document.createElement("p");
        p.textContent = price + "€/jour";
        imageContainer.appendChild(img);
        article.appendChild(imageContainer);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h5);
        article.appendChild(p);
        a.appendChild(article);

        // Définit l'attribut href du lien vers la page du photographe avec son ID
        a.setAttribute("href", `photographer.html?id=${id}`);
        // Retourne l'élément lien complet
        return (a);
    }
    return { name, picture, getUserCardDOM };
};

// // Variables pour gérer le focus de la lightbox
// let lastFocusedElementLightbox = null;

// // Fonction pour ouvrir la lightbox
// window.openLightBox = function(index) {

//     // Sauvegarde l'élément qui avait le focus avant l'ouverture de la lightbox
//     lastFocusedElementLightbox = document.activeElement;
//     // Ajoute la classe 'no-scroll' au body, qui a pour style 'overflow: hidden'
//     // 'overflow: hidden' permet dans mon cas de ne pas afficher la barre de scroll et de nous empêcher de scroller
//     document.body.classList.add("no-scroll");
    
//     // Récupère le média à l'index donné dans le tableau allPhotos
//     const media = window.allPhotos[index];
//     const lightbox = document.getElementById("lightbox_modal");
//     lightbox.style.display = "flex";
//     const photoLightBox = document.querySelector(".photo-lightbox");
//     lightbox.setAttribute("aria-hidden", "false");
//     photoLightBox.innerHTML = ""; // Nettoie le conteneur avant d'ajouter

//     // Si le média est une image
//     if (media.type === "image") {
//         const img = document.createElement("img");
//         img.setAttribute("alt", media.title);
//         photoLightBox.appendChild(img);
//         // Définit le src de l'image
//         img.setAttribute("src", media.src);
//     } else { // Si le média est une vidéo
//         const videoHtml = document.createElement("video");
//         const source = document.createElement("source");
//         source.setAttribute("src", media.src);
//         videoHtml.setAttribute("data-index", index);
//         videoHtml.setAttribute("controls", true);
//         videoHtml.setAttribute("aria-label", media.title);
//         videoHtml.appendChild(source);
//         photoLightBox.appendChild(videoHtml);
//     }
//     const photoTitle = document.createElement("h3");
//     photoTitle.textContent = media.title;
//     photoTitle.className = "lightbox-title";
//     photoLightBox.appendChild(photoTitle);

//      // Focus sur le bouton de fermeture
//      const closeButton = lightbox.querySelector(".close-button");
//      if (closeButton) {
//          closeButton.focus();
//      }
     
//      // Piège le focus dans la lightbox
//      trapFocusLightbox(lightbox);
// };



// // Fonction pour fermer la lightbox
// window.closeLightBox = function() {
//     // Enlève la classe 'no-scroll' au body, qui a pour style 'overflow: hidden'
//     // 'overflow: hidden' permet dans mon cas de ne pas afficher la barre de scroll et de nous empêcher de scroller
//     document.body.classList.remove("no-scroll");

//     const lightbox = document.getElementById("lightbox_modal");
//     lightbox.style.display = "none";
//     lightbox.setAttribute("aria-hidden", "true");
//     const photoLightBox = document.querySelector(".photo-lightbox");
//     photoLightBox.innerHTML = "";

//      // Restaure le focus sur l'élément qui l'avait avant l'ouverture
//      if (lastFocusedElementLightbox) {
//         lastFocusedElementLightbox.focus();
//     }
    
//     // Supprime le piège de focus
//     removeFocusTrapLightbox();
// };

// // Fonction pour mettre à jour l'image dans la lightbox
// window.updateLightBoxImage = function() {
//     // Récupère le média à l'index actuel
//     const media = window.allPhotos[window.currentIndex];
    
//     const photoLightBox = document.querySelector(".photo-lightbox");
//     photoLightBox.innerHTML = ""; // Nettoie le conteneur avant d'ajouter
//     if (media.type === "image") { // Si le média est une image
//         const img = document.createElement("img");
//         img.setAttribute("alt", media.title);
//         photoLightBox.appendChild(img);
//         img.setAttribute("src", media.src);
//     } else { // Si le média est une vidéo
//         const videoHtml = document.createElement("video");
//         const source = document.createElement("source");
//         source.setAttribute("src", media.src);
//         videoHtml.setAttribute("data-index", window.currentIndex);
//         videoHtml.setAttribute("controls", true);
//         videoHtml.setAttribute("aria-label", media.title);
//         videoHtml.appendChild(source);
//         photoLightBox.appendChild(videoHtml);
//     }
//     const photoTitle = document.createElement("h3");
//     photoTitle.textContent = media.title;
//     photoTitle.className = "lightbox-title";
//     photoLightBox.appendChild(photoTitle);
// };

// // Fonction pour piéger le focus dans la lightbox
// function trapFocusLightbox(element) {
//     const focusableElements = element.querySelectorAll(
//         'button, video[controls], [tabindex]:not([tabindex="-1"])'
//     );
    
//     if (focusableElements.length === 0) return;
    
//     const firstFocusableElement = focusableElements[0];
//     const lastFocusableElement = focusableElements[focusableElements.length - 1];

//     // Gestionnaire d'événement pour la navigation au clavier dans la lightbox
//     window.lightboxKeydownHandler = function(event) {
//         // Fermer la lightbox avec Escape
//         if (event.key === 'Escape') {
//             event.preventDefault();
//             window.closeLightBox();
//             return;
//         }
        
//         // Navigation avec les flèches
//         if (event.key === 'ArrowLeft') {
//             event.preventDefault();
//             window.showPreviousImage();
//             return;
//         }
        
//         if (event.key === 'ArrowRight') {
//             event.preventDefault();
//             window.showNextImage();
//             return;
//         }
        
//         // Gestion de la tabulation
//         if (event.key === 'Tab') {
//             if (event.shiftKey) {
//                 // Shift + Tab (navigation vers l'arrière)
//                 if (document.activeElement === firstFocusableElement) {
//                     event.preventDefault();
//                     lastFocusableElement.focus();
//                 }
//             } else {
//                 // Tab (navigation vers l'avant)
//                 if (document.activeElement === lastFocusableElement) {
//                     event.preventDefault();
//                     firstFocusableElement.focus();
//                 }
//             }
//         }
//     };
    
//     // Ajout de l'écouteur d'événement
//     document.addEventListener('keydown', window.lightboxKeydownHandler);
// }

// // Fonction pour supprimer le piège de focus de la lightbox
// function removeFocusTrapLightbox() {
//     if (window.lightboxKeydownHandler) {
//         document.removeEventListener('keydown', window.lightboxKeydownHandler);
//         window.lightboxKeydownHandler = null;
//     }
// }

// Fonction template qui crée un élément média (image ou vidéo)
window.imageTemplate = function(media, index) {
    // Déstructuration pour extraire les propriétés de l'objet media
    const { id, photographerId, title, image, video, likes } = media;

    function getMediaDOM() {
        const article = document.createElement("article");
        const content = document.createElement("div");
        const photosPhotograph = document.createElement("div");
        article.appendChild(photosPhotograph);
        photosPhotograph.className = "photos-photographe";
        article.appendChild(content);
        content.className = "titre-like";
        const h3 = document.createElement("h3");
        h3.textContent = title;
        const p = document.createElement("p");
        p.textContent = likes + " ♥ ";
        p.style.cursor = "pointer"; // Indique que c'est cliquable
        p.style.userSelect = "none"; // Empêche la sélection du texte

        // Variable pour dire qu'aucune photos n'est likée
        let isLiked = false;
        // Fonction qui gère le clic sur les likes
        function likePhoto() {
            // Si pas encore liké
            if (!isLiked) {
                isLiked = true;
                const newLikes = likes + 1;
                p.textContent = newLikes + " ♥ ";
                window.totalLikes += 1;
                window.updateTotalLikesDisplay();
                // Supprime l'écouteur d'événement pour empêcher de re-liker
                p.removeEventListener("click", likePhoto);
            }
        }
        p.addEventListener("click", likePhoto);

        if (image) {
            const photos = `./assets/photographers/SamplePhotos/${photographerId}/${image}`;
            const img = document.createElement("img");
            img.setAttribute("src", photos);
            photosPhotograph.appendChild(img);
            img.setAttribute("data-index", index);
            img.addEventListener("click", () => {
                window.currentIndex = index;
                window.openLightBox(index);
            });
        } else {
            const srcVideo = `./assets/photographers/SamplePhotos/${photographerId}/${video}`;
            const videoHtml = document.createElement("video");
            const source = document.createElement("source");
            source.setAttribute("src", srcVideo);
            videoHtml.setAttribute("data-index", index);
            videoHtml.setAttribute("controls", true);
            videoHtml.appendChild(source);
            photosPhotograph.appendChild(videoHtml);
            videoHtml.addEventListener("click", () => {
                window.currentIndex = index;
                window.openLightBox(index);
            });
        }
        content.appendChild(h3);
        content.appendChild(p);

        return article;
    }

    return { id, media, getMediaDOM };
};