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
    newSearch.fetchSearchImages().then(hits => console.log(hits));
}

function handlerLoadMore() {
    newSearch.fetchSearchImages().then(hits => console.log(hits));
}