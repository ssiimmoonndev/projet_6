function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `/assets/photographers/SamplePhotos/Photographers_ID_Photos/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement( 'a' );
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = city + ", " + country;
        const h5 = document.createElement( 'h5' );
        h5.textContent = tagline;
        const p = document.createElement( 'p' );
        p.textContent = price + "€/jour";
        article.appendChild(img);
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

function imageTemplate(media) {
    const { id, photographerId, title, image, likes } = media;

    const photos = `/assets/photographers/SamplePhotos/${photographerId}`;

    function getMediaDOM() {
        const a = document.createElement( 'a' );
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", media)
        const h3 = document.createElement ( 'h3' );
        h3.textContent = title;
        const p = document.createElement ( 'p' );
        p.textContent = likes;
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(p);
    }

    return { id, media, getUserCardDOM }
}