//ANIMAÇÃO AO CARREGAR A PAGINA
    const elementos = document.querySelectorAll('.refresh-animate');
    function animarElementos() {
        elementos.forEach(elemento => {
            // Adiciona a classe de animação
            elemento.classList.add('animar');
        });
    }

window.addEventListener('load', animarElementos);



//HEADER - MENU HAMBUGUER
(function initHamburger(){
  const btn       = document.getElementById('menuToggle');
  const menu      = document.getElementById('mobileMenu');
  const iconOpen  = document.getElementById('iconOpen');
  const iconClose = document.getElementById('iconClose');

  if (!btn || !menu || !iconOpen || !iconClose) return;

  const open = () => {
    menu.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    btn.setAttribute('aria-expanded','true');
    iconOpen.classList.add('hidden');
    iconClose.classList.remove('hidden');
  };

  const close = () => {
    menu.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    btn.setAttribute('aria-expanded','false');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
  };

  const toggle = () => (menu.classList.contains('hidden') ? open() : close());

  // estado inicial
  close();

  // eventos
  btn.addEventListener('click', toggle);
  // fecha ao clicar em qualquer link dentro do menu
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
  // fecha no ESC
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  // fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) close();
  });
  // opcional: ao passar de lg, fecha
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) close();
  });
})();
  //RENDER CARDS - PROJETOS
const gridDev = document.getElementById('gridDev');
const gridDesign = document.getElementById('gridDesign');

const DEV_LIMIT = 6;
let devExpanded = false;

