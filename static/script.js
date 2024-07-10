const pageSize = 3; 
let currentPage = 0;
let data = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchCarouselData();
});

document.getElementById('next-btn').addEventListener('click', nextPage);
document.getElementById('prev-btn').addEventListener('click', prevPage);

function fetchCarouselData() {
    fetch(`/api/carousel-data?pageSize=${pageSize}`)
        .then(response => response.json())
        .then(fetchedData => {
            data = fetchedData;
            updateCarousel();
            createDots();
        })
        .catch(error => console.error('Error fetching data:', error));
}

function nextPage() {
    currentPage = (currentPage + 1) % Math.ceil(data.length / pageSize);
    updateCarousel();
    updateDots();
}

function prevPage() {
    currentPage = (currentPage - 1 + Math.ceil(data.length / pageSize)) % Math.ceil(data.length / pageSize);
    updateCarousel();
    updateDots();
}

function updateCarousel() {
    const startIdx = currentPage * pageSize;
    const endIdx = startIdx + pageSize;
    const visibleItems = data.slice(startIdx, endIdx);

    const carouselItems = document.getElementById('carousel-items');
    carouselItems.innerHTML = visibleItems.map(item => `
        <div class="carousel-item">
            <img src="${item.image}" alt="${item.name}">
        </div>`).join('');
}

function createDots() {
    const dotsContainer = document.getElementById('dots');
    dotsContainer.innerHTML = '';

    for (let i = 0; i < Math.ceil(data.length / pageSize); i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            currentPage = i;
            updateCarousel();
            updateDots();
        });
        dotsContainer.appendChild(dot);
    }

    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPage);
    });
}
