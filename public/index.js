window.onload = () => {
    loadDataFromStorage();
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

            localStorage.setItem('currentImage', catImageURL);
            localStorage.setItem('score', 0); // Reset score for new image
            localStorage.setItem('comments', JSON.stringify([])); // Reset comments  

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
        localStorage.setItem('score', score.innerHTML)
    })

    downvote.addEventListener('click', event => {
        score.innerHTML = Number(score.innerHTML) - 1;
        localStorage.setItem('score', score.innerHTML)
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

        const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
        storedComments.push(comment);
        localStorage.setItem('comments', JSON.stringify(storedComments));
    })
}

function loadDataFromStorage() {
    const storedImage = localStorage.getItem('currentImage');
    const storedScore = localStorage.getItem('score') || 0;
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
  
    if (storedImage) {
      document.getElementById('cat-img').src = storedImage;
      document.getElementById('score').innerHTML = storedScore;
      updateCommentsDisplay(storedComments);
    } else {
      // If no previous image, fetch a new one
      fetchImage();
    }
}

function updateCommentsDisplay(comments = null) {
const commentsBox = document.getElementById('comments-box');
commentsBox.innerHTML = ''; // Clear existing comments

const commentsToShow = comments || JSON.parse(localStorage.getItem('comments')) || [];

commentsToShow.forEach(comment => {
    const newComment = document.createElement('p');
    newComment.innerHTML = comment;
    newComment.classList.add('comment-text');
    commentsBox.appendChild(newComment);
});
}
