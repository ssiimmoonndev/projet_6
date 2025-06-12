// Fonction template qui crée une carte de photographe
function photographerTemplate(data) {
    // Déstructuration pour extraire les propriétés de l'objet data
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/SamplePhotos/Photographers_ID_Photos/${portrait}`;

    // Fonction qui génère et retourne l'élément DOM de la carte du photographe
    function getUserCardDOM() {
        const a = document.createElement( 'a' );
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.className = "photographer-image";
        img.setAttribute("src", picture)
        const imageContainer = document.createElement('div');
        imageContainer.className = "photographe-info-image";
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = city + ", " + country;
        const h5 = document.createElement( 'h5' );
        h5.textContent = tagline;
        const p = document.createElement( 'p' );
        p.textContent = price + "€/jour";
        imageContainer.appendChild(img);
        article.appendChild(imageContainer);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h5);
        article.appendChild(p);
        a.appendChild(article);

        // Définit l'attribut href du lien vers la page du photographe avec son ID
        a.setAttribute("href", `photographer.html?id=${id}`)
        // Retourne l'élément lien complet
        return (a);
    }
    return { name, picture, getUserCardDOM }
}

function openLightBox(index) {

    // Ajoute la classe 'no-scroll' au body, qui a pour style 'overflow: hidden'
    // 'overflow: hidden' permet dans mon cas de ne pas afficher la barre de scroll et de nous empêcher de scroller
    document.body.classList.add('no-scroll');
    
    // Récupère le média à l'index donné dans le tableau allPhotos
    const media = allPhotos[index];
    const lightbox = document.getElementById("lightbox_modal");
    lightbox.style.display = "flex";
    const photoLightBox = document.querySelector(".photo-lightbox");
    photoLightBox.innerHTML = ""; // Nettoie le conteneur avant d'ajouter
    // Si le média est une image
    if (media.type == "image") {
        const img = document.createElement( 'img' );
        photoLightBox.appendChild(img);
        // Définit le src de l'image
        img.setAttribute("src", media.src)
    } else { // Si le média est une vidéo
        const videoHtml = document.createElement( 'video' );
        const source = document.createElement( 'source' );
        source.setAttribute("src", media.src)
        videoHtml.setAttribute("data-index", index);
        videoHtml.setAttribute("controls", true);
        videoHtml.appendChild(source);
        photoLightBox.appendChild(videoHtml);
    }
    const photoTitle = document.createElement('h3');
    photoTitle.textContent = media.title;
    photoTitle.className = "lightbox-title";
    photoLightBox.appendChild(photoTitle);

}

function closeLightBox() {
    // Enlève la classe 'no-scroll' au body, qui a pour style 'overflow: hidden'
    // 'overflow: hidden' permet dans mon cas de ne pas afficher la barre de scroll et de nous empêcher de scroller
    document.body.classList.remove('no-scroll');

    const lightbox = document.getElementById("lightbox_modal");
    lightbox.style.display = "none";
    const photoLightBox = document.querySelector(".photo-lightbox");
    photoLightBox.innerHTML = "";
}

function showNextImage() {
    // Calcule l'index suivant en bouclant au début si on arrive à la fin
    // % (modulo) assure qu'on revient à 0 après le dernier élément
    currentIndex = (currentIndex + 1) % allPhotos.length;
    updateLightBoxImage();
}

function showPreviousImage() {
    // Calcule l'index précédent en bouclant à la fin si on est au début
    // + allPhotos.length évite les nombres négatifs
    currentIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
    updateLightBoxImage();
}

function updateLightBoxImage() {
    // Récupère le média à l'index actuel
    const media = allPhotos[currentIndex]
    
    const photoLightBox = document.querySelector(".photo-lightbox");
    photoLightBox.innerHTML = ""; // Nettoie le conteneur avant d'ajouter
    if (media.type == "image") { // Si le média est une image
        const img = document.createElement( 'img' );
        photoLightBox.appendChild(img);
        img.setAttribute("src", media.src)
    } else { // Si le média est une vidéo
        const videoHtml = document.createElement( 'video' );
        const source = document.createElement( 'source' );
        source.setAttribute("src", media.src)
        videoHtml.setAttribute("data-index", currentIndex);
        videoHtml.setAttribute("controls", true);
        videoHtml.appendChild(source);
        photoLightBox.appendChild(videoHtml);
    }
    const photoTitle = document.createElement('h3');
    photoTitle.textContent = media.title;
    photoTitle.className = "lightbox-title";
    photoLightBox.appendChild(photoTitle);
    
    // const photoTitle = document.querySelector("h3");
    // photoTitle.setAttribute("src", allPhotos[currentIndex]);
}

// Fonction template qui crée un élément média (image ou vidéo)
function imageTemplate(media, index) {
    // Déstructuration pour extraire les propriétés de l'objet media
    const { id, photographerId, title, image, video, likes } = media;

    function getMediaDOM() {
        const a = document.createElement( 'a' );
        const article = document.createElement( 'article' );
        const content = document.createElement('div');
        const photosPhotograph = document.createElement('div');
        article.appendChild(photosPhotograph);
        photosPhotograph.className = "photos-photographe";
        article.appendChild(content);
        content.className = "titre-like";
        const h3 = document.createElement('h3');
        h3.textContent = title;
        const p = document.createElement('p');
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
                totalLikes += 1;
                updateTotalLikesDisplay();
                // Supprime l'écouteur d'événement pour empêcher de re-liker
                p.removeEventListener("click", likePhoto);
            }
        }
        p.addEventListener("click", likePhoto);

        if (image) {
            const photos = `/assets/photographers/SamplePhotos/${photographerId}/${image}`;
            const img = document.createElement( 'img' );
            img.setAttribute("src", photos)
            photosPhotograph.appendChild(img);
            img.setAttribute("data-index", index);
            img.addEventListener("click", () => {
                currentIndex = index;
                openLightBox(index)
            })
        } else {
            const srcVideo = `/assets/photographers/SamplePhotos/${photographerId}/${video}`;
            const videoHtml = document.createElement( 'video' );
            const source = document.createElement( 'source' );
            source.setAttribute("src", srcVideo)
            videoHtml.setAttribute("data-index", index);
            videoHtml.setAttribute("controls", true);
            videoHtml.appendChild(source);
            photosPhotograph.appendChild(videoHtml);
            videoHtml.addEventListener("click", () => {
                currentIndex = index;
                openLightBox(index)
            })
        }
        content.appendChild(h3)
        content.appendChild(p)

        return article
        
    }

    return { id, media, getMediaDOM }
}


let totalLikes = 0;

// Fonction pour mettre à jour l'affichage du total des likes
function updateTotalLikesDisplay() {
    const container = document.querySelector(".like-and-price");
    if (container) {
    //   totalLikesElement.textContent = totalLikes + " ♥ ";
        container.innerHTML = `
        <p style="margin: 0;">${totalLikes} ♥</p>
        <p style="margin: 0;">${photographerPrice}€/jour</p>
        `;
    }
  }
  
  // Fonction pour calculer le total initial des likes
  function calculateInitialTotalLikes(photographerMedia) {
    totalLikes = photographerMedia.reduce((sum, media) => sum + media.likes, 0);
  }
  
  // Fonction pour afficher le total des likes
  function displayTotalLikes() {
    const photographerSection = document.querySelector(".photographer-info"); 
    
    const totalLikesContainer = document.createElement('div');
    totalLikesContainer.className = "total-likes-container";
    
    const totalLikesElement = document.createElement('p');
    totalLikesElement.className = "total-likes";
    totalLikesElement.textContent = totalLikes + " ♥";
    
    totalLikesContainer.appendChild(totalLikesElement);
    photographerSection.appendChild(totalLikesContainer);
  }
