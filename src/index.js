import './sass/index.scss';
// import SlimSelect from 'slim-select';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImageApiSearch  from './pixabay-api';


const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input[searchQuery]'),
    btnSearch: document.querySelector('button'),
    list: document.querySelector('.js-list'),
}
const newSearch = new ImageApiSearch();

refs.form.addEventListener('submit', handlerSubmit)

function handlerSubmit(e) {
    e.preventDefault();
    newSearch.query = e.currentTarget.elements.searchQuery.value.trim();
    
    if (!newSearch.query) {
        alert('What`s up?');
    }
    newSearch.fetchSearchImages();
}

