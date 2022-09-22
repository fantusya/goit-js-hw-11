const BASE_URL = 'https://pixabay.com/api/?key=30081101-40180903bea68f83c1da8999a';

export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
        const searchParams = new URLSearchParams({
            q: this.searchQuery,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
            page: this.page,
            per_page: 40,
        });

        const url = `${BASE_URL}&${searchParams}`;

        return fetch(url)
            .then(response => response.json())
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

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}