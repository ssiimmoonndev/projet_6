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