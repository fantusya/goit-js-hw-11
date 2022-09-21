const BASE_URL = 'https://pixabay.com/api/?key=30081101-40180903bea68f83c1da8999a';

const searchParams = new URLSearchParams({
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: 40,
});

export default function fetchImages(input) {
    const url = `${BASE_URL}&q=${input}&${searchParams}`;

    return fetch(url)
        .then(response => {
            if (response.status === 404) {
                throw new Error(response.status);
            }
            return response.json()
        })
}