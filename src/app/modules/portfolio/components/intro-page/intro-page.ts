import { Component, OnInit } from '@angular/core';
import { Home } from '../../pages/home/home';
import { Header } from '../header/header';

@Component({
  selector: 'app-intro-page',
  imports: [],
  templateUrl: './intro-page.html',
  styleUrl: './intro-page.css',
})
export class IntroPage implements OnInit{
  constructor() {}

  ngOnInit(): void {
    const contadores = document.querySelectorAll(".contador")
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: {
        ease: 'hop',
      }
    })

    .call(() => {
      document.documentElement.style.overflow = "hidden";
    })

    contadores.forEach((count) => {

      tl.to(count, {
          opacity: 1,
          duration: .25
      })

      .from(count.querySelectorAll(".numeros h1"), {
          y: "120%",
          stagger: .08,
          duration: .5
      }, "<")

      .to(count.querySelectorAll(".numeros h1"), {
          y: "-120%",
          opacity: 0,
          duration: .5
      }, "+=0.4")

      .to(count, {
          opacity: 0,
          duration: .2
      }, "<");

    });

    tl.to('.loading', {
      opacity: 0,
      duration: 0.3
    })

    .to('.bloco', {
      backgroundColor: "rgba(0,0,0,0)",
      duration: 1,
      stagger: 0.1,
    })

    .to('.titulo', {
      opacity: .85,
      stagger: 0.1,
      duration: 1.4
    })

    .from('.perfil-image-div', {
      y: -300,
      scale: .5,
      opacity: 1,
      stagger: 0.11,
      duration: 1.6,
      ease: "power4.in",
      onStart: () => gsap.to('.titulo', {opacity: 0, duration: 0.7, delay: 0.3}),

    })

    .to('.intro',{
      opacity: 0,
      y: 200,
      pointerEvents: 'none'
      
    })
    
    .call(() => {
      document.documentElement.style.overflow = "";
    })

    .from('.home-title, .home-subtitle, .home-cta-group' ,{
      opacity: 0,
      duration: .5,
      stagger: 0.12,
      ease: "power4.in"
    })

    .from('.nav', {
      y: -100,
      stagger: 0.12,
    })

  }
}
