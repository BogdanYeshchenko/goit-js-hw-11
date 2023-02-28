import { el } from './elements';

export function renderMarkup({ hits }) {
  const markup = hits
    .map(
      hit => `
      <a href="${hit.largeImageURL}" class="photo-card">
        
          <img src="${hit.webformatURL}" class="gallery-img"
          alt="${hit.tags}" title="${hit.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes: ${hit.likes}</b>
            </p>
            <p class="info-item">
              <b>Views: ${hit.views}</b>
            </p>
            <p class="info-item">
              <b>Comments: ${hit.comments}</b>
            </p>
            <p class="info-item">
              <b>Downloads: ${hit.downloads}</b>
            </p>
          </div>
        
      </a>`
    )
    .join('');

  return markup;
}
