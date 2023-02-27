import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { el } from './js-module/elements';
import { reseivingData } from './js-module/reseiving-data';
import { renderMarkup } from './js-module/render-markup';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

el.searchForm.addEventListener('submit', handleRenderMarkup);
window.addEventListener('scroll', handleRefreshPageByScroll);

function handleRefreshPageByScroll(e) {
  //   console.dir(e.target.documentElement);

  const scrollHeight = e.target.documentElement.scrollHeight;
  const scrollTop = e.target.documentElement.scrollTop;
  const clientHeight = e.target.documentElement.clientHeight;

  console.log(scrollHeight - scrollTop - clientHeight);
}

function handleRenderMarkup(e) {
  e.preventDefault();
  const request = e.target.elements.searchQuery.value;

  reseivingData(request).then(data => {
    if (data.total === 0) {
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    renderMarkup(data);
    lightbox.refresh();
    console.log(data);
  });

  e.target.reset();
}
