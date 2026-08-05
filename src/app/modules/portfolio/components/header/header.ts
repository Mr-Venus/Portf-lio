import { Component, OnInit, Input, Output, EventEmitter, output, signal } from '@angular/core';
import { ScrollGsap } from '../../../../services/scroll-gsap';
import { Section } from '../../interfaces/section';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  constructor (private scroll: ScrollGsap) {}

  @Input({ required: true })
  sections!: Section[];

  @Output()
  nav = new EventEmitter<Section>();

  public onNav(section: Section): void {
    this.nav.emit(section)
    setTimeout(() => {
      this.scroll.timelineMobile.reverse();
      this.menuOpen = false;
    }, 2600);
  }

public menuOpen = false;

public mobileMenu(): void{

    if(window.innerWidth > 768){

        return;

    }

    this.menuOpen = !this.menuOpen;

    if(this.menuOpen){
        this.scroll.timelineMobile.play();

    }else{
        this.scroll.timelineMobile.reverse();

    }

}

ngOnInit(): void {

    this.scroll.timelineMobile = gsap.timeline({

        paused:true

    });

    this.scroll.timelineMobile

    .to(".nav", {
        height:"100vh",
        backgroundColor: "#1b1b1b",
        duration:.8,
        pointerEvents: 'auto',
        ease:"power4.inOut"

    })

    .to('.logo-content', {
      pointerEvents: 'auto',

    })

    .to(".nav-links", {
        opacity: 1,
        y: 0,
        pointerEvents: 'auto',
        duration: 1,
        ease:"power4.inOut"

    }, 0)

    .to(".sociais-header img", {
        opacity: 1,
        y: 0,
        duration: .6,
        ease:"power4.inOut"

    }, 0);

}

}
