document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. SOCIAL COPY BUTTONS
    // ==========================================================================
    const copyButtons = document.querySelectorAll('.btn-copy');

    copyButtons.forEach(button => {
        const labelSpan = button.querySelector('.btn-label');
        const defaultLabel = button.getAttribute('data-label');
        const hoverValue = button.getAttribute('data-default-value');
        const copyValue = button.getAttribute('data-copy-value');

        // Hover: Switch platform name to handle/email
        button.addEventListener('mouseenter', () => {
            if (labelSpan.innerText !== 'Copied!') {
                labelSpan.innerText = hoverValue;
            }
        });

        // Mouse leave: Restore platform name
        button.addEventListener('mouseleave', () => {
            if (labelSpan.innerText !== 'Copied!') {
                labelSpan.innerText = defaultLabel;
            }
        });

        // Click: Copy value to clipboard
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(copyValue).then(() => {
                labelSpan.innerText = 'Copied!';
                button.classList.add('copied');
                setTimeout(() => {
                    labelSpan.innerText = button.matches(':hover') ? hoverValue : defaultLabel;
                }, 1800);
            });
        });
    });

    // ==========================================================================
    // 2. CONTACT COPY BUTTON
    // ==========================================================================
    const contactCopyBtn = document.querySelector('.btn-contact-copy');

    if (contactCopyBtn) {
        const labelSpan = contactCopyBtn.querySelector('.btn-label');
        const defaultText = labelSpan.innerText;
        const emailToCopy = contactCopyBtn.getAttribute('data-copy-value');

        contactCopyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailToCopy).then(() => {
                labelSpan.innerText = 'Email Copied!';
                contactCopyBtn.classList.add('copied');

                setTimeout(() => {
                    labelSpan.innerText = defaultText;
                    contactCopyBtn.classList.remove('copied');
                }, 2000);
            });
        });
    }

    // ==========================================================================
    // 3. 3D INFINITE LOOP CAROUSEL & ARROW NAVIGATION
    // ==========================================================================
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (cards.length > 0) {
        let currentIndex = 0;

        function updateCarousel() {
            // Remove states from all cards
            cards.forEach(card => {
                card.classList.remove('active', 'prev', 'next');
            });

            // Calculate the infinite loop indices
            const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
            const nextIndex = (currentIndex + 1) % cards.length;

            // Apply new states
            cards[currentIndex].classList.add('active');
            
            if (cards.length >= 2) {
                cards[prevIndex].classList.add('prev');
                cards[nextIndex].classList.add('next');
            }
        }

        // Arrow Button Functionality
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % cards.length;
                updateCarousel();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                updateCarousel();
            });
        }

        // Optional: Allow clicking the side cards to bring them to the center
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                if (card.classList.contains('prev') || card.classList.contains('next')) {
                    currentIndex = index;
                    updateCarousel();
                }
            });
        });

        // Initialize the first view
        updateCarousel();
    }
    // ==========================================================================
    // 4. MOBILE MENU TOGGLE
    // ==========================================================================
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('primary-navigation');

    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuIcon.querySelector('i');
            
            // Swap between hamburger and close icon
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuIcon.querySelector('i').classList.remove('fa-xmark');
                menuIcon.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // ==========================================================================
    // 5. ADD TOUCH SWIPE TO CAROUSEL
    // ==========================================================================
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    
    if (carouselWrapper && cards.length > 0) {
        let startX = 0;
        let endX = 0;

        carouselWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        carouselWrapper.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        }, { passive: true });

        carouselWrapper.addEventListener('touchend', () => {
            const threshold = 50; // Minimum pixel distance for a swipe
            
            if (startX - endX > threshold) {
                // Swiped Left -> Go to Next Card
                currentIndex = (currentIndex + 1) % cards.length;
                updateCarousel();
            } else if (endX - startX > threshold) {
                // Swiped Right -> Go to Previous Card
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                updateCarousel();
            }
        });
    }
});

