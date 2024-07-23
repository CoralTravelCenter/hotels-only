import { watchIntersection } from "../../common/js/usefuls";

export class BestOfferCard {

    el;
    destination;
    destinationType;

    constructor(host_el, options = {}) {
        this.el = host_el;
        this.init();
    }

    init() {
        if (this.el.dataset.destination) {
            this.destination = this.el.dataset.destination;
            this.destinationType = this.el.dataset.destinationType;
            watchIntersection(this.el, {}, (el, observer) => {
                observer.unobserve(el);
                this.becameVisible();
            });
        }
        return this;
    }

    becameVisible(observer) {
        alert(this.el.dataset.destination + ' visible');
    }

}