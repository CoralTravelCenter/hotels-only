import css from 'bundle-text:./scroll-pager.less';
import { watchIntersection } from "../../../common/js/usefuls";

export class ScrollPager {

    static usedOnce = false;
    scrollerEl;
    pagerEl;
    shiftBackwardEl;
    shiftForwardEl;

    constructor(scroller, pager, shifters) {
        this.scrollerEl = scroller;
        this.pagerEl = pager;
        this.shiftBackwardEl = shifters?.querySelector('button.backward');
        this.shiftForwardEl = shifters?.querySelector('button.forward');
        if (!ScrollPager.usedOnce) {
            ScrollPager.initOnce();
            ScrollPager.usedOnce = true;
        }
        this.init();
    }

    static initOnce() {
        const style_el = document.createElement('style');
        style_el.textContent = css;
        document.head.append(style_el);
    }

    init() {
        const pager_items = new Array(this.scrollerEl.children.length).fill('<li></li>');
        this.pagerEl.innerHTML = pager_items.join('');

        this.shiftBackwardEl?.addEventListener('click', () => {
            this.shiftBackward();
        });
        this.shiftForwardEl?.addEventListener('click', () => {
            this.shiftForward();
        });

        if (this.shiftBackwardEl) {
            this.scrollerEl.addEventListener('scroll', () => {
                this.syncAppearance();
            });
        }

        this.pagerEl.addEventListener('click', (e) => {
            const page_idx = [...this.pagerEl.children].indexOf(e.target);
            if (~page_idx) {
                const slide_el = this.scrollerEl.children[page_idx];
                slide_el.scrollIntoView({ behavior: 'smooth' });
            }
        });

        watchIntersection(this.scrollerEl.children, { root: this.scrollerEl, threshold: .66 }, (el) => {
            this.pagerEl.children[[...this.scrollerEl.children].indexOf(el)].classList.add('current');
        }, (el) => {
            this.pagerEl.children[[...this.scrollerEl.children].indexOf(el)].classList.remove('current');
        });

        this.syncAppearance();

        return this;
    }

    syncAppearance() {
        this.shiftBackwardEl?.classList.toggle('disabled', this.scrollerEl.scrollLeft <= 0);
        this.shiftForwardEl?.classList.toggle('disabled', this.scrollerEl.scrollLeft + this.scrollerEl.clientWidth >= this.scrollerEl.scrollWidth);
    }

    shiftBackward() {
        this.scrollerEl.scrollBy({
            top: 0,
            left: -this.scrollerEl.children[0].getBoundingClientRect().width,
            behavior: 'smooth'
        });
    }

    shiftForward() {
        this.scrollerEl.scrollBy({
            top: 0,
            left: this.scrollerEl.children[0].getBoundingClientRect().width,
            behavior: 'smooth'
        });
    }

}