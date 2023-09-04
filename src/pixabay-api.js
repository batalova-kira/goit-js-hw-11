import axios from "axios";
export default class ImageApiSearch {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
     async fetchSearchImages() {
    const BASE_URL = 'https://pixabay.com/api/';
    const params = new URLSearchParams({
        key: '39172985-9aae9b27665de10b1c143dbd8',
        q: this.searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: 40,
        page: this.page,
    });
    try {
        const resp = await axios.get(`${BASE_URL}?${params}`);
        const data = resp.data;
        if (data && data.hits) {
            this.incrementPage();
            return resp;
        } else {
            throw new Error("No 'hits' property found in response data.");
        }
    } catch (err) {
        console.log(err);
    }
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