import { Component, OnInit } from '@angular/core';
import { ScrollGsap } from '../../../../services/scroll-gsap';



@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit {
  constructor (private scroll: ScrollGsap) {}

  // TIMELINES

  private lineDesktop(): void {
    
    const tl = this.scroll.timelinePrincipal;
    
    tl

    .to('.sociais-header', {
      pointerEvents: 'none',
      opacity: 0,
      y: -3, 
      duration: 2
    })

     .to('.footer-section', {
        pointerEvents: 'auto',
        opacity: 1,
        y: 0,
        duration: 4
      })

      .to(".contact", {
          y: 0,
          delay: 2,
          duration: 4
      })

      .from(".me", {
          opacity: 0,
          delay: .6,
          duration: .8,
      }, "-=.7")

      .from(".image-container", {
          y: 40,
          x: 80,
          opacity: 0,
          delay: 1,
          duration: 1.3
      }, "-=.6")

      .from(".description", {
          x: 20,
          opacity: 0,
          delay: .5,
          duration: .6
      }, "-=.2")

      .from(".sociais", {
          x: -20,
          opacity: 0,
          delay: .5,
          stagger: .08,
          duration: .4
      }, "-=.3");
      
    tl.addLabel("footer")
  }

  private lineMobile(): void {
    const tl = this.scroll.timelinePrincipal;

    tl

     .to('.footer-section', {
        pointerEvents: 'auto',
        opacity: 1,
        y: 0,
        duration: 4,
        delay: 6
      })

      .to(".contact", {
          x: 0,
          delay: 2,
          duration: 4,
      })

      .from(".me", {
          opacity: 0,
          delay: .6,
          duration: .8,
      }, "-=.7")

      .from(".image-container", {
          y: 40,
          x: 80,
          opacity: 0,
          delay: 1,
          duration: 1.3
      }, "-=.6")

      .from(".description", {
          x: 20,
          opacity: 0,
          delay: .5,
          duration: .6
      }, "-=.2")

      .from(".sociais", {
          x: -20,
          opacity: 0,
          delay: .5,
          stagger: .08,
          duration: .4
      }, "-=.3");
      
    tl.addLabel("footer")
  }

  ngOnInit(): void {

    const tl = this.scroll.timelinePrincipal;
    const words = gsap.utils.toArray(".text-image span");

    gsap.to(words, {

        opacity: () => gsap.utils.random(.87,.90),

        duration: .8,

        stagger: .03,

        repeat: -1,

        repeatRefresh: true,

        yoyo: true

    });

    tl.to('.projects-section', {
      pointerEvents: 'none',
      opacity: 0,
      y: -200, 
      duration: 6
    })

    if(this.scroll.isMobile) {
      this.lineMobile();
    } else {
      this.lineDesktop();
    }
  }
}
