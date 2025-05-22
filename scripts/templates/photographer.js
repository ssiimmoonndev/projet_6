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

function openLightBox(index, photos) {
  console.log(photos);
  
    const lightbox = document.querySelector(".lightbox");
    lightbox.classList.add("active");
    const photoLightBox = document.querySelector(".photo-lightbox");
    const img = document.createElement( 'img' );
    photoLightBox.appendChild(img);
    img.setAttribute("src", photos)
    
}

function closeLightBox() {
    const lightbox = document.querySelector(".lightbox");
    lightbox.classList.remove("active");
    const photoLightBox = document.querySelector(".photo-lightbox img");
    photoLightBox.remove();
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
                openLightBox(index, photos)
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
        }
        content.appendChild(h3)
        content.appendChild(p)

        return article
    }

    return { id, media, getMediaDOM }
}