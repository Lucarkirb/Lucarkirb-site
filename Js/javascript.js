





document.addEventListener('DOMContentLoaded', () => {
    const trailContainer = document.getElementById('cursor-trail');
    const trailElements = [];
    const trailLength = 10;

    for (let i = 0; i < trailLength; i++) {
        const trailElement = document.createElement('div');
        trailElement.classList.add('trail');
        trailContainer.appendChild(trailElement);
        trailElements.push(trailElement);
    }

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        for (let i = trailLength - 1; i > 0; i--) {
            trailElements[i].style.left = trailElements[i - 1].style.left;
            trailElements[i].style.top = trailElements[i - 1].style.top;
            trailElements[i].style.opacity = (i / trailLength).toString();
        }
        trailElements[0].style.left = `${mouseX}px`;
        trailElements[0].style.top = `${mouseY}px`;
        trailElements[0].style.opacity = '1';

        requestAnimationFrame(animateTrail);
    }

    animateTrail();
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

function goToPage(page) {
    window.location.href = page;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });// For Chrome, Firefox, IE, and Opera
}


