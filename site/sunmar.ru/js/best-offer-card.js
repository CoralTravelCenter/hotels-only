import { watchIntersection } from "../../common/js/usefuls";
import { fetchArrivalLocation, fetchBestOffer, fetchOffersListLink } from "./api-adapter";
import dayjs from "dayjs";
import './prototypes';

export class BestOfferCard {

    el;
    destination;
    destinationType;
    lookupShiftDays = 14;
    lookupDepthDays = 30;
    lookupNights = [7];

    offerPricePlaceholderEl;

    constructor(host_el, options = {}) {
        this.opt = Object.assign({}, options);
        this.el = host_el;
        this.offerPricePlaceholderEl = this.el.querySelector('.offer-price-placeholder');
        this.offersListLinkEl = this.el.querySelector('a.offers-list-link');
        this.init();
    }

    init() {
        const dataset = this.el.dataset;
        if (dataset.destination) {
            this.destination = dataset.destination;
            if (dataset.destinationType !== undefined) this.destinationType = dataset.destinationType;
            Object.assign(this, dataset);
            watchIntersection(this.el, this.opt, (el, observer) => {
                observer.unobserve(el);
                this.becameVisible();
            });
        }
        return this;
    }

    becameVisible(observer) {
        this.fetchOffer();
    }

    showProgress() {
        this.offerPricePlaceholderEl.innerHTML = '<div class="loader"></div>';
    }

    async fetchOffer() {

        this.showProgress();

        const arrival_location = await fetchArrivalLocation(this.destination, this.destinationType);
        // console.log('=== arrival_location: %o', arrival_location);

        const paging_default = { paging: { pageNumber: 1, pageSize: 20, sortType: 0 }};
        const paging_single = { paging: { pageNumber: 1, pageSize: 1, sortType: 0 } };

        const nights = Array.isArray(this.lookupNights)
            ? this.lookupNights.sort((a, b) => a - b).map(n => ({ value: Number(n) }))
            : this.lookupNights.split(/\s*,\s*/).map(n => ({ value: Number(n) })).sort((a, b) => a - b);

        const query = {
            arrivalLocations: [arrival_location],
            beginDates: [
                dayjs().add(Number(this.lookupShiftDays), 'days').format('YYYY-MM-DD'),
                dayjs().add(Number(this.lookupShiftDays) + Number(this.lookupDepthDays), 'days').format('YYYY-MM-DD'),
            ],
            nights,
            reservationType: 2,
            additionalFilters: [],
            roomCriterias: [{ passengers: [{ age: 20, passengerType: 0 }, { age: 20, passengerType: 0 }] }],
            imageSizes: [0],
            // paging: { pageNumber: 1, pageSize: 1, sortType: 0 },
        };
        const [best_offer, offers_list_link] = await Promise.all([
            fetchBestOffer(Object.assign({}, query, paging_single)),
            fetchOffersListLink(Object.assign({}, query, paging_default))
        ]);
        // console.log('=== best_offer: %o', best_offer);
        // console.log('=== offers_list_link: %o', offers_list_link);

        this.offerPricePlaceholderEl.textContent = (best_offer?.price?.amount / best_offer.stayNights).formatCurrency();
        this.offerPricePlaceholderEl.href = `/hotels${ best_offer.link.redirectionUrl }/?qp=${ best_offer.link.queryParam }&p=2`;
        this.offersListLinkEl.href = `${ offers_list_link.redirectionUrl }/?qp=${ offers_list_link.queryParam }&p=2&w=0&s=0`;

    }

}