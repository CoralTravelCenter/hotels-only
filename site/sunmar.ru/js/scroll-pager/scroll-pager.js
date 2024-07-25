import css from 'bundle-text:./scroll-pager.less';
import { watchIntersection } from "../../../common/js/usefuls";

export class ScrollPager {

    static usedOnce = false;
    scrollerEl;
    pagerEl;

    constructor(scroller, pager, shifters) {
        this.scrollerEl = scroller;
        this.pagerEl = pager;
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
        watchIntersection(this.scrollerEl.children, { root: this.scrollerEl, threshold: .66 }, (el) => {
            this.pagerEl.children[[...this.scrollerEl.children].indexOf(el)].classList.add('current');
        }, (el) => {
            this.pagerEl.children[[...this.scrollerEl.children].indexOf(el)].classList.remove('current');
        });
        return this;
    }

}