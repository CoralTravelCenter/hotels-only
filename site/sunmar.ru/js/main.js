import { BestOfferCard } from "./best-offer-card";
import { hostReactAppReady } from "../../common/js/usefuls";

(async function () {
    await hostReactAppReady();

    for (const card of document.querySelectorAll('[data-destination]')) {
        new BestOfferCard(card, { threshold: 1/3 });
    }

})();