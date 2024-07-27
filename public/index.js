const imgUrl = fetch('https://api.thecatapi.com/v1/images/search')
    .then(res => {return res.url})

    const img = document.getElementById('cat-img');
    img.src = imgUrl;
