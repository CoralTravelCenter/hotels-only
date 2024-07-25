import { BestOfferCard } from "./best-offer-card";
import { hostReactAppReady } from "../../common/js/usefuls";
import { ScrollPager } from "./scroll-pager/scroll-pager";

(async function () {
    await hostReactAppReady();

    for (const card of document.querySelectorAll('.pop-country-card[data-destination]')) {
        new BestOfferCard(card, { threshold: 1/3 });
    }
    for (const card of document.querySelectorAll('.other-country-card[data-destination]')) {
        new BestOfferCard(card, { threshold: 1/3 });
    }

    new ScrollPager(document.querySelector('.pop-countries-slider'), document.querySelector('.pop-countries-combo .scroll-pager'));

})();