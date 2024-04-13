document.addEventListener("DOMContentLoaded", function() {
    var navbar = document.querySelector('.navbar-custom');
    var scrolled = false;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 0 && !scrolled) {
            navbar.classList.add('blur');
            navbar.classList.remove('clear');
            scrolled = true;
        } else if (window.scrollY === 0 && scrolled) {
            navbar.classList.remove('blur');
            navbar.classList.add('clear');
            scrolled = false;
        }
    });
});