import { Injectable } from '@angular/core';

import gsap from "gsap";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const plugins = [ScrollTrigger, ScrollToPlugin];
gsap.registerPlugin(...plugins);

@Injectable({
    providedIn: 'root'
})
export class ScrollGsap {

    constructor() {
        if (typeof window !== 'undefined') {
            plugins.forEach(plugin => gsap.registerPlugin(plugin));
        }
    }

    // Declaração das timelines
    public timelinePrincipal: any;
    public timelineTransition: any;
    public timelineMobile: any;
    public isMobile = false;

    // Transition Timeline start
    public play(){

        this.timelineTransition.restart();

    }

    // Direciona o scroll
    public vaPara(label: string): void {

        const st = this.timelinePrincipal.scrollTrigger;

        if (!st) return;

        const destino = st.labelToScroll(label);

        gsap.to(window, {

            scrollTo: destino,

            duration: 1.4,

            ease: "power4.inOut"

        });

    }

}