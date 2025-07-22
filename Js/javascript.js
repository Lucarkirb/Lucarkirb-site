





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

// Sidebar toggle functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const floatingToggle = document.querySelector('.floating-toggle');
    
    if (sidebar.classList.contains('collapsed')) {
        // Expand sidebar
        sidebar.classList.remove('collapsed');
        floatingToggle.style.display = 'none';
    } else {
        // Collapse sidebar
        sidebar.classList.add('collapsed');
        floatingToggle.style.display = 'block';
    }
}

// Auto-collapse sidebar on mobile when page loads, keep expanded on desktop
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for custom elements to load
    setTimeout(function() {
        const sidebar = document.getElementById('sidebar');
        const floatingToggle = document.querySelector('.floating-toggle');
        
        if (sidebar && floatingToggle) {
            // Check if we're on mobile (screen width <= 768px)
            if (window.innerWidth <= 768) {
                // Mobile: Start collapsed
                sidebar.classList.add('collapsed');
                floatingToggle.style.display = 'block';
            } else {
                // Desktop: Start expanded
                sidebar.classList.remove('collapsed');
                floatingToggle.style.display = 'none';
            }
        }
    }, 100);
    
    // Also handle window resize events
    window.addEventListener('resize', function() {
        const sidebar = document.getElementById('sidebar');
        const floatingToggle = document.querySelector('.floating-toggle');
        
        if (sidebar && floatingToggle) {
            if (window.innerWidth > 768) {
                // Switched to desktop: ensure expanded
                sidebar.classList.remove('collapsed');
                floatingToggle.style.display = 'none';
            }
            // Note: We don't auto-collapse when switching to mobile 
            // in case user manually expanded it
        }
    });
});


