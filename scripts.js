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
});