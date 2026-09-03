import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Instagram, Menu, Phone, X } from "lucide-react";
import Lenis from "lenis";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";

import heroImage from "../assets/jr-bix-hero.jpg";
import heroVideo from "../assets/jr-bix-hero.mp4.asset.json";
import craftImage from "../assets/jr-bix-craft.jpg";
import aerialImage from "../assets/jr-bix-aerial.jpg";
import detailImage from "../assets/jr-bix-detail.jpg";
import beforeImage from "../assets/jr-bix-before.jpg";
import afterImage from "../assets/jr-bix-after.jpg";

const PHONE = "+19315550187";
const INSTAGRAM = "https://www.instagram.com/jr_bixroofing/";
const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  ["01", "Roof replacement", "Complete roofing systems specified for lasting performance and finished with exacting detail."],
  ["02", "Roof repair", "Targeted repairs that solve the source of the issue and restore confidence in your roof."],
  ["03", "Storm damage", "Clear assessment and dependable restoration after Tennessee's severe weather."],
  ["04", "Residential roofing", "Craftsmanship-led roofing for homes of every scale and architectural style."],
  ["05", "Roof inspections", "Thorough, honest evaluations with practical guidance on what comes next."],
  ["06", "Free estimates", "A straightforward scope, transparent plan and no-pressure consultation."],
];

const process = [
  ["01", "Free estimate", "Start with a clear conversation about your home and priorities."],
  ["02", "Roof assessment", "We inspect the full system, not just the visible problem."],
  ["03", "Clear plan", "You receive a practical scope with materials and expectations defined."],
  ["04", "Expert installation", "A skilled crew executes the work with care and precision."],
  ["05", "Final inspection", "We review every detail and leave your property ready to enjoy."],
];

function useSmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.85 });
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, [reduced]);
}

function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(reduced ? 100 : 0);
  useEffect(() => {
    if (reduced) { onDone(); return; }
    const started = performance.now();
    const timer = window.setInterval(() => {
      const value = Math.min(100, Math.round(((performance.now() - started) / 1450) * 100));
      setProgress(value);
      if (value === 100) { clearInterval(timer); window.setTimeout(onDone, 300); }
    }, 25);
    return () => clearInterval(timer);
  }, [onDone, reduced]);
  return (
    <motion.div className="fixed inset-0 z-[100] flex flex-col justify-between bg-footer p-6 text-hero md:p-10" exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 1.05, ease }}>
      <div className="flex items-center gap-3"><span className="h-px w-8 bg-gold"/><span className="font-meta text-[11px] uppercase tracking-[0.22em]">Clarksville, Tennessee</span></div>
      <div><div className="font-display text-[clamp(4rem,14vw,12rem)] leading-none">JR BIX</div><div className="mt-8 h-px bg-hero/20"><motion.div className="h-full bg-gold" animate={{ width: `${progress}%` }} /></div></div>
      <div className="flex items-end justify-between font-meta uppercase"><span className="text-[10px] tracking-[0.22em] text-copy-dark">Building protection</span><span className="text-2xl tabular-nums">{progress.toString().padStart(3, "0")}%</span></div>
    </motion.div>
  );
}

