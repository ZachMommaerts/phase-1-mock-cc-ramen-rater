const ramenImages = document.querySelector('#ramen-menu');
const bigRamenImage = document.querySelector('.detail-image');
const ramenName = document.querySelector('.name');
const restaurantName = document.querySelector('.restaurant');
const ramenRating = document.querySelector('#rating-display');
const ramenComments = document.querySelector('#comment-display');
const ramenForm = document.querySelector('#new-ramen');
const newRamenComment = document.querySelector('#new-comment');
const bigRamenInfo = document.querySelector('#ramen-detail');

fetch('http://localhost:3000/ramens/1')
.then(resp => resp.json())
.then(ramen => displayRamenInfo(ramen))
.catch(error => errorMessage(error));

fetch('http://localhost:3000/ramens')
.then(resp => resp.json())
.then(ramens => ramens.forEach(displayRamen))
.catch(error => errorMessage(error));

function errorMessage(error) {
    alert(error);
};

function displayRamen (ramen) {
    const ramenImage = document.createElement('img');
    ramenImage.src = ramen.image;
    ramenImage.id = ramen.id;
    ramenImage.className = 'ramenImage';
    ramenImages.appendChild(ramenImage);
}

ramenImages.addEventListener('click', e => showRamenInfo(e))

function showRamenInfo(e) {
    if(e.target && e.target.className === 'ramenImage') {
        fetch(`http://localhost:3000/ramens/${e.target.id}`)
        .then(resp => resp.json())
        .then(ramen => displayRamenInfo(ramen))
        .catch(error => errorMessage(error))
    }
}

function displayRamenInfo (ramen) {
    bigRamenImage.src = ramen.image;
    ramenName.textContent = ramen.name;
    restaurantName.textContent = ramen.restaurant;
    ramenRating.textContent = ramen.rating;
    ramenComments.innerText = ramen.comment;
}

ramenForm.addEventListener('submit', e => addRamen(e))

function addRamen (e) {
    e.preventDefault();
    debugger;
    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            'name': e.target.name.value,
            'restaurant': e.target.restaurant.value,
            'image': e.target.image.value,
            'rating': e.target.rating.value,
            'comment': newRamenComment.value
        })
    })
    .then(resp => resp.json())
    .then(ramen => displayRamen(ramen))
    .catch(error => errorMessage(error))

    ramenForm.reset();
}

bigRamenInfo.addEventListener('click', e => deleteRamen(e))

function deleteRamen (e) {
    e.target.parentElement.remove();
}

// {
//     "id": 1,
//     "name": "Shoyu Ramen",
//     "restaurant": "Nonono",
//     "image": "./assets/ramen/shoyu.jpg",
//     "rating": 7,
//     "comment": "Delish. Can't go wrong with a classic!"
//   },