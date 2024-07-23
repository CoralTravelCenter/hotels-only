import { watchIntersection } from "../../common/js/usefuls";
import { fetchArrivalLocation, fetchBestOffer } from "./api-adapter";
import dayjs from "dayjs";
import './prototypes';

export class BestOfferCard {

    el;
    destination;
    destinationType = 0;
    lookupShiftDays = 14;
    lookupDepthDays = 30;
    lookupNights = [7];

    offerPricePlaceholderEl;

    constructor(host_el, options = {}) {
        this.el = host_el;
        this.offerPricePlaceholderEl = this.el.querySelector('.offer-price-placeholder');
        this.init();
    }

    init() {
        if (this.el.dataset.destination) {
            this.destination = this.el.dataset.destination;
            // this.destinationType = this.el.dataset.destinationType;
            Object.assign(this, this.el.dataset);
            watchIntersection(this.el, {}, (el, observer) => {
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
        console.log('=== arrival_location: %o', arrival_location);

        var query = {
            arrivalLocations: [arrival_location],
            beginDates: [
                dayjs().add(Number(this.lookupShiftDays), 'days').format('YYYY-MM-DD'),
                dayjs().add(Number(this.lookupShiftDays) + Number(this.lookupDepthDays), 'days').format('YYYY-MM-DD'),
            ],
            nights: this.lookupNights.split(/\s*,\s*/).map(n => ({ value: Number(n) })).sort((a, b) => a - b),
            reservationType: 2,
            additionalFilters: [],
            roomCriterias: [{ passengers: [{ age: 20, passengerType: 0 }, { age: 20, passengerType: 0 }] }],
            imageSizes: [0],
            paging: { pageNumber: 1, pageSize: 1, sortType: 0 },
        };
        const best_offer = await fetchBestOffer(query);
        console.log('=== best_offer: %o', best_offer);

        this.offerPricePlaceholderEl.textContent = best_offer?.price?.amount?.formatCurrency();

    }

}