function Header({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 50); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  const links = [["Services", "#services"], ["About", "#about"], ["Our work", "#work"], ["Contact", "#contact"]];
  return (
    <motion.header initial={{ opacity: 0, y: -20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: .8, delay: .2, ease }} className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${scrolled || open ? "border-line-dark bg-ink/95 backdrop-blur-md" : "border-transparent"}`}>
      <div className="mx-auto grid h-20 max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center px-5 md:h-24 md:grid-cols-[1fr_auto_1fr] md:px-10">
        <a href="#home" className="flex min-w-0 items-center gap-3 text-hero" aria-label="JR BIX Roofing home"><span className="roof-mark"/><span className="truncate font-meta text-sm font-semibold tracking-[0.14em]">JR BIX ROOFING</span></a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">{links.map(([label, href]) => <a key={href} href={href} className="nav-link">{label}</a>)}</nav>
        <div className="hidden justify-end md:flex"><a href={`tel:${PHONE}`} className="link-line text-[11px] font-semibold uppercase tracking-[0.14em] text-hero">Call for estimate <ArrowRight size={14}/></a></div>
        <button className="icon-button md:hidden" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X/> : <Menu/>}</button>
      </div>
      <AnimatePresence>{open && <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden bg-ink px-5 md:hidden">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="block border-t border-line-dark py-5 font-display text-3xl text-hero">{label}</a>)}<a href={`tel:${PHONE}`} className="mb-6 mt-2 inline-flex text-sm font-semibold uppercase tracking-[0.12em] text-gold">Call now <ArrowRight className="ml-2" size={18}/></a></motion.nav>}</AnimatePresence>
    </motion.header>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: "-12%" });
  const reduced = useReducedMotion();
  return <motion.div ref={ref} className={className} initial={reduced ? false : { opacity: 0, y: 38, clipPath: "inset(0 0 32% 0)" }} animate={visible ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } : {}} transition={{ duration: 1, delay, ease }}>{children}</motion.div>;
}

function Hero({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, .18], [0, reduced ? 0 : 110]);
  const scale = useTransform(scrollYProgress, [0, .18], [1.06, 1]);
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden bg-ink text-hero">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        {!reduced && <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster={heroImage} aria-hidden="true"><source src={heroVideo.url} type="video/mp4" /></video>}
        {reduced && <img src={heroImage} alt="Premium charcoal roof with copper flashing at golden hour" className="h-full w-full object-cover" width={1920} height={1088}/>}<div className="hero-overlay"/>
      </motion.div>
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-5 pb-8 pt-28 md:px-10 md:pb-9">
        <motion.div initial="hidden" animate={ready ? "show" : "hidden"} variants={{ hidden: {}, show: { transition: { staggerChildren: .12, delayChildren: .25 } } }} className="max-w-6xl">
          <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: .75, ease } } }} className="eyebrow text-gold"><span/>JR BIX ROOFING</motion.div>
          <div className="mt-5 overflow-hidden"><motion.h1 variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 1.15, ease } } }} className="font-display text-[clamp(3.65rem,10.4vw,10rem)] leading-[.82] tracking-normal">ROOFING BUILT<br/><em className="font-normal">TO LAST.</em></motion.h1></div>
          <motion.p variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: .85, ease } } }} className="mt-7 max-w-xl text-base leading-7 text-copy-dark md:text-lg">Premium roofing craftsmanship in Clarksville, TN — built with precision, protection and pride.</motion.p>
          <motion.div variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: .85, ease } } }} className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={`tel:${PHONE}`} className="cta-primary"><Phone size={16}/>Call now for your free estimate<ArrowRight size={17}/></a><a href="#work" className="cta-secondary">Explore our work<ArrowDown size={17}/></a></motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.5, duration: 1 }} className="mt-12 flex items-end justify-between border-t border-hero/20 pt-5 font-meta text-[10px] uppercase tracking-[0.2em]"><span>Clarksville, TN</span><span className="hidden items-center gap-2 text-copy-dark sm:flex"><span className="h-7 w-px bg-gold"/>Scroll to discover</span></motion.div>
      </div>
    </section>
  );
}

function Intro() {
  return <section id="about" className="bg-paper px-5 py-28 text-ink md:px-10 md:py-44"><div className="mx-auto max-w-[1600px]"><Reveal><div className="eyebrow text-earth"><span/>Our standard</div><h2 className="mt-8 max-w-[1400px] font-display text-[clamp(3rem,7.6vw,8.5rem)] leading-[.92]">MORE THAN A ROOF.<br/><em>A STANDARD OF</em><br/>CRAFTSMANSHIP.</h2></Reveal><div className="mt-16 grid gap-8 border-t border-line-light pt-8 md:grid-cols-12 md:gap-12"><p className="font-meta text-xs uppercase tracking-[.17em] text-earth md:col-span-3">Protection, made personal.</p><Reveal className="md:col-span-6 md:col-start-7"><p className="max-w-2xl text-xl leading-8 text-copy-light md:text-2xl md:leading-10">JR BIX Roofing delivers dependable craftsmanship for Clarksville homeowners, with an unwavering focus on quality, precision and long-term protection.</p></Reveal></div></div></section>;
}

function Services() {
  return <section id="services" className="bg-deep px-5 py-28 text-hero md:px-10 md:py-40"><div className="mx-auto max-w-[1600px]"><div className="mb-14 grid gap-6 md:grid-cols-2"><Reveal><div className="eyebrow text-gold"><span/>What we do</div><h2 className="section-title mt-6">OUR<br/><em>EXPERTISE</em></h2></Reveal><p className="max-w-md self-end text-copy-dark md:justify-self-end">A complete approach to residential roofing—from a clear first assessment to a carefully finished installation.</p></div><div className="grid border-t border-line-dark md:grid-cols-2">{services.map(([number,title,copy], index) => <motion.article key={number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .75, delay: (index % 2) * .08, ease }} className="service-item group"><span className="font-meta text-xs text-gold">{number}</span><div><h3 className="font-display text-3xl uppercase md:text-4xl">{title}</h3><p className="service-copy">{copy}</p></div><ArrowRight className="service-arrow" aria-hidden="true"/></motion.article>)}</div></div></section>;
}

function ClipFigure({ from, className, delay = 0, cursor, children }: { from: string; className: string; delay?: number; cursor?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  return <motion.figure ref={ref} data-cursor={cursor} className={className} initial={reduced ? undefined : { clipPath: from }} animate={reduced || visible ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined} transition={{ duration: 1.2, delay, ease }}>{children}</motion.figure>;
}

function Showcase() {
  return <section id="work" className="overflow-hidden bg-paper px-5 py-28 text-ink md:px-10 md:py-44"><div className="mx-auto max-w-[1600px]"><Reveal><div className="eyebrow text-earth"><span/>Selected craftsmanship</div><h2 className="section-title mt-6 max-w-5xl">DETAILS DEFINE<br/><em>THE DIFFERENCE.</em></h2></Reveal><div className="mt-16 grid gap-5 md:grid-cols-12 md:grid-rows-[17rem_29rem]"><ClipFigure from="inset(0% 0% 100% 0%)" cursor="VIEW" className="group relative min-h-72 overflow-hidden md:col-span-8 md:row-span-2"><img src={craftImage} alt="Roofing professional carefully installing charcoal shingles" width={1440} height={1808} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.035]"/><figcaption className="image-caption"><span>Residential installation</span><span>Clarksville, TN</span></figcaption></ClipFigure><ClipFigure from="inset(100% 0% 0% 0%)" delay={.1} cursor="VIEW" className="group relative min-h-72 overflow-hidden md:col-span-4"><img src={detailImage} alt="Close detail of ridge cap and precision roof flashing" width={1408} height={1056} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"/><figcaption className="image-caption"><span>Material precision</span><span>Detail 01</span></figcaption></ClipFigure><div className="flex flex-col justify-between gap-8 border-t border-line-light pt-6 md:col-span-4"><p className="font-display text-3xl leading-tight md:text-4xl">Every line considered.<br/>Every layer built to endure.</p><p className="max-w-xs text-sm leading-6 text-copy-light">The best roofing work is measured in the details you see—and the protection you never have to think about.</p></div></div><ClipFigure from="inset(0% 100% 0% 0%)" cursor="VIEW" className="group relative mt-5 aspect-[16/8] overflow-hidden"><img src={aerialImage} alt="Aerial view of a completed charcoal residential roof" width={1600} height={1200} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-[1.025]"/><figcaption className="image-caption"><span>Complete roofing system</span><span>Aerial study</span></figcaption></ClipFigure></div></section>;
}


function Why() {
  const points = [["Precision","Careful attention to every detail."],["Quality","A focus on dependable roofing solutions."],["Protection","Built to protect what matters most."],["Local","Proudly serving Clarksville, Tennessee."]];
  return <section className="bg-ink px-5 py-28 text-hero md:px-10 md:py-40"><div className="mx-auto max-w-[1600px]"><Reveal><div className="eyebrow text-gold"><span/>The JR BIX difference</div><h2 className="section-title mt-6 max-w-6xl">BUILT WITH PURPOSE.<br/><em>PROTECTED FOR YEARS.</em></h2></Reveal><div className="mt-16 border-t border-line-dark">{points.map(([title,copy], i) => <motion.div key={title} initial={{ opacity:.25 }} whileInView={{ opacity:1 }} viewport={{ amount:.65 }} transition={{ duration:.6 }} className="grid gap-4 border-b border-line-dark py-7 md:grid-cols-12 md:items-center"><span className="font-meta text-xs text-gold md:col-span-1">0{i+1}</span><h3 className="font-display text-3xl uppercase md:col-span-5 md:text-5xl">{title}</h3><p className="text-copy-dark md:col-span-4">{copy}</p><span className="hidden h-px bg-gold md:col-span-2 md:block"/></motion.div>)}</div></div></section>;
}

function BeforeAfter() {
  const [position, setPosition] = useState(52);
  const frame = useRef<HTMLDivElement>(null);
  const update = (clientX: number) => { const rect = frame.current?.getBoundingClientRect(); if (!rect) return; setPosition(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))); };
  const pointer = (event: ReactPointerEvent<HTMLDivElement>) => { event.currentTarget.setPointerCapture(event.pointerId); update(event.clientX); };
  return <section className="bg-ink px-5 py-28 text-hero md:px-10 md:py-40"><div className="mx-auto max-w-[1600px]"><div className="grid gap-8 md:grid-cols-2 md:items-end"><Reveal><div className="eyebrow text-gold"><span/>The transformation</div><h2 className="section-title mt-6">BEFORE /<br/><em>AFTER</em></h2></Reveal><p className="max-w-md text-copy-dark md:justify-self-end">Drag the divider to see how a new roofing system changes both the protection and presence of a home.</p></div><div ref={frame} onPointerDown={pointer} onPointerMove={e => e.currentTarget.hasPointerCapture(e.pointerId) && update(e.clientX)} className="relative mt-14 aspect-[16/10] touch-none select-none overflow-hidden bg-deep" data-cursor="DRAG"><img src={beforeImage} alt="Home before roof replacement with worn gray shingles" width={1600} height={1008} loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 overflow-hidden" style={{ clipPath:`inset(0 ${100-position}% 0 0)` }}><img src={afterImage} alt="Same style home after a premium charcoal roof replacement" width={1600} height={1008} loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover"/></div><span className="comparison-label left-4">After</span><span className="comparison-label right-4">Before</span><div className="absolute inset-y-0 w-px bg-gold" style={{ left:`${position}%` }}><button type="button" aria-label="Before and after comparison position" className="slider-handle" onKeyDown={e => { if (e.key === "ArrowLeft") setPosition(p=>Math.max(0,p-2)); if (e.key === "ArrowRight") setPosition(p=>Math.min(100,p+2)); }}><span>‹</span><span>›</span></button></div></div></div></section>;
}

function Story() {
  const ref = useRef<HTMLElement>(null); const reduced=useReducedMotion(); const { scrollYProgress }=useScroll({target:ref,offset:["start end","end start"]}); const imageY=useTransform(scrollYProgress,[0,1],[-50,reduced?0:70]); const textY=useTransform(scrollYProgress,[0,1],[45,reduced?0:-45]);
  return <section ref={ref} className="relative flex min-h-[90svh] overflow-hidden bg-ink text-hero"><motion.img style={{y:imageY,scale:1.12}} src={heroImage} alt="Architectural roof lines illuminated by warm evening light" width={1920} height={1088} loading="lazy" className="absolute -inset-y-20 h-[calc(100%+10rem)] w-full object-cover"/><div className="story-overlay"/><motion.div style={{y:textY}} className="relative mx-auto flex w-full max-w-[1600px] flex-col justify-between px-5 py-24 md:px-10 md:py-32"><div className="eyebrow text-gold"><span/>Made for Tennessee</div><Reveal className="self-center"><h2 className="max-w-6xl text-center font-display text-[clamp(3.2rem,8.3vw,9rem)] leading-[.88]">CRAFTED FOR<br/><em>THE WEATHER.</em><br/>DESIGNED FOR<br/>THE YEARS AHEAD.</h2></Reveal><div className="flex justify-between border-t border-hero/30 pt-5 font-meta text-[10px] uppercase tracking-[.2em]"><span>Precision installation</span><span>Long-term protection</span></div></motion.div></section>;
}

function Process() {
  return <section className="bg-paper px-5 py-28 text-ink md:px-10 md:py-40"><div className="mx-auto max-w-[1600px]"><Reveal><div className="eyebrow text-earth"><span/>Our process</div><h2 className="section-title mt-6">FROM ESTIMATE<br/><em>TO FINISH.</em></h2></Reveal><div className="relative mt-20 grid gap-0 md:grid-cols-5"><motion.div initial={{scaleX:0}} whileInView={{scaleX:1}} viewport={{once:true,amount:.7}} transition={{duration:1.4,ease}} className="absolute left-0 right-0 top-3 hidden h-px origin-left bg-earth md:block"/>{process.map(([number,title,copy],i)=><motion.article key={number} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.5}} transition={{duration:.7,delay:i*.08,ease}} className="process-step"><span className="process-dot"/><span className="font-meta text-xs text-earth">{number}</span><h3 className="mt-5 font-display text-2xl uppercase">{title}</h3><p className="mt-3 text-sm leading-6 text-copy-light">{copy}</p></motion.article>)}</div></div></section>;
}

function Social() { return <section className="border-y border-line-dark bg-deep px-5 py-20 text-hero md:px-10"><a href={INSTAGRAM} target="_blank" rel="noreferrer" className="group mx-auto grid max-w-[1600px] gap-8 md:grid-cols-[auto_1fr_auto] md:items-center"><Instagram className="text-gold" size={28}/><div><span className="font-meta text-[10px] uppercase tracking-[.2em] text-copy-dark">Follow the work</span><h2 className="mt-2 font-display text-[clamp(2.6rem,6vw,6rem)] leading-none">@jr_bixroofing</h2></div><ArrowRight className="text-gold transition-transform duration-500 group-hover:translate-x-3" size={34}/></a></section> }

function Footer() { return <><section id="contact" className="bg-deep px-5 py-28 text-center text-hero md:px-10 md:py-40"><Reveal><div className="eyebrow justify-center text-gold"><span/>Your home deserves better</div><h2 className="mx-auto mt-7 max-w-6xl font-display text-[clamp(3.6rem,9vw,9rem)] leading-[.88]">READY FOR A<br/><em>BETTER ROOF?</em></h2><p className="mx-auto mt-7 max-w-xl text-copy-dark">Get in touch with JR BIX Roofing for your free estimate in Clarksville, TN.</p><a href={`tel:${PHONE}`} className="cta-primary mx-auto mt-9 w-fit"><Phone size={16}/>Call now for your free estimate<ArrowRight size={17}/></a></Reveal></section><footer className="bg-footer px-5 pb-8 pt-16 text-copy-dark md:px-10 md:pt-24"><div className="mx-auto max-w-[1600px]"><div className="grid gap-12 border-b border-line-dark pb-14 md:grid-cols-12"><div className="md:col-span-5"><div className="flex items-center gap-3 text-hero"><span className="roof-mark"/><span className="font-meta text-sm font-semibold tracking-[.14em]">JR BIX ROOFING</span></div><p className="mt-5 max-w-xs text-sm leading-6">Premium residential roofing craftsmanship for Clarksville, Tennessee and the surrounding community.</p></div><div className="md:col-span-3"><p className="footer-label">Contact</p><a href={`tel:${PHONE}`} className="mt-4 block text-hero hover:text-gold">Call for a free estimate</a><p className="mt-2">Clarksville, TN</p><a href={INSTAGRAM} target="_blank" rel="noreferrer" className="mt-2 block hover:text-gold">@jr_bixroofing</a></div><nav className="md:col-span-2" aria-label="Footer navigation"><p className="footer-label">Navigate</p>{[["Home","#home"],["Services","#services"],["About","#about"],["Our work","#work"],["Contact","#contact"]].map(([l,h])=><a key={h} href={h} className="mt-3 block hover:text-gold">{l}</a>)}</nav><div className="md:col-span-2"><p className="footer-label">Standard</p><p className="mt-4 font-display text-xl text-hero">Quality.<br/>Craftsmanship.<br/>Protection.</p></div></div><div className="flex flex-col gap-3 pt-7 font-meta text-[9px] uppercase tracking-[.17em] sm:flex-row sm:justify-between"><span>© 2026 JR BIX Roofing</span><span>Built for Clarksville</span></div></div></footer></> }

function CustomCursor() { const [state,setState]=useState({x:-100,y:-100,label:"",visible:false}); const reduced=useReducedMotion(); useEffect(()=>{if(reduced)return; const move=(e:MouseEvent)=>{const target=(e.target as HTMLElement).closest("[data-cursor], a, button") as HTMLElement|null; setState({x:e.clientX,y:e.clientY,label:target?.dataset.cursor ?? (target?"OPEN":""),visible:true})}; const leave=()=>setState(s=>({...s,visible:false})); window.addEventListener("mousemove",move); document.documentElement.addEventListener("mouseleave",leave); return()=>{window.removeEventListener("mousemove",move);document.documentElement.removeEventListener("mouseleave",leave)}},[reduced]); if(reduced)return null; return <motion.div aria-hidden className={`custom-cursor ${state.label?"is-active":""}`} animate={{x:state.x,y:state.y,opacity:state.visible?1:0}} transition={{type:"spring",stiffness:500,damping:38,mass:.35}}>{state.label&&<span>{state.label}</span>}</motion.div> }

export function RoofingExperience() {
  const [ready,setReady]=useState(false); useSmoothScroll();
  return <><AnimatePresence>{!ready&&<Preloader onDone={()=>setReady(true)}/>}</AnimatePresence><Header ready={ready}/><main><Hero ready={ready}/><Intro/><Services/><Showcase/><Why/><BeforeAfter/><Story/><Process/><Social/><Footer/></main><CustomCursor/></>;
}