import axios from "axios";
// axios.defaults.headers.common["x-api-key"] = "live_6cHvPNYUXbm7yQZ53vVkKzqlyTfxjHtWMUPP8ndwWvLYQMQEFzrYA8knId3dmZ5E";

export default class ImageApiSearch {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
     async fetchSearchImages() {
            
        const BASE_URL = 'https://pixabay.com/api/';
        const params = new URLSearchParams ({
            key: '39172985-9aae9b27665de10b1c143dbd8',
            q: this.searchQuery,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
            per_page: 40,
            page: this.page,
    })
         return await axios.get(`${BASE_URL}?${params}`).
             then(resp => {
                 if (!resp.ok) {
                     throw new Error(resp.statusText);
                 }
                 this.incrementPage();
    const data = resp.data;
      return data.hits;
     })
    .catch (err => console.log(err)) 
  }

    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query (newQuery) {
        this.searchQuery = newQuery;
    }
}
