document.querySelectorAll('.nav-btn').forEach(btn => {
    const setOrigin = e => {
        const { left, width } = btn.getBoundingClientRect();
        btn.style.setProperty('--nav-btn-origin',
            e.clientX > left + width / 2 ? 'right center' : 'left center');
    };
    btn.addEventListener('mouseenter', setOrigin);
    btn.addEventListener('mouseleave', setOrigin);
});
