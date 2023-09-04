const defaults = {
    webformatURL: 'https://demofree.sirv.com/nope-not-here.jpg?w=150',
    largeImageURL: 'https://demofree.sirv.com/nope-not-here.jpg?w=150',
    tags: 'Tags not found',
    likes: 'XX',
    views: 'XX',
    comments: 'XX',
    downloads: 'XX',
}
export function createMarkup(arr) {
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
