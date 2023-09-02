import './sass/index.scss';
// import SlimSelect from 'slim-select';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
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

function handlerSubmit(e) {
    e.preventDefault();
    newSearch.query = e.currentTarget.elements.searchQuery.value.trim();
    newSearch.resetPage();
    if (!newSearch.query) {
        alert('What`s up?');
    }
    newSearch.fetchSearchImages()
        .then((data) => { refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits))});
}

function handlerLoadMore() {
    newSearch.fetchSearchImages()
        .then((data) => { refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits)) });;
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
    return arr.map(( webformatURL, largeImageURL, tags, likes, views, comments, downloads) => {
        `<div class="photo-card">
  <img src="${webformatURL || defaults.webformatURL}" alt="${tags || defaults.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes || defaults.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views || defaults.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments || defaults.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads || defaults.downloads}
    </p>
  </div>
</div>`
    }).join("");
}