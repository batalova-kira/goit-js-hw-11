import './sass/index.scss';
import { lightbox } from './lightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImageApiSearch  from './pixabay-api';

const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input[searchQuery]'),
    btnSearch: document.querySelector('.search-btn'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
}
const newSearch = new ImageApiSearch();

refs.form.addEventListener('submit', handlerSubmit);
refs.btnLoadMore.addEventListener('click', handlerLoadMore);

const isEmpty = (data) => {
  if (typeof data === 'object' || Array.isArray(data)) {
    if ((Object.keys(data).length === 0) || (data.length === 0)) {
      return true;
    }
  } else {
    switch (data) {
      case typeof(data) === "undefined":
      case "":
      case 0:
      case "0":
      case null:
      case false:
        return true;
    }
  }
  return false;
}

function handlerSubmit(e) {
    e.preventDefault();
    newSearch.query = e.currentTarget.elements.searchQuery.value.trim();
    newSearch.resetPage();
    if (!newSearch.query) {
        Notify.failure("Please fill in the field!");
    }
    newSearch.fetchSearchImages()
        .then((data) => {
            if (isEmpty(data.hits)) {
                Notify.failure("We're sorry, but you've reached the end of search results.", {
                position: 'top-right',
                borderRadius: '10px',
                timeout: 1000,
                })
                return false;
            }
            Notify.success(`Hooray! We found ${data.total} images.`); 

            refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
            lightbox.refresh();
        });
}

function handlerLoadMore() {
    newSearch.fetchSearchImages()
        .then((data) => { refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits)) });
}

const defaults = {
    webformatURL: 'https://demofree.sirv.com/nope-not-here.jpg?w=150',
    largeImageURL: 'https://demofree.sirv.com/nope-not-here.jpg?w=150',
    tags: 'Tags not found',
    likes: 'XX',
    views: 'XX',
    comments: 'XX',
    downloads: 'XX',
}

function createMarkup(arr) {
    return arr.map(item => `
    <div class="photo-card">
  <a class="photo-link" href="${item.largeImageURL || defaults.largeImageURL}">
        <div >
          <img class="photo-img" src="${item.webformatURL || defaults.webformatURL}" alt="${item.tags || defaults.tags}" loading="lazy" />
        </div>
          <div class="info">
              <p class="info-item">
                  <b>Likes</b> ${item.likes || defaults.likes}
              </p>
              <p class="info-item">
                  <b>Views</b> ${item.views || defaults.views}
              </p>
              <p class="info-item">
                  <b>Comments</b> ${item.comments || defaults.comments}
              </p>
              <p class="info-item">
                  <b>Downloads</b> ${item.downloads || defaults.downloads}
              </p>
          </div>
        </a>
    </div>
  `).join("");
}

const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});