import { hostReactAppReady } from "../../common/js/usefuls";

(async function () {
    await hostReactAppReady();
    for (const hero of document.querySelectorAll('section.held')) {
        const row_container = hero.closest('.row-container');
        if (row_container) {
            // row_container.style.overflow = 'visible';
            row_container.classList.add('visible-overflow-desktop');
        }
    }
})();
