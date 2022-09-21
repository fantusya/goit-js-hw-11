import './css/styles.css';
import fetchImages from "./js/fetchImages";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const form = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery')
form.addEventListener('submit', onFormSubmit);

// const url2 = 'https://pixabay.com/api/?key=30081101-40180903bea68f83c1da8999a&q=yellow+flowers&image_type=horizontal&orientation=horizontal&safesearch=true'

function onFormSubmit(e) {
    e.preventDefault();
    
    clearHtml();

    let currentValue = e.currentTarget.searchQuery.value;

    fetchImages(currentValue)
        .then(({total , hits, totalHits}) => {
            if (total === 0) {
                Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                return;
            }
            Notify.success(`Hooray! We found ${totalHits} images.`);
            makeImageMarkup(hits);
        });
}

function makeImageMarkup(images) {
    const imagesMarkup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
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

    galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);

    new SimpleLightbox('.gallery a', {
    captionDelay: 250
})
}

function clearHtml() {
    galleryContainer.innerHTML = '';
}