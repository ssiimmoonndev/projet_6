function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/SamplePhotos/Photographers_ID_Photos/${portrait}`;

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

        a.setAttribute("href", `photographer.html?id=${id}`)
        return (a);
    }
    return { name, picture, getUserCardDOM }
}

function openLightBox(index) {
    
    const media = allPhotos[index];
    const lightbox = document.querySelector(".lightbox");
    lightbox.classList.add("active");
    const photoLightBox = document.querySelector(".photo-lightbox");
    photoLightBox.innerHTML = ""; // Nettoie avant d'ajouter
    if (media.type == "image") {
        const img = document.createElement( 'img' );
        photoLightBox.appendChild(img);
        img.setAttribute("src", media.src)
    } else {
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
    const lightbox = document.querySelector(".lightbox");
    lightbox.classList.remove("active");
    const photoLightBox = document.querySelector(".photo-lightbox");
    photoLightBox.innerHTML = "";
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % allPhotos.length;
    updateLightBoxImage();
}

function showPreviousImage() {
    currentIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
    updateLightBoxImage();
}

function updateLightBoxImage() {
    const media = allPhotos[currentIndex]

    
    
    
    const photoLightBox = document.querySelector(".photo-lightbox");
    photoLightBox.innerHTML = ""; // Nettoie avant d'ajouter
    if (media.type == "image") {
        const img = document.createElement( 'img' );
        photoLightBox.appendChild(img);
        img.setAttribute("src", media.src)
    } else {
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


function imageTemplate(media, index) {
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