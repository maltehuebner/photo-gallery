import './styles/app.css';

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');

    if (!lightbox || items.length === 0) return;

    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const totalPhotos = items.length;
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightbox() {
        const item = items[currentIndex];
        const src = item.dataset.src;
        lightboxImage.src = src;
        lightboxCounter.textContent = `${currentIndex + 1} / ${totalPhotos}`;
        document.getElementById('downloadBtn').href = src;
    }

    function nextPhoto() {
        currentIndex = (currentIndex + 1) % totalPhotos;
        updateLightbox();
    }

    function prevPhoto() {
        currentIndex = (currentIndex - 1 + totalPhotos) % totalPhotos;
        updateLightbox();
    }

    items.forEach((item) => {
        item.addEventListener('click', () => {
            openLightbox(parseInt(item.dataset.index, 10));
        });
    });

    document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
    document.getElementById('nextBtn').addEventListener('click', nextPhoto);
    document.getElementById('prevBtn').addEventListener('click', prevPhoto);

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'ArrowLeft') prevPhoto();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-image-container')) {
            closeLightbox();
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? prevPhoto() : nextPhoto();
        }
    }, { passive: true });
});
