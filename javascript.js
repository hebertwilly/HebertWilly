/* =======================
   HERO – anima ao carregar
   ======================= */
(function(){
  const elementos = document.querySelectorAll('.refresh-animate');
  function animarElementos(){ elementos.forEach(el => el.classList.add('animar')); }
  window.addEventListener('load', animarElementos);
})();

/* =======================
   Header – menu hambúrguer
   ======================= */
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

  close(); // estado inicial
  btn.addEventListener('click', toggle);
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  document.addEventListener('click', (e) => { if (!menu.contains(e.target) && !btn.contains(e.target)) close(); });
  window.addEventListener('resize', () => { if (window.innerWidth >= 1024) close(); });
})();

/* ==========================================
   Renderização dos projetos (DEV / DESIGN)
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
  const gridDev    = document.getElementById('gridDev');
  const gridDesign = document.getElementById('gridDesign');
  const DEV_LIMIT  = 3;
  let devExpanded  = false;

  // -------- dados (ajuste à vontade) --------
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

  function renderDev(lista, expanded=false) {
    if (!gridDev) return;
    gridDev.innerHTML = '';
    const items = expanded ? lista : lista.slice(0, DEV_LIMIT);

    items.forEach((p) => {
      const shot = p.imagem || thumbFrom(p.links?.live) || thumbFrom(p.links?.repo) || placeholderFrom(p.titulo);
      const el = document.createElement('article');
      // NOTE: adiciono 'elemento' pra entrar no scroll-reveal
      el.className = 'elemento group rounded-2xl overflow-hidden border border-white/10 bg-black/30 hover:bg-black/25 transition flex flex-col';
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

  function renderDesign(lista) {
    if (!gridDesign) return;
    gridDesign.innerHTML = '';
    lista.forEach((p) => {
      const shot = p.imagem || thumbFrom(p.links?.behance) || placeholderFrom(p.titulo);
      const media = p.behanceEmbed
        ? p.behanceEmbed
        : `<img src="${shot}" alt="${p.titulo}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 duration-500">`;

      const el = document.createElement('article');
      // NOTE: adiciono 'elemento' pra entrar no scroll-reveal
      el.className = 'elemento group rounded-2xl overflow-hidden border border-white/10 bg-black/30 hover:bg-black/25 transition flex flex-col';
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

  // botão ver mais/menos
  const btnDevToggle = document.getElementById('btnDevToggle');
  btnDevToggle?.addEventListener('click', () => {
    devExpanded = !devExpanded;
    renderDev(projetosDev, devExpanded);
  });

  // Render inicial
  renderDev(projetosDev, false);
  renderDesign(projetosDesign);

  // Atualiza o ano do footer
  const $year = document.getElementById('year');
  if ($year) $year.textContent = String(new Date().getFullYear());
});

/* =====================================
   Skills – scroll por página (setas)
   ===================================== */
(function(){
  const track = document.getElementById('skillsTrack');
  const prev  = document.getElementById('skillsPrev');
  const next  = document.getElementById('skillsNext');
  if (!track) return;

  function scrollByPage(dir=1){
    const amount = track.clientWidth * 0.9;
    track.scrollBy({ left: amount * dir, behavior:'smooth' });
  }
  prev?.addEventListener('click', ()=>scrollByPage(-1));
  next?.addEventListener('click', ()=>scrollByPage(1));
  track.addEventListener('keydown', (e)=>{
    if(e.key==='ArrowRight') scrollByPage(1);
    if(e.key==='ArrowLeft')  scrollByPage(-1);
  });
})();

/* ====================================================
   Scroll reveal com IntersectionObserver (sem GSAP)
   ==================================================== */
(function scrollReveal(){
  const selector = '.elemento, #skillsTrack .reveal';

  // estado inicial SÓ pra quem começa fora da viewport
  const prime = (el) => {
    const r = el.getBoundingClientRect();
    if (r.top >= window.innerHeight * 0.98) el.classList.add('sr-init');
  };

  const applyToNodeAndChildren = (node) => {
    if (node.nodeType !== 1) return;
    if (node.matches?.(selector)) { prime(node); io.observe(node); }
    node.querySelectorAll?.(selector).forEach(el => { prime(el); io.observe(el); });
  };

  const onEnter = (entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add('sr-in');
    el.classList.remove('sr-init');
    io.unobserve(el);
  };

  const io = new IntersectionObserver((entries)=>entries.forEach(onEnter), {
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px'
  });

  // aplica nos existentes
  document.querySelectorAll(selector).forEach(el => { prime(el); io.observe(el); });

  // observa grids que recebem itens dinamicamente
  ['#gridDev','#gridDesign'].forEach(sel=>{
    const node = document.querySelector(sel);
    if(!node) return;
    new MutationObserver((ms)=>{
      ms.forEach(m => m.addedNodes.forEach(applyToNodeAndChildren));
    }).observe(node, { childList:true, subtree:true });
  });

  // após navegar por âncora, libera o que já entrou na tela
  const revealNow = () => {
    document.querySelectorAll('.sr-init').forEach(el=>{
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.95) { el.classList.add('sr-in'); el.classList.remove('sr-init'); }
    });
  };
  window.addEventListener('hashchange', () => requestAnimationFrame(revealNow));
  window.addEventListener('load', revealNow, { once:true });
  window.addEventListener('orientationchange', () => setTimeout(revealNow, 200));
  let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(revealNow, 120); });
})();

/* =========================
   EmailJS – envio do form
   ========================= */
(function setupEmail(){
  const EMAILJS_PUBLIC_KEY  = 'iyeb5UkSSBlznvnsy';
  const EMAILJS_SERVICE_ID  = 'service_he8q3a9';
  const EMAILJS_TEMPLATE_ID = 'template_76iuemd';

  if (!window.emailjs) return;
  emailjs.init(EMAILJS_PUBLIC_KEY);

  const form   = document.getElementById('contato-form');
  const status = document.getElementById('contato-status');
  const btn    = document.getElementById('contato-submit');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome      = form.nome.value.trim();
    const emailUser = form.replyto.value.trim();
    const assunto   = (form.assunto.value || 'Contato pelo portfólio').trim();
    const mensagem  = form.mensagem.value.trim();

    if (!nome || !emailUser || !mensagem) {
      status.textContent = 'Preencha nome, e-mail e mensagem.';
      return;
    }

    const data = { nome, mensagem, assunto, email: emailUser, replyto: emailUser };

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
})();

/* ==========================================
   Currículo – apontar para o PDF local
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
  const CV_URL  = '/cv/HebertWillyCV.pdf';
  const CV_NAME = 'Hebert-Willy-CV.pdf';
  const selectors = ['#btnCV', '#btnCVMobile', 'a[href="#cv"]'];
  const links = document.querySelectorAll(selectors.join(','));
  links.forEach(a => {
    a.href = CV_URL;
    a.setAttribute('download', CV_NAME);
    a.setAttribute('type', 'application/pdf');
    a.setAttribute('rel', 'noopener');
    a.setAttribute('target', '_blank');
  });
});