// gera thumb (mantém suas helpers)
function thumbFrom(url){ if(!url) return null; try { return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200`; } catch { return null; } }
function placeholderFrom(titulo){
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#0b0b0b'/><stop offset='100%' stop-color='#1a1a1a'/></linearGradient></defs>
    <rect width='1200' height='675' fill='url(#g)'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
      font-family='Inter, Arial' font-size='48' fill='#fff' fill-opacity='0.9'>${titulo.replace(/&/g,"&amp;")}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  // --------- DADOS (do teu briefing) ----------
  const projetosDev = [
    { titulo:"YourJob — Projeto pessoal", tipo:"front-end",
      descricao:"Estudos de front-end: landing, formulários e navegação. Deploy no GitHub Pages.",
      imagem:"", tags:["HTML","CSS","Tailwind","JavaScript","GSAP","Front-end"],
      links:{ live:"https://hebertwilly.github.io/YourJob/pages/fromEmpresas/index.html", repo:"https://github.com/hebertwilly/YourJob" } },
    { titulo:"Lace Laboratórios — Landing Page (Freelancer)", tipo:"front-end",
      descricao:"Site institucional responsivo com animações GSAP e formulário de contato.",
      imagem:"", tags:["HTML","Tailwind","JavaScript","GSAP","Front-end"],
      links:{ live:"https://www.lacelaboratorios.com.br/", repo:"https://github.com/hebertwilly/Laboratorio_Lace_LP" } },
    { titulo:"Leadsy — Landing + Responsividade (Freelancer)", tipo:"front-end",
      descricao:"Landing e responsividade multi-breakpoint com TypeScript, Next.js e Tailwind.",
      imagem:"", tags:["TypeScript","Next.js","Tailwind","Front-end"],
      links:{ live:"https://leadsy.app" } },
    { titulo:"MyHealth — App (Desenv. Web 1) - Acadêmico", tipo:"front-end",
      descricao:"App web front-end para disciplina. Componentização e formulários.",
      imagem:"", tags:["HTML","CSS","JavaScript","Firebase","Front-end","Acadêmico"],
      links:{ repo:"https://github.com/hebertwilly/MyHealth" } },
    { titulo:"Plataforma de Estudos (Oficina de Integração 2) - Acadêmico", tipo:"fullstack",
      descricao:"Plataforma acadêmica full stack. Organização de módulos e autenticação básica.",
      imagem:"", tags:["React","TypeScript","JavaScript","Node.js","MongoDB","Tailwind CSS","Full Stack","Acadêmico"],
      links:{ repo:"https://github.com/hebertwilly/Oficina-2" } },
    { titulo:"Pesquisa de Apoio Popular — Mobile - Acadêmico", tipo:"mobile",
      descricao:"App mobile de pesquisa. Layouts responsivos e navegação.",
      imagem:"", tags:["React Native","Firebase","Mobile","Acadêmico"],
      links:{ repo:"https://github.com/hebertwilly/projeto-programacao-dispositivos-moveis" } },
    { titulo:"API Posto de Combustível — CRUD + Auth - Acadêmico", tipo:"back-end",
      descricao:"API REST com CRUD e autenticação de usuários (Desenv. Web 2).",
      imagem:"", tags:["Node.js","MongoDB","API","CRUD","Autenticação","Back-end"],
      links:{ repo:"https://github.com/hebertwilly/Projeto2_API" } },
    { titulo:"iParty — Marketplace (TCC) - Acadêmico", tipo:"fullstack",
      descricao:"Plataforma para festas e eventos. Em desenvolvimento.",
      imagem:"", tags:["React","Firebase","Full Stack","TCC","Marketplace"],
      links:{ repo:"https://github.com/hebertwilly/IpartyWeb" } },
    { titulo:"Experience — Gestão de Equipes e Clientes - Projeto pessoal", tipo:"fullstack",
      descricao:"SaaS para equipes e carteira de clientes. Em desenvolvimento.",
      imagem:"", tags:["Node.js","MongoDB","React","Tailwind CSS","Full Stack","SaaS","Gestão"],
      links:{ repo:"https://github.com/hebertwilly/experience_api" } },
  ];

  const projetosDesign = [
    { titulo:"YourJob — UI/UX (Desktop)", tipo:"uiux",
      descricao:"Plataforma de recrutamento: fluxo de candidatura e Design System básico.",
      imagem:"", tags:["Figma","Design System","UX"],
      links:{ figma:"https://www.figma.com/design/d6LsFVyutWVvVFduwImSJH/YourJob?node-id=0-1&p=f&t=fPkwTcwbg6d7vPBN-0", behance:"https://www.behance.net/gallery/230260633/YourJob" },
      behanceEmbed:`<iframe src="https://www.behance.net/embed/project/230260633?ilo0=1" class="w-full h-full" allowfullscreen loading="lazy" frameborder="0"></iframe>` },
    { titulo:"FoodDelivery — UI/UX (Mobile)", tipo:"uiux",
      descricao:"App mobile de delivery: navegação, carrinho e checkout. Padrões Android/iOS.",
      imagem:"", tags:["Figma","Mobile UI"],
      links:{ figma:"https://www.figma.com/design/sRSjBUzxx6lylnpW3ytpmi/Untitled?t=fPkwTcwbg6d7vPBN-1", behance:"https://www.behance.net/gallery/195145017/FoodDelivery-App" },
      behanceEmbed:`<iframe src="https://www.behance.net/embed/project/195145017?ilo0=1" class="w-full h-full" allowfullscreen loading="lazy" frameborder="0"></iframe>` },
  ];

  // --------- HELPERS ----------
  const gridDev = document.getElementById('gridDev');
  const gridDesign = document.getElementById('gridDesign');
  const DEV_LIMIT = 3;
  let devExpanded = false;

  const thumbFrom = (url) => url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200` : null;

  const placeholderFrom = (titulo) => {
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'>
        <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='#0b0b0b'/><stop offset='100%' stop-color='#1a1a1a'/></linearGradient></defs>
        <rect width='1200' height='675' fill='url(#g)'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
          font-family='Inter, Arial' font-size='48' fill='#fff' fill-opacity='0.9'>${titulo.replace(/&/g,"&amp;")}</text>
      </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  // --------- RENDER DEV (com ver mais) ----------
  function renderDev(lista, expanded=false) {
    if (!gridDev) return;
    gridDev.innerHTML = '';
    const items = expanded ? lista : lista.slice(0, DEV_LIMIT);

    items.forEach((p) => {
      const shot = p.imagem || thumbFrom(p.links?.live) || thumbFrom(p.links?.repo) || placeholderFrom(p.titulo);
      const el = document.createElement('article');
      el.className = 'group rounded-2xl overflow-hidden border border-white/10 bg-black/30 hover:bg-black/25 transition flex flex-col';
      el.setAttribute('data-type', p.tipo);
      el.innerHTML = `
        <div class="relative aspect-[16/9] overflow-hidden">
          <img src="${shot}" alt="${p.titulo}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 duration-500">
          <span class="absolute top-3 left-3 text-[11px] px-2 py-1 rounded-md bg-white/90 text-black border border-black/10">DEV</span>
        </div>
        <div class="p-5 flex-1 flex flex-col">
          <h4 class="font-semibold">${p.titulo}</h4>
          <p class="mt-1 text-sm text-white/70">${p.descricao}</p>
          <div class="mt-3 flex flex-wrap gap-2">
            ${p.tags.map(t => `<span class="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10">${t}</span>`).join('')}
          </div>
          <div class="mt-auto pt-4 flex flex-wrap items-center gap-3">
            ${p.links?.live ? `<a href="${p.links.live}" target="_blank" rel="noopener" class="text-sm px-3 py-1.5 rounded-full bg-white text-black hover:bg-gray-200">Live</a>` : ''}
            ${p.links?.repo ? `<a href="${p.links.repo}" target="_blank" rel="noopener" class="text-sm px-3 py-1.5 rounded-full border border-white/15 hover:border-white/35 hover:bg-white/5">Código</a>` : ''}
          </div>
        </div>`;
      gridDev.appendChild(el);
    });

    const btn = document.getElementById('btnDevToggle');
    const controls = document.getElementById('devControls');
    if (!btn || !controls) return;
    if (lista.length <= DEV_LIMIT) {
      controls.classList.add('hidden');
    } else {
      controls.classList.remove('hidden');
      btn.textContent = expanded ? 'Ver menos' : 'Ver mais';
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }
  }

  // --------- RENDER DESIGN ----------
  function renderDesign(lista) {
    if (!gridDesign) return;
    gridDesign.innerHTML = '';
    lista.forEach((p) => {
      const shot = p.imagem || thumbFrom(p.links?.behance) || placeholderFrom(p.titulo);
      const media = p.behanceEmbed
        ? p.behanceEmbed
        : `<img src="${shot}" alt="${p.titulo}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 duration-500">`;

      const el = document.createElement('article');
      el.className = 'group rounded-2xl overflow-hidden border border-white/10 bg-black/30 hover:bg-black/25 transition flex flex-col';
      el.setAttribute('data-type', p.tipo);
      el.innerHTML = `
        <div class="relative aspect-[16/9] overflow-hidden">
          ${media}
          <span class="absolute top-3 left-3 text-[11px] px-2 py-1 rounded-md bg-white/90 text-black border border-black/10">UI/UX</span>
        </div>
        <div class="p-5 flex-1 flex flex-col">
          <h4 class="font-semibold">${p.titulo}</h4>
          <p class="mt-1 text-sm text-white/70">${p.descricao}</p>
          <div class="mt-3 flex flex-wrap gap-2">
            ${p.tags.map(t => `<span class="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10">${t}</span>`).join('')}
          </div>
          <div class="mt-auto pt-4 flex flex-wrap items-center gap-3">
            ${p.links?.figma ? `<a href="${p.links.figma}" target="_blank" rel="noopener" class="text-sm px-3 py-1.5 rounded-full bg-white text-black hover:bg-gray-200">Figma</a>` : ''}
            ${p.links?.behance ? `<a href="${p.links.behance}" target="_blank" rel="noopener" class="text-sm px-3 py-1.5 rounded-full border border-white/15 hover:border-white/35 hover:bg-white/5">Behance</a>` : ''}
          </div>
        </div>`;
      gridDesign.appendChild(el);
    });
  }

  // --------- Controles Ver mais/menos ----------
  const btnDevToggle = document.getElementById('btnDevToggle');
  if (btnDevToggle) {
    btnDevToggle.addEventListener('click', () => {
      devExpanded = !devExpanded;
      renderDev(projetosDev, devExpanded);
      if (!devExpanded) gridDev.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // --------- Start ----------
  renderDev(projetosDev, false);
  renderDesign(projetosDesign);
});

//Animação scroll cards habilidades

const track = document.getElementById('skillsTrack');
  const prev  = document.getElementById('skillsPrev');
  const next  = document.getElementById('skillsNext');

  // navegação (desktop)
  function scrollByPage(dir=1){
    const amount = track.clientWidth * 0.9;
    track.scrollBy({left: amount * dir, behavior:'smooth'});
  }
  prev?.addEventListener('click', ()=>scrollByPage(-1));
  next?.addEventListener('click', ()=>scrollByPage(1));

  // teclado (mobile/desktop)
  track.addEventListener('keydown', (e)=>{
    if(e.key==='ArrowRight') scrollByPage(1);
    if(e.key==='ArrowLeft')  scrollByPage(-1);
  });

  // animação de entrada
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('revealed'); });
  }, {threshold:.15});
  document.querySelectorAll('#skillsTrack .reveal').forEach(el => io.observe(el));

