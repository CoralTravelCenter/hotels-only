import { BestOfferCard } from "./best-offer-card";
import { hostReactAppReady } from "../../common/js/usefuls";

(async function () {
    await hostReactAppReady();

    for (const card of document.querySelectorAll('.pop-country-card[data-destination]')) {
        new BestOfferCard(card, { threshold: 1/3 });
    }

    const pop_countries_slider = document.querySelector('.pop-countries-slider');
    pop_countries_slider.addEventListener('scroll', () => {
        const page_count = Math.round(pop_countries_slider.scrollWidth / pop_countries_slider.clientWidth);
        let scroll_ratio = pop_countries_slider.scrollLeft / pop_countries_slider.scrollWidth;
        const page_number = Math.round(page_count * scroll_ratio) ;
        console.log('=== page_number: %o', page_number);
    });

})();