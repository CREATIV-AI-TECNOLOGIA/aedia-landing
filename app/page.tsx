'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

/* ── tiny helpers ──────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const { ref, visible } = useInView()
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!visible) return
    let start = 0
    const step = target / 60
    const t = setInterval(() => {
      start += step
      if (start >= target) { setVal(target); clearInterval(t) } else { setVal(Math.floor(start)) }
    }, 16)
    return () => clearInterval(t)
  }, [visible, target])
  return <span ref={ref}>{val.toLocaleString('pt-BR')}{suffix}</span>
}

/* ── nav ──────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-ink-950/90 backdrop-blur-md border-b border-ink-800' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-aedia-blue flex items-center justify-center text-white font-bold text-sm">A</span>
          <span className="font-semibold tracking-tight text-ink-50">AEDIA</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-ink-400">
          {['Plataforma','Funcionalidades','Resultados','Escolas','Preco'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-ink-100 transition-colors">{item}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#demo" className="hidden md:block text-sm text-ink-400 hover:text-ink-100 transition-colors">Entrar</a>
          <a href="#demo" className="text-sm font-medium bg-aedia-blue hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors">
            Solicitar Demo
          </a>
        </div>
      </div>
    </header>
  )
}

/* ── 01 HERO ──────────────────────────────────────────── */
function Hero() {
  return (
    <section id="plataforma" className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 overflow-hidden noise">
      {/* grid bg */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
        backgroundSize: '64px 64px',
      }} />
      {/* glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-aedia-blue/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_420px] gap-16 items-center">
        {/* left */}
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <span className="tag bg-aedia-blue/15 text-aedia-accent border border-aedia-blue/30">
              <span className="w-1.5 h-1.5 rounded-full bg-aedia-accent animate-pulse" />
              Novo: Relatorios com IA Generativa
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-[68px] font-bold leading-[1.05] tracking-tight text-balance">
            Gestao escolar
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aedia-blue to-aedia-cyan">
              orientada por dados
            </span>
            <br />
            reais
          </h1>

          <p className="max-w-lg text-lg text-ink-400 leading-relaxed">
            AEDIA conecta avaliacoes pedagogicas, desempenho de turmas e metas
            institucionais em uma unica plataforma. Decisoes mais rapidas, resultados
            mensuraveis.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a href="#demo" className="group inline-flex items-center gap-2 bg-aedia-blue hover:bg-blue-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25">
              Comece gratuitamente
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a href="#resultados" className="inline-flex items-center gap-2 text-sm text-ink-400 hover:text-ink-100 transition-colors border border-ink-700 hover:border-ink-500 px-5 py-3.5 rounded-xl">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Ver demonstracao
            </a>
          </div>

          <div className="flex items-center gap-6 pt-2 text-sm text-ink-500">
            <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Sem contrato</span>
            <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>30 dias gratis</span>
            <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Suporte em PT-BR</span>
          </div>
        </div>

        {/* right - dashboard preview */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden stripe-border bg-ink-900 glow-blue">
            <div className="bg-ink-800 px-4 py-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-ink-500 font-mono">aedia.app/dashboard</span>
            </div>
            <Image
              src="https://picsum.photos/seed/aedia-dash/840/560"
              alt="Dashboard AEDIA"
              width={840}
              height={560}
              className="w-full object-cover opacity-80"
              priority
            />
            {/* overlay metric */}
            <div className="absolute bottom-4 left-4 right-4 bg-ink-950/80 backdrop-blur-sm rounded-xl p-4 stripe-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-ink-500 uppercase tracking-widest">Media geral da escola</p>
                  <p className="text-2xl font-bold text-ink-50">8.4 <span className="text-sm font-normal text-green-400">+1.2 este mes</span></p>
                </div>
                <div className="w-16 h-10">
                  <svg viewBox="0 0 64 40" fill="none" className="w-full">
                    <polyline points="0,35 12,28 24,30 36,18 48,10 64,4" stroke="#3B82F6" strokeWidth="2" fill="none" />
                    <polyline points="0,35 12,28 24,30 36,18 48,10 64,4 64,40 0,40" fill="url(#g1)" />
                    <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" /><stop offset="100%" stopColor="#3B82F6" stopOpacity="0" /></linearGradient></defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* floating badge */}
          <div className="absolute -top-4 -right-4 bg-aedia-blue text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
            Ao vivo agora
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 02 LOGOS / SOCIAL PROOF ──────────────────────────── */
function LogoBar() {
  const schools = [
    'EMEF Paulo Freire','SENAI Educacional','Colegio Estadual','Escola Municipal','Instituto Federal','Colegio Privado'
  ]
  return (
    <section className="border-y border-ink-800 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs text-ink-600 uppercase tracking-[0.2em] mb-8">Confiado por escolas em todo o Brasil</p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
          {schools.map(s => (
            <span key={s} className="text-ink-600 text-sm font-medium hover:text-ink-400 transition-colors">{s}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 03 METRICS STRIP ────────────────────────────────── */
function MetricsStrip() {
  const { ref, visible } = useInView()
  const metrics = [
    { value: 1240, suffix: '+', label: 'Escolas ativas' },
    { value: 320000, suffix: '+', label: 'Alunos avaliados' },
    { value: 98, suffix: '%', label: 'Taxa de satisfacao' },
    { value: 4.9, suffix: '/5', label: 'Nota media nas reviews' },
  ]
  return (
    <section id="resultados" ref={ref} className="py-20 bg-ink-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink-700">
          {metrics.map(({ value, suffix, label }) => (
            <div key={label} className="bg-ink-900 px-8 py-12 text-center">
              <div className={`text-5xl font-bold tabular-nums text-ink-50 ${
                visible ? 'animate-count-up' : 'opacity-0'
              }`}>
                {visible ? <Counter target={value} suffix={suffix} /> : `0${suffix}`}
              </div>
              <p className="mt-2 text-sm text-ink-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 04 FEATURES BENTO ───────────────────────────────── */
function Features() {
  const items = [
    {
      title: 'Avaliacoes inteligentes',
      desc: 'Crie provas, questionarios e rubricas em minutos com auxilio de IA. O sistema adapta o nivel de dificuldade ao perfil de cada turma.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      img: 'https://picsum.photos/seed/aedia-feat1/600/340',
      span: 'lg:col-span-2',
    },
    {
      title: 'Dashboard do gestor',
      desc: 'Visao centralizada de todas as turmas, professores e indicadores de aprendizado em tempo real.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      img: 'https://picsum.photos/seed/aedia-feat2/600/340',
      span: 'lg:col-span-1',
    },
    {
      title: 'Relatorios BNCC',
      desc: 'Gere relatorios alinhados automaticamente a Base Nacional Comum Curricular com um clique.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      img: null,
      span: 'lg:col-span-1',
    },
    {
      title: 'Comunicacao escola-familia',
      desc: 'Notificacoes automaticas por WhatsApp e e-mail mantendo pais e responsaveis informados sobre o progresso dos filhos.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      img: 'https://picsum.photos/seed/aedia-feat4/600/340',
      span: 'lg:col-span-2',
    },
  ]

  return (
    <section id="funcionalidades" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aedia-accent mb-4">Plataforma</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Tudo que sua escola
            <br />precisa em um lugar
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          {items.map(({ title, desc, icon, img, span }) => (
            <div key={title} className={`${span} group relative rounded-2xl bg-ink-900 stripe-border overflow-hidden hover:border-ink-600 transition-colors`}>
              {img && (
                <div className="relative h-48 overflow-hidden">
                  <Image src={img} alt={title} fill className="object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
                </div>
              )}
              <div className="p-6">
                <div className="w-9 h-9 rounded-lg bg-aedia-blue/15 border border-aedia-blue/25 text-aedia-accent flex items-center justify-center mb-4">
                  {icon}
                </div>
                <h3 className="text-lg font-semibold text-ink-50 mb-2">{title}</h3>
                <p className="text-sm text-ink-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 05 HOW IT WORKS ─────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { n:'01', title:'Configure sua escola', desc:'Cadastre turmas, professores e a grade curricular. O sistema mapeia automaticamente os componentes da BNCC.' },
    { n:'02', title:'Crie e aplique avaliacoes', desc:'Monte provas com questoes da biblioteca ou gere novas com IA. Aplique online ou importe gabaritos fisicos por OCR.' },
    { n:'03', title:'Analise os resultados', desc:'Dashboards em tempo real mostram desempenho individual, de turmas e da escola inteira comparando periodos.' },
    { n:'04', title:'Aja com confianca', desc:'Receba sugestoes de intervencao pedagogica baseadas nos dados e compartilhe relatorios com pais e secretaria.' },
  ]
  return (
    <section className="py-24 bg-ink-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aedia-accent mb-4">Como funciona</p>
            <h2 className="text-4xl font-bold tracking-tight">Do cadastro ao
insight em 4 passos</h2>
          </div>
          <a href="#demo" className="text-sm font-medium text-aedia-accent hover:text-blue-400 transition-colors flex items-center gap-1">
            Ver guia completo
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
        <div className="relative">
          <div className="absolute left-[28px] top-8 bottom-8 w-px bg-ink-700 hidden md:block" />
          <div className="space-y-0">
            {steps.map(({ n, title, desc }, i) => (
              <div key={n} className={`relative flex gap-8 p-8 rounded-2xl transition-colors hover:bg-ink-800 group ${
                i < steps.length - 1 ? 'border-b border-ink-800' : ''
              }`}>
                <div className="flex-none">
                  <div className="w-14 h-14 rounded-2xl bg-aedia-blue/10 border border-aedia-blue/20 flex items-center justify-center text-sm font-bold text-aedia-accent group-hover:bg-aedia-blue/20 transition-colors">
                    {n}
                  </div>
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-semibold text-ink-50 mb-2">{title}</h3>
                  <p className="text-ink-400 leading-relaxed max-w-lg">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 06 TESTIMONIALS ─────────────────────────────────── */
function Testimonials() {
  const quotes = [
    {
      quote: 'Com a AEDIA conseguimos identificar lacunas de aprendizado que antes levavam meses para aparecer nos resultados das provas externas.',
      name: 'Claudia Ferreira',
      role: 'Diretora Pedagogica, EMEF Monteiro Lobato',
      img: 'https://picsum.photos/seed/person1/80/80',
    },
    {
      quote: 'A plataforma e intuitiva o suficiente para professores que nao tem muita familiaridade com tecnologia. A adocao foi muito mais rapida do que esperavamos.',
      name: 'Ricardo Alves',
      role: 'Coordenador, Colegio Estadual Anchieta',
      img: 'https://picsum.photos/seed/person2/80/80',
    },
    {
      quote: 'Os relatorios alinhados a BNCC economizaram horas de trabalho toda semana. Agora focamos no que importa: os alunos.',
      name: 'Patricia Lima',
      role: 'Vice-diretora, Instituto Federal do RJ',
      img: 'https://picsum.photos/seed/person3/80/80',
    },
  ]
  return (
    <section id="escolas" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aedia-accent mb-4">Depoimentos</p>
          <h2 className="text-4xl font-bold tracking-tight">Gestores que ja transformaram suas escolas</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map(({ quote, name, role, img }) => (
            <figure key={name} className="flex flex-col justify-between p-8 rounded-2xl bg-ink-900 stripe-border hover:border-ink-600 transition-colors">
              <div>
                <div className="flex gap-0.5 mb-6">
                  {[1,2,3,4,5].map(s => <svg key={s} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                </div>
                <blockquote className="text-ink-300 leading-relaxed text-sm">{quote}</blockquote>
              </div>
              <figcaption className="mt-8 flex items-center gap-3">
                <Image src={img} alt={name} width={40} height={40} className="rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-ink-100">{name}</p>
                  <p className="text-xs text-ink-500">{role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 07 PRICING ──────────────────────────────────────── */
function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: 'Gratis',
      period: '',
      desc: 'Para escolas que querem dar o primeiro passo.',
      cta: 'Comecar gratis',
      ctaStyle: 'border border-ink-600 hover:border-ink-400 text-ink-200',
      features: ['Ate 3 turmas','50 alunos','Avaliacoes basicas','Relatorios em PDF'],
      highlight: false,
    },
    {
      name: 'Pro',
      price: 'R$ 297',
      period: '/mes',
      desc: 'Para escolas que precisam de dados completos.',
      cta: 'Solicitar Demo',
      ctaStyle: 'bg-aedia-blue hover:bg-blue-500 text-white',
      features: ['Turmas ilimitadas','Alunos ilimitados','IA generativa','BNCC automatica','Comunicacao com pais','Suporte prioritario'],
      highlight: true,
    },
    {
      name: 'Rede',
      price: 'Sob consulta',
      period: '',
      desc: 'Para secretarias e redes com multiplas unidades.',
      cta: 'Falar com especialista',
      ctaStyle: 'border border-ink-600 hover:border-ink-400 text-ink-200',
      features: ['Multi-unidade','API e integracao','SLA dedicado','Implantacao assistida','Painel da rede'],
      highlight: false,
    },
  ]
  return (
    <section id="preco" className="py-24 bg-ink-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aedia-accent mb-4">Planos</p>
          <h2 className="text-4xl font-bold tracking-tight">Simples, previsivel, justo</h2>
          <p className="mt-4 text-ink-400">Sem taxas escondidas. Cancele quando quiser.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map(({ name, price, period, desc, cta, ctaStyle, features, highlight }) => (
            <div key={name} className={`relative rounded-2xl p-8 flex flex-col ${
              highlight
                ? 'bg-aedia-blue/10 border border-aedia-blue/50 glow-blue'
                : 'bg-ink-800 stripe-border'
            }`}>
              {highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-semibold bg-aedia-blue text-white px-3 py-1 rounded-full">
                  Mais popular
                </span>
              )}
              <div className="mb-8">
                <p className="text-sm font-semibold text-ink-400 mb-1">{name}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-ink-50">{price}</span>
                  {period && <span className="text-ink-500 text-sm">{period}</span>}
                </div>
                <p className="mt-2 text-sm text-ink-400">{desc}</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-ink-300">
                    <svg className="w-4 h-4 text-aedia-accent flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#demo" className={`block text-center text-sm font-semibold py-3 rounded-xl transition-colors ${ctaStyle}`}>{cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 08 CTA FINAL ────────────────────────────────────── */
function CtaFinal() {
  return (
    <section id="demo" className="py-32 relative overflow-hidden noise">
      <div className="absolute inset-0 bg-gradient-to-br from-aedia-blue/20 via-transparent to-aedia-indigo/15 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-aedia-blue/40 to-transparent" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 tag bg-aedia-blue/15 text-aedia-accent border border-aedia-blue/30 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Implantacao em menos de 48 horas
        </div>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight text-balance mb-6">
          Sua escola merece
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-aedia-blue to-aedia-cyan">dados de qualidade</span>
        </h2>
        <p className="text-lg text-ink-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Junte-se a mais de 1.200 escolas que ja tomam decisoes pedagogicas com inteligencia.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#" className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-aedia-blue hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-blue-500/30 text-base">
            Solicitar demonstracao gratuita
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <a href="tel:+5521999999999" className="w-full sm:w-auto text-sm text-ink-400 hover:text-ink-100 transition-colors">
            ou ligue (21) 9 9999-9999
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── 09 FOOTER ───────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-ink-800 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[200px_1fr_1fr_1fr] gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-lg bg-aedia-blue flex items-center justify-center text-white font-bold text-sm">A</span>
              <span className="font-semibold tracking-tight text-ink-50">AEDIA</span>
            </div>
            <p className="text-xs text-ink-500 leading-relaxed">Avaliacao educacional com inteligencia artificial para escolas brasileiras.</p>
          </div>
          {[
            { title: 'Produto', links: ['Dashboard','Avaliacoes','Relatorios','Integracoes','API'] },
            { title: 'Empresa', links: ['Sobre','Blog','Carreiras','Parceiros','Imprensa'] },
            { title: 'Suporte', links: ['Central de ajuda','Status','Contato','LGPD','Termos'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-500 mb-4">{title}</p>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l}><a href="#" className="text-sm text-ink-400 hover:text-ink-100 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-600">
          <span>2026 AEDIA Tecnologia Educacional. Todos os direitos reservados.</span>
          <span>Feito no Brasil para o Brasil</span>
        </div>
      </div>
    </footer>
  )
}

/* ── PAGE ─────────────────────────────────────────────── */
export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <LogoBar />
      <MetricsStrip />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CtaFinal />
      <Footer />
    </main>
  )
}
