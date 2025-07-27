document.addEventListener('DOMContentLoaded', () => {
    const navBurgerButton = document.querySelector('.nav-burger-button');
    const navBurgerMenu = document.querySelector('.nav-burger-menu');
    const navLinks = document.querySelectorAll('.navigation-list.nav-header a');

    if (navBurgerButton && navBurgerMenu) {
        function toggleMenu() {
            navBurgerButton.classList.toggle('open');
            navBurgerMenu.classList.toggle('open');
            document.body.classList.toggle('menu-open'); 
        }

        navBurgerButton.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu();
        });

        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                if (navBurgerMenu.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (navBurgerMenu.classList.contains('open') &&
                !navBurgerMenu.contains(event.target) &&
                !navBurgerButton.contains(event.target)) {
                toggleMenu();
            }
        });
    }
});
