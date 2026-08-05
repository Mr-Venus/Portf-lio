import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { ScrollGsap } from '../../../../services/scroll-gsap';
import { Projeto } from '../../interfaces/projeto';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {

  // Lista de Projetos
  listaProjetos: Projeto[] = [
    {
      titulo: 'One Piece',
      descricao: 'Uma página sobre a animação One Piece para treinar conceitos de Html e Css.',
      imagem: 'projectsImages/onePiecePage.png', 
      link: 'https://github.com/Mr-Venus/One-Piece-Fan-Page-.git',
      tag: 'Web Page'
    },
    {
      titulo: 'Clínica Veterinária',
      descricao: 'Sistema de monitoramento e controle simulando interações de uma clínica veterinária. O projeto aborda Cadastro, Consulta, Pagamento, Histórico, Conflito de especialidades com espécie e Conflito de medicação com restrição.',
      imagem: 'projectsImages/veterinariaPhoto.jpg',
      link: 'https://github.com/Mr-Venus/Cl-nica-Veterin-ria.git',
      tag: 'Terminal Code'
    },
    {
      titulo: 'Cadastro de alunos',
      descricao: 'Sistema de cadastro de alunos em uma base de dados, onde o menu interativo apresenta as opções do CRUD para o usuário.',
      imagem: 'projectsImages/alunos.png',
      link: 'https://github.com/Mr-Venus/Cadastro-de-Alunos.git',
      tag: 'Terminal Code'
    }
  ];


  public projetoAtivo: Projeto = this.listaProjetos[0];
  public menuOpened = signal(false);

  // Aba dos Menus
    // Menu open 
  public menuOpen(){

    this.menuOpened.set(true);
    const tl = gsap.timeline();

    gsap.fromTo(".menu-overlay",{

        clipPath: "circle(0% at 9% 14%)"

    },
    {

        clipPath: "circle(150% at 9% 14%)",
        pointerEvents: "auto",
        duration: .8,

        ease:"power4.inOut"

    });

    tl
    
    .to(".glass",{

        scale:0,

        opacity:0,

        duration:.25

    })

    .to(".handle",{

      attr:{
          x1:25,
          y1:25,
          x2:75,
          y2:75
      },

      duration:.3

    },0)

      .to(".cross",{

      opacity:1,

      attr:{
          x1:75,
          y1:25,
          x2:25,
          y2:75
      },

      duration:.3

    },0);
      

  }
  // Fechamento do Menu
  public menuClose(){

    const tl = gsap.timeline();

    tl.to(".cross", {
      opacity: 0,
      duration: 0.15
   })

    .to(".handle", {
        attr: {
            x1: 56,
            y1: 56,
            x2: 76,
            y2: 76
        },
        duration: 0.3
    })

    .to(".glass", {
        scale: 1,
        opacity: 1,
        duration: 0.25
    }, "<");

    gsap.to(".menu-overlay",{

        clipPath:"circle(0% at 9% 14%)",
        pointerEvents: "none",
        duration:1.1,

        ease:"power4.inOut",

        onComplete:()=>{

          this.menuOpened.set(false);

        }
    });

  }

  // Acionador do menu
  public toggleMenu(){

    if(this.menuOpened()){

      this.menuClose();

    }else{

      this.menuOpen();

    }

  }

  //  Variaveis para o contador
  public projetoAtual: number = 1;
  public projetosQnt: number = this.listaProjetos.length;

  constructor(private scroll: ScrollGsap, private cdr: ChangeDetectorRef) {};


  // TIMELINES

  private lineDesktop(): void {
     const tl = this.scroll.timelinePrincipal;

    // ANIMAÇÃO INICIAL
    tl.to('.about-text-container, .cloud-about, .technologys, .perfil-image-div', {
      opacity: 0,
      y: -50, 
      pointerEvents: 'none',
      duration: 1.2
    }, '+=0.2') 

    .set('app-about-me', { pointerEvents: 'none' })

    .to ('.projects-section', {
      opacity: 1,
      pointerEvents: 'auto',
    })

    .to('.projects-wipe-bg', {
      opacity: 1,          
      y: '-50%',
      x: 0,
      delay: 0.5,
      duration: 3,
      ease: 'power1.out'
    })

    .to('.projects-wipe-bg', {
      scale: 35,            
      borderRadius: '0px', 
      duration: 10,
      ease: 'power2.inOut'
    })

    .to('.app-div', {
      backgroundColor: '#000',
      duration: 0.8
    })

    // Primeiro card
    .to('.projects-content-wrapper', {
      opacity: 1,
      y: 0,
      duration: 0.8,
    })

    .to('.content-title', {
      opacity: .2,
      y: 0,
      duration: 3
    })

    .to('.project-overlay, .btn-galery, .indicador, .menu-overlay', {
      opacity: 1,
      y: 0,
      delay: 0.5,
      duration:  2,
      scale: 1
    })
    .to('.project-showcase-card', {
      opacity: 1,
      scale: 1,
      delay: 1.2,
      duration: 1.8,
      pointerEvents: 'auto'
    }, '-=0.3')
    
    // Label para o scroll
    tl.addLabel("projects")


    tl.to({}, { duration: 4 }); 

    // Troca de projetos
    this.listaProjetos.forEach((projeto, index) => {
      //
      if (index === 0) return;
      

      // troca do card frontal
      tl.to('.project-showcase-card', {
        opacity: 0,
        scale: 0.95,
        duration: 2,
        ease: 'power1.inOut'
      })

      // Atribui o slide coerente para a direção do scroll
      .call(() => {

        this.projetoAtivo = this.listaProjetos[index];
        this.projetoAtual = index + 1;

        // Coleta da direção do scroll
        const isReversing = tl.reversed() || (tl.scrollTrigger && tl.scrollTrigger.direction === -1);
        
        if (isReversing) {
          // Se estiver subindo, volta para o slide anterior
          this.projetoAtivo = this.listaProjetos[index - 1];
          this.projetoAtual = index;
        } else {
          // Se estiver descendo, avança para o slide atual
          this.projetoAtivo = this.listaProjetos[index];
        }
        // Força o Angular a renderizar
        this.cdr.detectChanges();
      })

      // Novo card
      .to('.project-showcase-card', {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power1.inOut'
      });

      tl.to({}, { duration: 4 }); 
    });

    // Garantia para apresentar o 1 projeto se o usuario usar o scroll até o topo da pagina de projetos
    tl.call(() => {
      const isReversing = tl.reversed() || (tl.scrollTrigger && tl.scrollTrigger.direction === -1);
      if (isReversing) {
        this.projetoAtivo = this.listaProjetos[0];
        this.cdr.detectChanges();
      }
    }, null, 0.1); // Dispara bem no começo do fluxo de projetos
  }

  private lineMobile(): void {
    
    // ANIMAÇÃO INICIAL
    const tl = this.scroll.timelinePrincipal;


    tl.to('.about-text-container, .cloud-about, .technologys, .perfil-image-div', {
      opacity: 0,
      y: -50, 
      pointerEvents: 'none',
      duration: 3.5
    }, '+=0.2') 

    .set('app-about-me', { pointerEvents: 'none' })

    .to ('.projects-section', {
      opacity: 1,
      pointerEvents: 'auto',
    })

    .to('.projects-wipe-bg', {
      opacity: 1,          
      y: '-50%',
      x: 0,
      delay: 0.5,
      duration: 7,
      ease: 'power1.out'
    })

    .to('.projects-wipe-bg', {
      scale: 35,            
      borderRadius: '0px', 
      duration: 10,
      ease: 'power2.inOut'
    })

    .to('.app-div', {
      backgroundColor: '#000',
      duration: 0.8
    })

    // Primeiro card
    .to('.projects-content-wrapper', {
      opacity: 1,
      y: 0,
      duration: 0.8,
    })

    .to('.content-title', {
      opacity: 0,
      y: -50,
      duration: 18
    })

    .to('.project-overlay, .btn-galery, .indicador, .menu-overlay', {
      opacity: 1,
      y: 0,
      delay: 0.5,
      duration:  2,
      scale: 1
    })
    .to('.project-showcase-card', {
      opacity: 1,
      scale: 1,
      delay: 1.2,
      duration: 1.8,
      pointerEvents: 'auto'
    }, '-=0.3')
    
    tl.addLabel("projects")


    tl.to({}, { duration: 4 }); 

    // Troca de projetos
    this.listaProjetos.forEach((projeto, index) => {
      if (index === 0) return; 
      

      tl.to('.project-showcase-card', {
        opacity: 0,
        scale: 0.95,
        duration: 2,
        ease: 'power1.inOut'
      })

      // Atribui o slide coerente para a direção do scroll
      .call(() => {

        this.projetoAtivo = this.listaProjetos[index];
        this.projetoAtual = index + 1;

        // coleta da direção do scroll
        const isReversing = tl.reversed() || (tl.scrollTrigger && tl.scrollTrigger.direction === -1);
        
        if (isReversing) {
          // Se estiver subindo, volta para o slide anterior
          this.projetoAtivo = this.listaProjetos[index - 1];
          this.projetoAtual = index;
        } else {
          // Se estiver descendo, avança para o slide atual
          this.projetoAtivo = this.listaProjetos[index];
        }
        
        this.cdr.detectChanges(); // Força o Angular a renderizar
      })

      .to('.project-showcase-card', {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power1.inOut'
      });

      tl.to({}, { duration: 4 }); 
    });

    // Garantia para apresentar o 1 projeto se o usuario usar o scroll até o topo da pagina de projetos
    tl.call(() => {
      const isReversing = tl.reversed() || (tl.scrollTrigger && tl.scrollTrigger.direction === -1);
      if (isReversing) {
        this.projetoAtivo = this.listaProjetos[0];
        this.cdr.detectChanges();
      }
    }, null, 0.1); // Dispara bem no começo do fluxo de projetos

  }

  ngOnInit(): void {

    // Já inicia com a verificação da timeline
    if(this.scroll.isMobile) {
      this.lineMobile();
    } else {
      this.lineDesktop();
    }
   
  }
}