//ENVIO DE EMAIL VIA EMAILJS
 // ====== CONFIG ======
  const EMAILJS_PUBLIC_KEY  = 'iyeb5UkSSBlznvnsy';   // tua public key
  const EMAILJS_SERVICE_ID  = 'service_he8q3a9';     // teu service (Outlook)
  const EMAILJS_TEMPLATE_ID = 'template_76iuemd';  // <-- TROCA pelo ID do teu template
  // =====================

  // Inicializa EmailJS
  (function(){ emailjs.init(EMAILJS_PUBLIC_KEY); })();

  const form   = document.getElementById('contato-form');
  const status = document.getElementById('contato-status');
  const btn    = document.getElementById('contato-submit');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // pega dados do form
    const nome      = form.nome.value.trim();
    const emailUser = form.replyto.value.trim(); // teu input de email
    const assunto   = (form.assunto.value || 'Contato pelo portfólio').trim();
    const mensagem  = form.mensagem.value.trim();

    if (!nome || !emailUser || !mensagem) {
      status.textContent = 'Preencha nome, e-mail e mensagem.';
      return;
    }

    // Envia ambas chaves de e-mail pra evitar mismatch de variável no template
    // (tanto {{email}} quanto {{replyto}} vão funcionar)
    const data = {
      nome:     nome,
      mensagem: mensagem,
      assunto:  assunto,
      email:    emailUser,  // caso teu template use {{email}}
      replyto:  emailUser,  // caso teu template use {{replyto}}
    };

    // UX
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    status.textContent = 'Enviando sua mensagem...';

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);
      status.textContent = 'Mensagem enviada! Te respondo em breve.';
      form.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      status.textContent = 'Falha ao enviar. Tenta novamente.';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Enviar e-mail';
      setTimeout(() => status.textContent = '', 5000);
    }
  });



