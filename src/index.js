import './sass/index.scss';
import { lightbox } from './lightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImageApiSearch from './pixabay-api';
import { createMarkup } from './createMarkup';
import { isEmpty } from './isEmpty';

const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input[searchQuery]'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
}
const newSearch = new ImageApiSearch();
let shownPhoto = 0;

refs.form.addEventListener('submit', handlerSubmit);
refs.btnLoadMore.addEventListener('click', handlerLoadMore);
refs.btnLoadMore.classList.replace('load-more', 'hidden');

function handlerSubmit(e) {
    e.preventDefault();
    newSearch.query = e.currentTarget.elements.searchQuery.value.trim();
    newSearch.resetPage();
    if (!newSearch.query) {
        Notify.failure("Please fill in the field!");
        return;
  };

  refs.gallery.innerHTML = '';
  refs.btnLoadMore.classList.replace('load-more', 'hidden');
    newSearch.fetchSearchImages()
        .then((response) => {
            if (isEmpty(response.data.hits)) {
                Notify.failure("We're sorry, but no request found with this text", {
                    borderRadius: '10px',
                    timeout: 1000,
                });
                return false;
          }
          refs.btnLoadMore.classList.replace('hidden', 'load-more');;
          const totalPhoto = response.data.totalHits || 0;
          Notify.success(`Hooray! We found ${totalPhoto} images.`);
          
          refs.gallery.insertAdjacentHTML('beforeend', createMarkup(response.data.hits));
          lightbox.refresh();
          refs.gallery.firstElementChild.getBoundingClientRect();
          window.scrollBy({
            top: 100,
            behavior: "smooth",
    });
  });
}

function handlerLoadMore() {
    newSearch.fetchSearchImages()
        .then((response) => {
          refs.gallery.insertAdjacentHTML('beforeend', createMarkup(response.data.hits));
          shownPhoto += response.data.hits.length;
          console.log(Number(response.data.totalHits));
          console.log(Number(shownPhoto) );
          if (Number(shownPhoto) > Number(response.data.totalHits)) {
            Notify.failure("We're sorry, but you've reached the end of search results.")
            refs.btnLoadMore.classList.replace('load-more', 'hidden');
          }
          lightbox.refresh();
        });
}

