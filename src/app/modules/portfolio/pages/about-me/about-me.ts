import { Component, OnInit } from '@angular/core';
import { ScrollGsap } from '../../../../services/scroll-gsap';
import VanillaTilt from 'vanilla-tilt';
import gsap from 'gsap';
import { delay } from 'rxjs';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.html',
  styleUrl: './about-me.css',
})
export class AboutMe implements OnInit {
  
  constructor(private scroll: ScrollGsap) {}

  private lineDesktop(): void {
    const tl = this.scroll.timelinePrincipal;
    const luz = document.querySelector('.light') as HTMLElement;
    const card = document.querySelector('.about-text-container') as HTMLElement;

    //  Animação do card com vanillaTilt
    if (card) {
      if ((card as any).vanillaTilt) {
        (card as any).vanillaTilt.destroy();
      }

      VanillaTilt.init(card, {
        max: 7,
        speed: 200,
        perspective: 800,
      });
    }

    // Detecção do mouse
    window.addEventListener("mousemove", (e) => {
      const cardPosition = card.getBoundingClientRect();

      const mouseX = e.clientX - cardPosition.left;
      const mouseY = e.clientY - cardPosition.top;

      luz.style.transform = `translate(${mouseX - 65}px, ${mouseY - 65}px)`;
    });


    tl
    
    .to('.about-text-container', {
      y: 0,
      left: '0px',            
      opacity: 1,  
      pointerEvents: 'auto',
      stagger: 0.15,       
      duration: 4,
      delay: 0.8
    }) 

    .to('.technologys', {
      opacity: 1,
      bottom: '0px',
      pointerEvents: 'auto',
      duration: 4,
      delay: 0.3
    })
    tl.addLabel("about")

    .to({}, { duration: 7 }); 

  }

  private lineMobile(): void {
    const mobileTl = this.scroll.timelinePrincipal;

    // MOBILE TIMELINE
    mobileTl 
    
    .to('.about-text-container', {
      y: 0,
      left: '0px',            
      opacity: 1,  
      scale: .9,
      pointerEvents: 'auto',
      stagger: 0.15,       
      duration: 4,
      delay: 0.8
    }) 

    .to('.technologys', {
      opacity: 1,
      bottom: '0px',
      scale: .8,
      pointerEvents: 'auto',
      duration: 4,
      delay: 0.3
    })
    mobileTl.addLabel("about")

    .to({}, { duration: 7 }); 
  }

  ngOnInit(): void {

    // Verificação do tipo de timeline
    if(this.scroll.isMobile) {
      this.lineMobile();
    } else {
      this.lineDesktop();
    }

  }
  
}