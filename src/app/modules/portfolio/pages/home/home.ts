
import { Component, OnInit } from '@angular/core';
import { ScrollGsap } from '../../../../services/scroll-gsap';
import { delay } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
})


export class Home implements OnInit {
  constructor(private scroll: ScrollGsap) {}

  private lineDesktop():void {
    const tl = this.scroll.timelinePrincipal;
    
    tl.addLabel("home", 0)

    /*
    SAÍDA DO HOME
    */

    .to('.home-title, .home-subtitle', {

      y: -150,
      opacity: 0,
      pointerEvents: 'none',
      duration: 4,

    }, 0)

    .to('.perfil-image-div', {

      scale: .9,
      duration: 4,
      ease: "power4.inOut"

    }, 0)

    /*
    LANES
    */

    .to('.lane-content', {

      y: -250,
      opacity: '80%',
      duration: 18,
      ease: "power4.inOut"

    }, .2)

    /*
    MOVIMENTO DOS TEXTOS
    */

    .to('.first p', {

      x: 650,
      duration: 14,
      ease: "power2.inOut"

    }, .2)

    .to('.second p', {

      x: -650,
      duration: 14,
      ease: "power2.inOut"

    }, .2)

    .to('.lane-content', {
      y: -700,
      opacity: 0,
      duration: 10,
      ease: "power4.inOut"

    })

    /*
    TRANSIÇÃO PARA ABOUT
    */

    .to('.perfil-image-div', {

      left: '80%',
      top: '30%',
      width: '360px',
      height: '360px',

      duration: 10,
      ease: "power4.inOut"

    })

    .to('.app-div', {

      backgroundColor: '#f4f4f6',
      duration: 7,
      ease: "power4.inOut"

    }, "<")

    /*
    TROCA DAS IMAGENS
    */

    .to('.img-home', {

      opacity: 0,
      duration: 2

    }, "<")

    .to('.img-about', {

      opacity: 1,
      delay: 0.5,
      duration: 2

    }, "<")

  }

  private lineMobile(): void {
    // MOBILE TIMELINE
      const mobileTl = this.scroll.timelinePrincipal;

      mobileTl.addLabel("home", 0)

      /*
      SAÍDA DO HOME
      */

      .to('.home-title, .home-subtitle', {

        y: -150,
        opacity: 0,
        pointerEvents: 'none',
        duration: 4,

      }, 0)

      mobileTl

      .to('.perfil-image-div', {

        scale: .89,
        y: -30,
        duration: 4,
        ease: "power4.inOut"

      }, 0)

      /*
      LANES
      */

      .to('.lane-content', {

        y: -250,
        opacity: '80%',
        duration: 18,
        ease: "power4.inOut"

      }, .2)

      /*
      MOVIMENTO DOS TEXTOS
      */

      .to('.first p', {

        x: 650,
        duration: 14,
        ease: "power2.inOut"

      }, .2)

      .to('.second p', {

        x: -650,
        duration: 14,
        ease: "power2.inOut"

      }, .2)

      .to('.lane-content', {
        y: -700,
        opacity: 0,
        duration: 10,
        ease: "power4.inOut"

      })

      .to('.perfil-image-div', {
        y:-250,
        scale:.47,
        duration:10,
        ease:"power4.inOut"

      })

      .to('.app-div', {

        backgroundColor: '#f4f4f6',
        duration: 7,
        ease: "power4.inOut"

      }, "<")

       /*
      TROCA DAS IMAGENS
      */

      .to('.img-home', {

        opacity: 0,
        duration: 2

      }, "<")

      .to('.img-about', {

        opacity: 1,
        delay: 0.5,
        duration: 2

      }, "<")


      
  }

  ngOnInit(): void {

    if(this.scroll.isMobile){
      this.lineMobile();
    } else {
      this.lineDesktop();
    }

    
  }
  
}