document.addEventListener('DOMContentLoaded', () => {
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
                setTimeout(() => {
                    labelSpan.innerText = button.matches(':hover') ? hoverValue : defaultLabel;
                }, 1800);
            });
        });
    });
});