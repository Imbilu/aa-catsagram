window.onload = () => {
    // 1. Fetch Cat Image (Replace with actual Cats API endpoint)
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => {
            const catImageURL = data[0].url; // Extract image URL from API response

            const image = document.getElementById('cat-img');
            image.src = catImageURL;
            image.alt = 'A cute cat';
        })
        .catch(error => {
            console.error('Error fetching cat image:', error); // Handle potential errors
        });
};
