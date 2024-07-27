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
    for (const card of document.querySelectorAll('.resorts.turkey .resort-card[data-destination]')) {
        new BestOfferCard(card, { threshold: 1/3 });
    }
    for (const card of document.querySelectorAll('.resorts.uae .resort-card[data-destination]')) {
        new BestOfferCard(card, { threshold: 1/3 });
    }
    for (const card of document.querySelectorAll('.resorts.russia .resort-card[data-destination]')) {
        new BestOfferCard(card, { threshold: 1/3 });
    }

    new ScrollPager(document.querySelector('.pop-countries-slider'), document.querySelector('.pop-countries-combo .scroll-pager'));
    new ScrollPager(
        document.querySelector('.other-countries-slider'),
        document.querySelector('.other-countries-combo .scroll-pager'),
        document.querySelector('.other-countries-combo .scroll-shifter')
        );
    new ScrollPager(
        document.querySelector('.resorts.turkey .resorts-slider'),
        document.querySelector('.resorts.turkey .scroll-pager'),
        document.querySelector('.resorts.turkey .scroll-shifter')
        );
    new ScrollPager(
        document.querySelector('.resorts.uae .resorts-slider'),
        document.querySelector('.resorts.uae .scroll-pager'),
        document.querySelector('.resorts.uae .scroll-shifter')
        );
    new ScrollPager(
        document.querySelector('.resorts.russia .resorts-slider'),
        document.querySelector('.resorts.russia .scroll-pager'),
        document.querySelector('.resorts.russia .scroll-shifter')
        );

})();