//ANIMAÇÃO DE SCROLL COM GSAP

(function () {
  gsap.registerPlugin(ScrollTrigger);

  // 1) Estado inicial dos elementos
  gsap.set('.elemento', { opacity: 0, y: 20 });

  // 2) Animação por lote
  ScrollTrigger.batch('.elemento', {
    start: 'top 80%',
    // once: true,
    onEnter: (els) => gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power1.out',
      stagger: 0.06,
      overwrite: true
    }),
    onLeaveBack: (els) => gsap.to(els, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power1.out',
      overwrite: true
    }),
    invalidateOnRefresh: true
  });

  // 3) Header dinâmico
  const headerEl = document.getElementById('site-header') || document.querySelector('header');
  function setHeaderVar() {
    const h = headerEl?.offsetHeight || 0;
    document.documentElement.style.setProperty('--header-h', h + 'px');
  }

 
  function revealAlreadyInView() {
    const vh = window.innerHeight;
    document.querySelectorAll('.elemento').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top <= vh * 0.8 && r.bottom >= 0) {
        gsap.set(el, { opacity: 1, y: 0 });
      }
    });
  }

  // 5) Eventos
  window.addEventListener('load', () => {
    setHeaderVar();
    revealAlreadyInView();
    setTimeout(() => ScrollTrigger.refresh(), 100);
  });

  window.addEventListener('resize', () => {
    setHeaderVar();
    ScrollTrigger.refresh();
  });

 
  window.addEventListener('hashchange', () => {
    setTimeout(() => {
      revealAlreadyInView();
      ScrollTrigger.refresh();
    }, 50);
  });
})();


// === CURRÍCULO: arquivo local ===
document.addEventListener('DOMContentLoaded', () => {
  const CV_URL = '/cv/HebertWillyCV.pdf';   // caminho do teu PDF
  const CV_NAME = 'Hebert-Willy-CV.pdf';

  // pega todos os links de currículo: header, mobile e "Download CV" (que hoje apontam pra #cv)
  const selectors = ['#btnCV', '#btnCVMobile', 'a[href="#cv"]'];
  const links = document.querySelectorAll(selectors.join(','));

  links.forEach(a => {
    a.href = CV_URL;
    a.setAttribute('download', CV_NAME);         // força download (mesma origem)
    a.setAttribute('type', 'application/pdf');
    a.setAttribute('rel', 'noopener');
    a.setAttribute('target', '_blank');
  });
});