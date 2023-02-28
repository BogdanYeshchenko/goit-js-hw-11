import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import throttle from 'lodash.throttle';

import { el } from './js-module/elements';
import { reseivingData } from './js-module/reseiving-data';
import { renderMarkup } from './js-module/render-markup';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let page = 1;
let request = null;
let isReseivingData = false;

const onSubmit = async e => {
  e.preventDefault();

  request = e.target.elements.searchQuery.value;
  page = 1;

  setScrollHandler();

  const data = await reseivingData(request, page);

  if (data.total === 0) {
    Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  Notify.success(`We found ${data.totalHits} pictures`);

  el.gallery.innerHTML = renderMarkup(data);

  lightbox.refresh();
  console.log(data);

  e.target.reset();
};

const handleRefreshPageByScroll = throttle(async e => {
  const scrollHeight = e.target.documentElement.scrollHeight;
  const scrollTop = e.target.documentElement.scrollTop;
  const clientHeight = e.target.documentElement.clientHeight;
  const scrollLeft = scrollHeight - scrollTop - clientHeight;
  if (scrollLeft < 300 && !isReseivingData) {
    page += 1;
    isReseivingData = true;

    const data = await reseivingData(request, page);

    if (Math.ceil(data.totalHits / 40) === page - 1) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );

      isReseivingData = false;

      return removeScrollHandelr();
    }

    el.gallery.insertAdjacentHTML('beforeend', renderMarkup(data));
    lightbox.refresh();
    isReseivingData = false;
    console.log(data);
  }
}, 500);

el.searchForm.addEventListener('submit', onSubmit);

function setScrollHandler() {
  window.addEventListener('scroll', handleRefreshPageByScroll);
}

function removeScrollHandelr() {
  window.removeEventListener('scroll', handleRefreshPageByScroll);
}
