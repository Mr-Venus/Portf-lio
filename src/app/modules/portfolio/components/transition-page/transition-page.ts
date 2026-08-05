import { Component, OnInit } from '@angular/core';
import gsap from "gsap";
import { ScrollGsap } from '../../../../services/scroll-gsap';
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

@Component({
  selector: 'app-transition-page',
  templateUrl: './transition-page.html',
  styleUrl: './transition-page.css'
})
export class TransitionPage implements OnInit {

    constructor(private scroll: ScrollGsap) {}

    ngOnInit(): void {


        gsap.registerPlugin(DrawSVGPlugin);

        gsap.set(".transition path",{

            drawSVG:"0%",
            strokeWidth:2

        });

        this.scroll.timelineTransition = gsap.timeline({

            paused:true

        });

        this.scroll.timelineTransition
        
        .call(() => {
          document.documentElement.style.overflow = "hidden";
        })

        .to('.transition', {
            pointerEvents: 'auto',
        })
        .to(".transition path",{

            drawSVG: "100%",
            duration: 1.5,
            ease: "power4.inOut"

        })

        .to(".transition path",{

            strokeWidth: 2000,
            duration: 1.5,
            ease: "power4.inOut"

        })

        .to(".transition path",{

            strokeWidth:0,
            duration:1.5,
            ease:"power4.inOut"

        })
        .call(() => {

          document.documentElement.style.overflow = "";

        })
        .to('.transition', {
            pointerEvents: 'none',
        });
        

    }

}