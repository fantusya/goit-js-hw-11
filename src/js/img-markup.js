export default function makeImageMarkup(images) {
    return images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<a class="large-photo" href="${largeImageURL}">
            <div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        <span class="number">${likes}</span>
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        <span class="number">${views}</span>
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        <span class="number">${comments}</span>
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        <span class="number">${downloads}</span>
                    </p>
                </div>
            </div>
        </a>`
    ).join('');
}