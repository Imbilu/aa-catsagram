window.onload = () => {
    fetchImage();
    vote();
    newImage();
    addComment();
};

function fetchImage() {
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
}

function vote() {
    const upvote = document.getElementById('upvote');
    const downvote = document.getElementById('downvote');
    const score  = document.getElementById('score');

    upvote.addEventListener('click', event => {
        score.innerHTML = Number(score.innerHTML) + 1;
    })

    downvote.addEventListener('click', event => {
        score.innerHTML = Number(score.innerHTML) - 1;
    })
}

function newImage() {
    const newImageBtn = document.getElementById('new-img');

    newImageBtn.addEventListener('click', event => {
        const score  = document.getElementById('score');
        document.getElementById('comment').value = '';
        document.getElementById('comments-box').innerHTML = '';
        score.innerHTML = 0;

        fetchImage();
    })
}

function addComment() {
    const submit = document.getElementById('submit-comment');
    submit.addEventListener('click', event => {
        const comment = document.getElementById('comment').value;
        const commentBox = document.getElementById('comments-box');
        const newComment = document.createElement('p');
        newComment.innerHTML = comment;
        newComment.classList.add('comment-text');
        commentBox.appendChild(newComment);
        document.getElementById('comment').value = '';
    })
}
