
import { ScrollGsap } from '../../../../services/scroll-gsap';
import { Component, OnInit } from '@angular/core';
import { AboutMe } from '../about-me/about-me';
import { Header } from '../../components/header/header';
import { Home } from '../home/home';
import { Projects } from '../projects/projects';
import { Footer } from '../../components/footer/footer';
import { IntroPage } from '../../components/intro-page/intro-page';
import { Section } from '../../interfaces/section';
import { TransitionPage } from '../../components/transition-page/transition-page';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

const plugins = [ScrollTrigger, ScrollToPlugin];
gsap.registerPlugin(...plugins);
@Component({
  selector: 'app-app',
  imports: [AboutMe, Header, Home, Projects, Footer, IntroPage, TransitionPage],
  templateUrl: './apppage.html',
  styleUrl: './appPage.css',
})
export class AppPage implements OnInit {

  constructor(private scroll: ScrollGsap) {
    gsap.registerPlugin(...plugins);
  }

  // Atribuição das sections 
  public sections: Section[] = [
    {
      id:'home',
      titulo:'./home',
      label:'home'
    },

    {
      id:'about',
      titulo:'./about',
      label:'about'
    },

    {
      id:'projects',
      titulo:'./projects',
      label:'projects'
    },

    {
      id:'footer',
      titulo:'./contact',
      label:'footer'
    },

  ];

  // Navegação com transição das seções
  public sectionNav(section: Section) {
    this.scroll.timelineTransition.seek(0).play();

    // Espera a animação preencher a tela para usar o scroll
    setTimeout(() => {

        this.scroll.vaPara(section.label);

    }, 2700);
  };

  ngOnInit(): void {
    gsap.registerPlugin(...plugins);
    ScrollTrigger.normalizeScroll(true);
    if(window.innerWidth <= 768) {this.scroll.isMobile = true}

    // configuração da timeline principal
    this.scroll.timelinePrincipal = gsap.timeline({
      scrollTrigger: {
        trigger: '.app-div', 
        start: 'top top',
        end: '+=400%',              
        scrub: 1,    
        pin: true,   
        anticipatePin: 1,
        invalidateOnRefresh: true,

      }
    });

  }
}