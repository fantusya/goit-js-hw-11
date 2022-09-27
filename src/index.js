import './css/styles.css';
import ImagesApiService from "./js/images-api";
import makeImageMarkup from "./js/img-markup";
import calculateBodyPaddingTop from "./js/body-padding";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formContainer = document.querySelector('.form-container');
const form = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const sentinel = document.querySelector('#sentinel');

const imagesApiService = new ImagesApiService();
let lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

form.addEventListener('submit', onFormSubmit);

calculateBodyPaddingTop(formContainer);

function onFormSubmit(e) {
  e.preventDefault();
    
  imagesApiService.query = e.currentTarget.elements.query.value;

  if (imagesApiService.query.trim() === '') {
      return Notify.warning('Please enter a keyword to search!');;
  }

  imagesApiService.resetPage();
  clearGalleryContainer();

  imagesApiService
      .fetchImages()
      .then(({ total, hits, totalHits }) => {
          if (total === 0) {
            return Notify.failure('Sorry, there are no images matching your search query. Please try again.'); 
          }

          Notify.success(`Hooray! We found ${totalHits} images.`);

          insertingImgMarkup(hits);

          lightbox.refresh();

        imagesApiService.incrementPage();

        infiniteScroll();
      })
}

function infiniteScroll() {
  const onEntry = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && imagesApiService.query !== '') {
        imagesApiService
          .fetchImages()
            .then(({ hits }) => {
                if (hits.length === 0) {
                  Notify.warning('We`re sorry, but you`ve reached the end of search results.')
              }

              insertingImgMarkup(hits);
              imagesApiService.incrementPage();
          })
      }
    })
  };
  const observer = new IntersectionObserver(onEntry, {
    rootMargin: '100px',
  });

  observer.observe(sentinel);
}


// const onEntry = entries => {
//   console.log(entries);
//   entries.forEach(entry => {
//     if (entry.isIntersecting && imagesApiService.query !== '') {
//       imagesApiService
//         .fetchImages()
//           .then(({ hits }) => {
//               if (hits.length === 0) {
//                 Notify.warning('We`re sorry, but you`ve reached the end of search results.')
//             }

//             insertingImgMarkup(hits);
//             imagesApiService.incrementPage();
//         })
//     }
//   });
// };
// const observer = new IntersectionObserver(onEntry, {
//   rootMargin: '100px',
// });

// observer.observe(sentinel);

function clearGalleryContainer() {
  galleryContainer.innerHTML = '';
}

function insertingImgMarkup(images) {
  galleryContainer.insertAdjacentHTML('beforeend', makeImageMarkup(images));
}