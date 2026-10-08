import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './components/Logo';
import {
  ArrowUpRight,
  ArrowRight,
  Building2,
  Armchair,
  BookOpen,
  Users,
  Mic,
  Heart,
  X,
  Check,
  Calendar,
  Layers,
  Sparkles,
  Mail,
  ChevronRight,
  Maximize2,
  Camera,
  Upload
} from 'lucide-react';

// Image assets reflecting Crystal Kizor's authentic projects, furniture, craftsmanship, and portraits
const IMAGES = {
  heroPortrait: '/crystal-kizor-portrait.png',
  aboutPortrait: '/crystal-kizor-portrait.png',
  speakingPortrait: '/crystal-kizor-portrait.png',
  rammedEarthVilla: '/src/assets/images/rammed_earth_courtyard_villa_1791468882665.jpg',
  briseSoleilPavilion: '/src/assets/images/studio_coka_architecture_1791464106675.jpg',
  tropicalAlmond: '/src/assets/images/tropical_almond_residence_1791468904090.jpg',
  minimalistInterior: '/src/assets/images/curated_minimalist_interior_1791468914005.jpg',
  furniture: '/src/assets/images/elevated_furniture_design_1791464119952.jpg',
  workshop: '/src/assets/images/tea_architect_workshop_1791464131332.jpg',
  communityPavilion: '/src/assets/images/community_craft_heritage_pavilion_1791468892935.jpg',
  texture: '/src/assets/images/architectural_craft_texture_1791464149261.jpg',
};

interface Initiative {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  fullBio: string;
  image: string;
  focus: string[];
  metrics: string;
  ctaText: string;
  ctaType: 'coka' | 'elevated' | 'tea' | 'ako' | 'speaking' | 'faith';
}

const ECOSYSTEM: Initiative[] = [
  {
    id: 'coka',
    name: 'Studio COKA',
    subtitle: 'Architecture, Interior Design & Construction',
    category: 'Spatial Practice',
    description: 'A full-service architectural atelier and construction practice pioneering climate-conscious residential retreats, organic interiors, and civic sanctuaries rooted in contemporary African spatial syntax.',
    fullBio: 'Studio COKA unites vernacular West African construction logic with refined modern engineering. From rammed earth villas and cantilevers with natural shade canopies to fluted oak acoustic interiors, every space is sculpted for sensory tranquility and low-embodied-carbon performance.',
    image: IMAGES.rammedEarthVilla,
    focus: ['Rammed Earth Architecture', 'Biophilic Residential Design', 'Bespoke Turnkey Delivery'],
    metrics: '14+ Completed & In-Progress Projects',
    ctaText: 'Commission Studio COKA',
    ctaType: 'coka'
  },
  {
    id: 'elevated',
    name: 'ELEvated',
    subtitle: 'Furniture & Product Design',
    category: 'Tactile Atelier',
    description: 'A bespoke furniture and collectible design studio celebrating indigenous West African hardwoods, sand-cast bronze joinery, and sculptural minimalist geometry for soulful interiors.',
    fullBio: 'ELEvated creates heirloom-grade pieces crafted by master joiners and regional bronze casting artisans. Every silhouette balances organic raw textures with architectural precision, translating West African material culture into global contemporary living.',
    image: IMAGES.furniture,
    focus: ['Bespoke Furniture', 'Hand-Cast Bronze Joinery', 'Sustainable Hardwoods'],
    metrics: '6 Distinct Edition Collections',
    ctaText: 'Acquire Collection Pieces',
    ctaType: 'elevated'
  },
  {
    id: 'tea',
    name: 'The Effective Architect (TEA)',
    subtitle: 'Education, Practice Systems & Media',
    category: 'Educational Ecosystem',
    description: 'A global digital academy, masterclasses, and publication dissecting the commercial acumen, execution frameworks, and design rigor needed by forward-thinking practitioners.',
    fullBio: 'The Effective Architect bridges the gap between formal architectural academia and thriving professional enterprise. Through structured curriculum, masterclasses, and digital tools, TEA empowers thousands of architects across 42 countries to build resilient commercial studios.',
    image: IMAGES.workshop,
    focus: ['Studio Commercial Mastery', 'Project Delivery Systems', 'Global Community'],
    metrics: '35,000+ Practitioners Mentored',
    ctaText: 'Explore TEA Programs',
    ctaType: 'tea'
  },
  {
    id: 'ako',
    name: 'AKO Alliance',
    subtitle: 'Youth Empowerment & Spatial Literacy',
    category: 'Social Impact',
    description: 'A philanthropic foundation demystifying spatial design, sustainable material literacy, and vocational craft for underserved youth and emerging African creators.',
    fullBio: 'AKO Alliance believes built environments belong to all communities. We organize hands-on design camps, provide vocational apprenticeships with seasoned builders, and sponsor university scholarships for female students entering architecture and structural engineering.',
    image: IMAGES.communityPavilion,
    focus: ['Youth Apprenticeships', 'Spatial Literacy', 'Female Scholar Grants'],
    metrics: '1,200+ Youth Reached in West Africa',
    ctaText: 'Partner with AKO Alliance',
    ctaType: 'ako'
  },
  {
    id: 'speaking',
    name: 'Speaking Engagements',
    subtitle: 'Keynotes, Panels & Design Thought Leadership',
    category: 'Global Dialogue',
    description: 'High-impact keynote addresses, academic lectures, and symposium dialogues addressing tropical modernist futures, female leadership in construction, and indigenous materiality.',
    fullBio: 'Crystal Kizor delivers inspiring, actionable keynotes to global architecture biennales, corporate summits, and academic institutions including Harvard GSD, Venice Biennale satellite events, and African Property Investment summits.',
    image: IMAGES.speakingPortrait,
    focus: ['Indigenous Material Futures', 'Practice Entrepreneurship', 'African Urbanism'],
    metrics: '30+ Keynotes across 8 Countries',
    ctaText: 'Request Speaker Kit',
    ctaType: 'speaking'
  },
  {
    id: 'faith',
    name: 'Alive and Free',
    subtitle: 'Christian Youth Movement & Leadership',
    category: 'Faith & Culture',
    description: 'A transformative spiritual and cultural movement empowering young men and women to anchor creative excellence, ethical leadership, and purpose in timeless biblical truth.',
    fullBio: 'Alive and Free gathers next-generation innovators, creators, and students to discover spiritual wholeness, integrity, and community support in an increasingly hurried world. We host retreats, devotional podcasts, and local fellowships.',
    image: IMAGES.communityPavilion,
    focus: ['Spiritual Wholeness', 'Creative Excellence', 'Youth Mentorship'],
    metrics: 'Annual Gathering & Digital Community',
    ctaText: 'Connect with Alive & Free',
    ctaType: 'faith'
  }
];

interface GalleryItem {
  id: string;
  title: string;
  initiative: string;
  category: 'architecture' | 'interiors' | 'civic' | 'furniture' | 'materials';
  location: string;
  year: string;
  materials: string;
  image: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'project-1',
    title: 'The Earth Sanctuary Villa — Suite & Pool',
    initiative: 'Studio COKA',
    category: 'architecture',
    location: 'Epe, Lagos',
    year: '2025',
    materials: 'Stabilized Rammed Earth, Teak Timber, Biophilic Reflecting Pool',
    image: IMAGES.rammedEarthVilla,
    caption: 'A biophilic private residence where layered rammed earth walls and open timber eaves dissolve boundaries between living quarters and the tropical garden reflecting pool.'
  },
  {
    id: 'project-2',
    title: 'The Cantilevered Almond Villa',
    initiative: 'Studio COKA',
    category: 'architecture',
    location: 'Ikoyi, Lagos',
    year: '2024',
    materials: 'Cantilevered Slabs, Reclaimed Clay Brick, Tropical Almond Tree Canopy',
    image: IMAGES.tropicalAlmond,
    caption: 'A modern tropical residence featuring floating horizontal planes, deep overhangs, and a preserved mature almond tree providing passive microclimatic cooling.'
  },
  {
    id: 'project-3',
    title: 'The Bioclimatic Brise-Soleil Pavilion',
    initiative: 'Studio COKA',
    category: 'architecture',
    location: 'Abuja, Nigeria',
    year: '2024',
    materials: 'Rammed Earth, Teak Timber Brise-Soleil, Courtyard Water Basin',
    image: IMAGES.briseSoleilPavilion,
    caption: 'A sustainable architectural pavilion balancing deep timber solar louvers, monolithic rammed earth masses, and cross-ventilating tropical gardens.'
  },
  {
    id: 'project-4',
    title: 'Curated Fluted Oak Salon & Lounge',
    initiative: 'Studio COKA',
    category: 'interiors',
    location: 'Victoria Island, Lagos',
    year: '2025',
    materials: 'Fluted White Oak, Bouclé Linen, Travertine, Brushed Brass',
    image: IMAGES.minimalistInterior,
    caption: 'An organic architectural living environment by Studio COKA structured around a curving fluted timber acoustic divider, bespoke curved sofas, and filtered daylight.'
  },
  {
    id: 'project-5',
    title: 'Community Craft & Heritage Pavilion',
    initiative: 'AKO Alliance',
    category: 'civic',
    location: 'Ogun State, Nigeria',
    year: '2025',
    materials: 'Rammed Earth, Woven Thatch & Timber Trusses, Perforated Clay Jali',
    image: IMAGES.communityPavilion,
    caption: 'Commissioned under AKO Alliance, a self-ventilating civic pavilion uniting indigenous rammed earth construction with community weaving craft.'
  },
  {
    id: 'project-6',
    title: 'Koba Lounge Chair (Edition 03)',
    initiative: 'ELEvated',
    category: 'furniture',
    location: 'ELEvated Atelier',
    year: '2025',
    materials: 'West African Walnut, Cast Bronze Joinery',
    image: IMAGES.furniture,
    caption: 'Sculptural low-slung seating exploring the intersection of raw hand-planed timber grains and molten bronze joints.'
  },
  {
    id: 'project-7',
    title: 'Perforated Terracotta Screen & Solarium',
    initiative: 'Studio COKA',
    category: 'materials',
    location: 'Abuja, Nigeria',
    year: '2024',
    materials: 'Locally Fired Terracotta Jali, Sandstone Screed',
    image: IMAGES.texture,
    caption: 'Tactile solar shading screen engineered to temper tropical heat while painting kinetic shadow geometries across polished floors.'
  },
  {
    id: 'project-8',
    title: 'The Atelier Drafting Suite & Material Archive',
    initiative: 'The Effective Architect',
    category: 'materials',
    location: 'Research Studio, Lagos',
    year: '2025',
    materials: 'Laterite Specimen Blocks, Terrazzo, Brass Rule, Technical Vellum',
    image: IMAGES.workshop,
    caption: 'Curated studio research bench examining raw earthen material samples alongside precise technical construction drawings and TEA practice systems.'
  }
];

export default function App() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [portraitSrc, setPortraitSrc] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ck_custom_portrait');
      if (saved) return saved;
    }
    return '/crystal-kizor-portrait.png';
  });

  const handlePortraitFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setPortraitSrc(dataUrl);
      try {
        localStorage.setItem('ck_custom_portrait', dataUrl);
      } catch {
        // storage quota exceeded if large image
      }

      try {
        await fetch('/api/upload-portrait', {
          method: 'POST',
          headers: { 'Content-Type': file.type },
          body: file,
        });
      } catch {
        // silent
      }
    };
    reader.readAsDataURL(file);
  };

  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<'all' | 'architecture' | 'interiors' | 'civic' | 'furniture' | 'materials'>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState('Studio COKA — Architecture Project');
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Bind ecosystem cards to dynamic portrait
  const displayEcosystem = ECOSYSTEM.map(init => {
    if (init.id === 'speaking') {
      return { ...init, image: portraitSrc };
    }
    return init;
  });

  // Form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    budgetOrTimeline: '',
    message: ''
  });

  const handleOpenEnquiry = (type?: string) => {
    if (type) setEnquiryType(type);
    setIsEnquiryOpen(true);
    setEnquirySuccess(false);
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySuccess(true);
    setTimeout(() => {
      // Keep message for 4 seconds
    }, 4000);
  };

  const filteredGallery = activeGalleryFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeGalleryFilter);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedInitiative(null);
        setLightboxItem(null);
        setIsEnquiryOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2C2A29] flex flex-col font-sans selection:bg-[#A85A32]/15 selection:text-[#3E2723]">
      
      {/* 1. TOP BAR / NAVIGATION (Following 3-Zone Top Bar Contract) */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E8E0D5]/70 transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Zone 1: Brand Wordmark / Logo */}
          <a
            href="#"
            className="group flex items-center py-1 text-[#2C2A29] hover:opacity-80 transition-opacity"
            title="Crystal Kizor"
          >
            <Logo className="h-10 sm:h-12 w-auto" color="#2C2A29" />
          </a>

          {/* Zone 2: 4-5 Clean Text Nav Links with subtle hover underline */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6E6259]">
            <a href="#ethos" className="hover:text-[#2C2A29] transition-colors py-1">
              Ethos
            </a>
            <a href="#ecosystem" className="hover:text-[#2C2A29] transition-colors py-1">
              Ecosystem
            </a>
            <a href="#works" className="hover:text-[#2C2A29] transition-colors py-1">
              Works & Craft
            </a>
            <a href="#pathways" className="hover:text-[#2C2A29] transition-colors py-1">
              Pathways
            </a>
            <a href="#about" className="hover:text-[#2C2A29] transition-colors py-1">
              About
            </a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOpenEnquiry('Studio COKA — Architectural Inquiry')}
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FBF9F5] bg-[#3E2723] hover:bg-[#A85A32] rounded-md transition-all shadow-sm active:scale-95 whitespace-nowrap"
            >
              Enquire
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 2. HERO SECTION: Split-Screen Minimalist Editorial Layout */}
        <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Editorial Typography & Intent */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                
                {/* Role text kicker with typographic separator (NO PILL BOXES) */}
                <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wider uppercase text-[#A85A32] mb-5">
                  <span>Principal, Studio COKA</span>
                  <span aria-hidden="true" className="text-[#A85A32]/40">·</span>
                  <span>Spatial Researcher</span>
                  <span aria-hidden="true" className="text-[#A85A32]/40">·</span>
                  <span>Founder, TEA</span>
                </div>

                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-[#2C2A29] leading-[1.05] tracking-tight mb-7">
                  Crystal <span className="italic font-light">Kizor</span>
                </h1>

                <p className="text-lg lg:text-xl text-[#5C534D] leading-relaxed max-w-2xl mb-10 font-light">
                  Architect, designer, entrepreneur, speaker, researcher, and creator. 
                  Unifying an ecosystem that merges indigenous African materials, climate resilience, 
                  and contemporary spatial elegance into everyday human life.
                </p>

                {/* Primary Actions */}
                <div className="flex flex-wrap items-center gap-4 mb-14">
                  <a
                    href="#ecosystem"
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-[#FBF9F5] bg-[#3E2723] hover:bg-[#A85A32] rounded-md transition-all shadow-sm group"
                  >
                    <span>Explore Ecosystem</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>

                  <button
                    onClick={() => handleOpenEnquiry('Speaking & Keynote Engagement')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-[#2C2A29] bg-[#F4EFE6] hover:bg-[#ECE4D8] border border-[#E0D6C8] rounded-md transition-all"
                  >
                    <span>Book Engagement</span>
                    <ArrowUpRight className="w-4 h-4 text-[#A85A32]" />
                  </button>
                </div>

                {/* Key Rigorous Proof Metrics (Tabular Numerals, Unboxed Clean Spacing) */}
                <div className="pt-8 border-t border-[#E8E0D5] grid grid-cols-3 gap-6 max-w-lg">
                  <div>
                    <div className="font-serif text-3xl font-normal text-[#2C2A29] tabular-nums">
                      14+
                    </div>
                    <div className="text-xs text-[#7A6E65] mt-1 font-medium">
                      Built & Concept Spaces
                    </div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl font-normal text-[#2C2A29] tabular-nums">
                      35k+
                    </div>
                    <div className="text-xs text-[#7A6E65] mt-1 font-medium">
                      Designers Mentored
                    </div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl font-normal text-[#2C2A29] tabular-nums">
                      06
                    </div>
                    <div className="text-xs text-[#7A6E65] mt-1 font-medium">
                      Unified Brands
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Editorial Portrait Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  
                  {/* Subtle warm stone border backplate */}
                  <div className="relative bg-[#F4EFE6] p-3 sm:p-4 rounded-xl border border-[#E2D8CA] shadow-sm">
                    <div
                      className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#EAE2D5] group/portrait"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (e.dataTransfer.files?.[0]) {
                          handlePortraitFile(e.dataTransfer.files[0]);
                        }
                      }}
                    >
                      <img
                        src={portraitSrc}
                        alt="Crystal Kizor sitting in her architectural design studio"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700 ease-out"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/crystal-kizor-portrait.png';
                        }}
                      />
                      
                      {/* Quiet vignette scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A29]/70 via-transparent to-transparent opacity-80 pointer-events-none" />

                      {/* Replace / Original Photo Action */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover/portrait:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          title="Use exact original photo"
                          className="px-2.5 py-1.5 text-[11px] font-medium bg-[#2C2A29]/85 hover:bg-[#2C2A29] text-[#FBF9F5] rounded-md backdrop-blur-xs flex items-center gap-1.5 shadow-sm transition-all"
                        >
                          <Camera className="w-3.5 h-3.5 text-[#E5DDD0]" />
                          <span>Use Original Photo</span>
                        </button>
                      </div>

                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handlePortraitFile(e.target.files[0]);
                          }
                        }}
                      />
                      
                      {/* In-image caption */}
                      <div className="absolute bottom-4 left-4 right-4 text-[#FBF9F5] pointer-events-none">
                        <p className="font-serif text-lg font-light tracking-wide italic">
                          "Form rooted in origin."
                        </p>
                        <p className="text-[11px] text-[#FBF9F5]/80 uppercase tracking-widest mt-0.5">
                          Crystal Kizor · Studio Atelier
                        </p>
                      </div>
                    </div>

                    <div className="mt-3.5 px-2 flex items-center justify-between text-xs text-[#7A6E65]">
                      <span>Lagos & Global Practice</span>
                      <span aria-hidden="true">·</span>
                      <span>African Modernism</span>
                      <span aria-hidden="true">·</span>
                      <span>Sustainable Craft</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. BRAND ETHOS & VISION BAR: Centered Quote Banner */}
        <section id="ethos" className="py-20 bg-[#F4EFE6] border-y border-[#E5DDD0]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            
            <p className="text-xs uppercase tracking-widest text-[#A85A32] font-semibold mb-6">
              Founding Philosophy
            </p>

            <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2C2A29] leading-tight tracking-tight mb-8">
              “Merging African context, materials, and sustainable design into human life.”
            </blockquote>

            <p className="text-sm text-[#6E6259] max-w-xl mx-auto leading-relaxed mb-10">
              Architecture is not an imposed monument; it is a living dialogue between local soils, 
              generational craft, and climate intelligence. Every initiative within this ecosystem 
              serves that single enduring truth.
            </p>

            {/* 3 Structural Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#E0D6C8] text-left">
              <div>
                <h4 className="font-serif text-lg font-semibold text-[#2C2A29] mb-1">
                  Material Memory
                </h4>
                <p className="text-xs text-[#6E6259] leading-normal">
                  Rammed earth, harvested timber, laterite blocks, and sand-cast bronze celebrating indigenous tactile permanence.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-semibold text-[#2C2A29] mb-1">
                  Passive Climate Logic
                </h4>
                <p className="text-xs text-[#6E6259] leading-normal">
                  Tropical brise-soleil facades, natural courtyard convection, and orientation designed without reliance on artificial chill.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-semibold text-[#2C2A29] mb-1">
                  Human Dignity & Purpose
                </h4>
                <p className="text-xs text-[#6E6259] leading-normal">
                  Educating young practitioners, creating ethical artisanal jobs, and elevating public spaces where communities gather.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 4. THE MULTI-BRAND ECOSYSTEM GRID: 3-Column Bento/Card Grid */}
        <section id="ecosystem" className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#A85A32] font-semibold mb-2">
                Unified Portfolio
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#2C2A29] tracking-tight">
                The Multi-Brand Ecosystem
              </h2>
            </div>
            <p className="text-sm text-[#6E6259] max-w-md">
              Six distinct expressions of design, enterprise, education, and community — 
              each led by Crystal Kizor to influence how we build, furnish, and lead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayEcosystem.map((initiative, idx) => (
              <div
                key={initiative.id}
                className="group bg-[#F4EFE6] border border-[#E5DDD0] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#A85A32]/40 hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Image banner with quiet hover zoom */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#E7E0D3]">
                    <img
                      src={initiative.image}
                      alt={initiative.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      onError={(e) => {
                        if (initiative.id === 'speaking') {
                          (e.currentTarget as HTMLImageElement).src = '/crystal-kizor-portrait.png';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A29]/60 via-transparent to-transparent" />
                    
                    {/* Quiet category metadata on bottom of image */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-medium">
                      <span>{initiative.category}</span>
                      <span className="font-serif italic font-light">0{idx + 1}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-semibold text-[#2C2A29] mb-1 group-hover:text-[#A85A32] transition-colors">
                      {initiative.name}
                    </h3>

                    <p className="text-xs font-medium text-[#A85A32] mb-3">
                      {initiative.subtitle}
                    </p>

                    <p className="text-sm text-[#5C534D] leading-relaxed mb-6 font-light">
                      {initiative.description}
                    </p>

                    {/* Unboxed Focus Tags with typographic bullet separator */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#7A6E65] pt-4 border-t border-[#E8E0D5]">
                      {initiative.focus.map((f, i) => (
                        <React.Fragment key={f}>
                          <span>{f}</span>
                          {i < initiative.focus.length - 1 && (
                            <span aria-hidden="true" className="text-[#A85A32]/50">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-[#7A6E65] font-medium">
                    {initiative.metrics}
                  </span>

                  <button
                    onClick={() => setSelectedInitiative(initiative)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3E2723] group-hover:text-[#A85A32] transition-colors"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* 5. ARCHITECTURAL WORKS & CRAFT GALLERY */}
        <section id="works" className="py-24 bg-[#F4EFE6]/60 border-t border-[#E8E0D5]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#A85A32] font-semibold mb-2">
                  Materiality & Realization
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#2C2A29] tracking-tight">
                  Selected Works & Craft Gallery
                </h2>
              </div>

              {/* Interactive Segmented Filter Tabs (functional controls) */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EAE2D5] rounded-lg">
                {[
                  { key: 'all', label: 'All Works' },
                  { key: 'architecture', label: 'Architecture' },
                  { key: 'interiors', label: 'Interiors' },
                  { key: 'civic', label: 'Civic & Heritage' },
                  { key: 'furniture', label: 'Furniture Craft' },
                  { key: 'materials', label: 'Material Studies' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveGalleryFilter(tab.key as any)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                      activeGalleryFilter === tab.key
                        ? 'bg-[#FBF9F5] text-[#2C2A29] shadow-xs'
                        : 'text-[#6E6259] hover:text-[#2C2A29]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxItem(item)}
                  className="group relative cursor-pointer bg-[#FBF9F5] border border-[#E5DDD0] rounded-xl overflow-hidden hover:border-[#A85A32]/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#ECE4D8]">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    />
                    
                    {/* Lightbox hint icon */}
                    <div className="absolute top-4 right-4 p-2 bg-[#2C2A29]/60 backdrop-blur-xs rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#FBF9F5] drop-shadow-md">
                      <span className="font-medium">{item.initiative}</span>
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="font-serif text-2xl font-semibold text-[#2C2A29] group-hover:text-[#A85A32] transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-xs text-[#7A6E65] font-mono tabular-nums">
                        {item.year}
                      </span>
                    </div>

                    <p className="text-sm text-[#5C534D] leading-relaxed mb-4 font-light">
                      {item.caption}
                    </p>

                    <div className="text-xs text-[#7A6E65] pt-3 border-t border-[#E8E0D5] flex items-center gap-2">
                      <span className="font-medium text-[#2C2A29]">Materiality:</span>
                      <span>{item.materials}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 6. TAILORED VISITOR PATHWAYS (CTA Section) */}
        <section id="pathways" className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-widest text-[#A85A32] font-semibold mb-2">
              Collaborate & Engage
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#2C2A29] tracking-tight mb-4">
              Tailored Visitor Pathways
            </h2>
            <p className="text-sm text-[#6E6259]">
              Connect directly with the branch of Crystal Kizor’s work aligned with your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pathway 1: For Clients & Developers */}
            <div className="bg-[#F4EFE6] border border-[#E5DDD0] rounded-xl p-8 flex flex-col justify-between hover:border-[#A85A32]/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#ECE4D8] text-[#3E2723] flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6 text-[#A85A32]" />
                </div>

                <p className="text-xs uppercase tracking-wider text-[#A85A32] font-semibold mb-2">
                  For Developers & Private Clients
                </p>

                <h3 className="font-serif text-2xl font-semibold text-[#2C2A29] mb-3">
                  Build with Studio COKA
                </h3>

                <p className="text-sm text-[#5C534D] leading-relaxed mb-6 font-light">
                  Commission architectural design, master planning, climate-responsive residential retreats, 
                  or turnkey execution engineered with indigenous materials and modern comfort.
                </p>

                <ul className="text-xs text-[#6E6259] space-y-2 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A85A32]" />
                    <span>Residential Sanctuaries & Private Estates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A85A32]" />
                    <span>Eco-Hospitality & Boutique Resorts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A85A32]" />
                    <span>Turnkey Sustainable Construction</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenEnquiry('Studio COKA — Architecture Commission')}
                className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#FBF9F5] bg-[#3E2723] hover:bg-[#A85A32] rounded-md transition-all text-center"
              >
                Start Architectural Inquiry
              </button>
            </div>

            {/* Pathway 2: For Event Organizers & Media */}
            <div className="bg-[#F4EFE6] border border-[#E5DDD0] rounded-xl p-8 flex flex-col justify-between hover:border-[#A85A32]/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#ECE4D8] text-[#3E2723] flex items-center justify-center mb-6">
                  <Mic className="w-6 h-6 text-[#A85A32]" />
                </div>

                <p className="text-xs uppercase tracking-wider text-[#A85A32] font-semibold mb-2">
                  For Summits & Institutions
                </p>

                <h3 className="font-serif text-2xl font-semibold text-[#2C2A29] mb-3">
                  Book Crystal for Keynotes
                </h3>

                <p className="text-sm text-[#5C534D] leading-relaxed mb-6 font-light">
                  Book Crystal Kizor for international conferences, university design lectures, 
                  urban symposiums, panel discussions, or executive architectural advisory sessions.
                </p>

                <ul className="text-xs text-[#6E6259] space-y-2 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A85A32]" />
                    <span>Global Keynotes on African Modernism</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A85A32]" />
                    <span>Practice Entrepreneurship & Systems</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A85A32]" />
                    <span>Jury Member for Design Competitions</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenEnquiry('Speaking & Keynote Request')}
                className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#FBF9F5] bg-[#3E2723] hover:bg-[#A85A32] rounded-md transition-all text-center"
              >
                Request Speaker Kit
              </button>
            </div>

            {/* Pathway 3: For Practitioners & Designers */}
            <div className="bg-[#F4EFE6] border border-[#E5DDD0] rounded-xl p-8 flex flex-col justify-between hover:border-[#A85A32]/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#ECE4D8] text-[#3E2723] flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6 text-[#A85A32]" />
                </div>

                <p className="text-xs uppercase tracking-wider text-[#A85A32] font-semibold mb-2">
                  For Architects & Students
                </p>

                <h3 className="font-serif text-2xl font-semibold text-[#2C2A29] mb-3">
                  Learn with TEA (The Effective Architect)
                </h3>

                <p className="text-sm text-[#5C534D] leading-relaxed mb-6 font-light">
                  Access rigorous masterclasses, commercial contract templates, fee estimation models, 
                  and the international community transforming how modern studios operate.
                </p>

                <ul className="text-xs text-[#6E6259] space-y-2 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A85A32]" />
                    <span>Studio Business Mastery Masterclasses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A85A32]" />
                    <span>Contract & Proposal Systems</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A85A32]" />
                    <span>Private Practitioner Fellowship</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenEnquiry('The Effective Architect — Mentorship Enrollment')}
                className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#FBF9F5] bg-[#3E2723] hover:bg-[#A85A32] rounded-md transition-all text-center"
              >
                Join TEA Academy
              </button>
            </div>

          </div>

        </section>

        {/* ABOUT & BIOGRAPHY SECTION */}
        <section id="about" className="py-20 bg-[#F4EFE6] border-t border-[#E8E0D5]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-4">
                <div className="aspect-[4/5] rounded-xl overflow-hidden border border-[#E0D6C8] bg-[#EAE2D5]">
                  <img
                    src={portraitSrc}
                    alt="Crystal Kizor Portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/crystal-kizor-portrait.png';
                    }}
                  />
                </div>
              </div>

              <div className="lg:col-span-8">
                <p className="text-xs uppercase tracking-widest text-[#A85A32] font-semibold mb-2">
                  About Crystal Kizor
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2C2A29] tracking-tight mb-6">
                  Architect, Founder & Cultural Spatial Advocate
                </h2>

                <div className="space-y-4 text-base text-[#5C534D] font-light leading-relaxed">
                  <p>
                    Crystal Kizor is a registered architect, founder, and design educator. As Principal at Studio COKA, 
                    she champions low-embodied-carbon construction and celebrates African craftsmanship through 
                    contemporary architectural language. Her work addresses urban tropical heat islands, 
                    passive air circulation, and the revival of stabilized earth as a premier structural medium.
                  </p>
                  <p>
                    Recognizing that architectural impact extends beyond physical structures, she created ELEvated to translate 
                    material research into collectible furniture, while founding The Effective Architect (TEA) to mentor 
                    thousands of architects globally. Through AKO Alliance and Alive & Free, she directs her leadership 
                    into youth spatial literacy, community scholarships, and faith-centered values.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-[#2C2A29]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#A85A32]" />
                    <span className="font-medium">Studio COKA Principal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#A85A32]" />
                    <span className="font-medium">West Africa & Global Advisory</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#A85A32]" />
                    <span className="font-medium">Sustainable Vernacular Research</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* 7. FOOTER: Clean Copyright Notice with Social Links */}
      <footer className="bg-[#2C2A29] text-[#E5DDD0] pt-16 pb-12 border-t border-[#3E2723]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3E2723]/60">
            
            {/* Brand column */}
            <div className="md:col-span-5">
              <a href="#" className="inline-block mb-3 hover:opacity-85 transition-opacity" title="Crystal Kizor">
                <Logo className="h-10 sm:h-12 w-auto" color="#FBF9F5" />
              </a>
              <p className="text-sm text-[#B8AEA3] leading-relaxed max-w-sm mb-6 font-light">
                Merging African context, materials, and sustainable design into human life. 
                Studio COKA · ELEvated · TEA · AKO Alliance · Alive & Free.
              </p>
              <p className="text-xs text-[#8E8479]">
                Studio headquarters: Lagos, Nigeria · Project commissions worldwide.
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3">
              <h4 className="text-xs uppercase tracking-widest text-[#A85A32] font-semibold mb-4">
                Ecosystem
              </h4>
              <ul className="text-sm space-y-2.5 text-[#B8AEA3]">
                <li><a href="#ecosystem" className="hover:text-[#FBF9F5] transition-colors">Studio COKA</a></li>
                <li><a href="#ecosystem" className="hover:text-[#FBF9F5] transition-colors">ELEvated Furniture</a></li>
                <li><a href="#ecosystem" className="hover:text-[#FBF9F5] transition-colors">The Effective Architect</a></li>
                <li><a href="#ecosystem" className="hover:text-[#FBF9F5] transition-colors">AKO Alliance</a></li>
                <li><a href="#ecosystem" className="hover:text-[#FBF9F5] transition-colors">Alive and Free Movement</a></li>
              </ul>
            </div>

            {/* Social & Enquire */}
            <div className="md:col-span-4">
              <h4 className="text-xs uppercase tracking-widest text-[#A85A32] font-semibold mb-4">
                Connect & Dialogue
              </h4>
              <p className="text-sm text-[#B8AEA3] mb-4 font-light">
                For architectural commissions, keynote bookings, or studio press inquiries:
              </p>
              
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs bg-[#3E2723] hover:bg-[#A85A32] text-[#FBF9F5] rounded-md transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs bg-[#3E2723] hover:bg-[#A85A32] text-[#FBF9F5] rounded-md transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs bg-[#3E2723] hover:bg-[#A85A32] text-[#FBF9F5] rounded-md transition-colors"
                >
                  Substack
                </a>
              </div>

              <button
                onClick={() => handleOpenEnquiry()}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#A85A32] hover:text-[#C57448] transition-colors"
              >
                <span>Direct Inquiries Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E8479] gap-4">
            <div>
              © 2026 Crystal Kizor. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-[#FBF9F5] transition-colors">
                Back to Top ↑
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* MODAL 1: INITIATIVE DETAIL MODAL */}
      {selectedInitiative && (
        <div className="fixed inset-0 z-50 bg-[#2C2A29]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#FBF9F5] text-[#2C2A29] max-w-2xl w-full rounded-xl border border-[#E5DDD0] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="relative aspect-[16/9] overflow-hidden bg-[#ECE4D8]">
              <img
                src={selectedInitiative.image}
                alt={selectedInitiative.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  if (selectedInitiative.id === 'speaking') {
                    (e.currentTarget as HTMLImageElement).src = '/crystal-kizor-portrait.png';
                  }
                }}
              />
              <button
                onClick={() => setSelectedInitiative(null)}
                className="absolute top-4 right-4 p-2 bg-[#2C2A29]/70 hover:bg-[#2C2A29] text-white rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-4 text-xs font-medium text-white px-2.5 py-1 bg-[#2C2A29]/70 backdrop-blur-xs rounded-md">
                {selectedInitiative.category}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="font-serif text-3xl font-semibold text-[#2C2A29] mb-1">
                {selectedInitiative.name}
              </h3>
              <p className="text-xs font-semibold text-[#A85A32] uppercase tracking-wider mb-4">
                {selectedInitiative.subtitle}
              </p>

              <p className="text-sm text-[#5C534D] leading-relaxed mb-6 font-light">
                {selectedInitiative.fullBio}
              </p>

              <div className="mb-6 pt-4 border-t border-[#E8E0D5]">
                <h4 className="text-xs uppercase tracking-wider text-[#7A6E65] font-semibold mb-2">
                  Core Competencies & Focus
                </h4>
                <div className="flex flex-wrap gap-2 text-xs text-[#2C2A29]">
                  {selectedInitiative.focus.map((f, i) => (
                    <span key={f} className="bg-[#F4EFE6] px-3 py-1.5 rounded-md border border-[#E5DDD0]">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#E8E0D5]">
                <span className="text-xs text-[#7A6E65] font-medium">
                  {selectedInitiative.metrics}
                </span>

                <button
                  onClick={() => {
                    const initiativeName = selectedInitiative.name;
                    setSelectedInitiative(null);
                    handleOpenEnquiry(`${initiativeName} — Engagement`);
                  }}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FBF9F5] bg-[#3E2723] hover:bg-[#A85A32] rounded-md transition-all shadow-sm"
                >
                  {selectedInitiative.ctaText}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: LIGHTBOX VIEWER */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-[#1A1817]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
          <div className="max-w-4xl w-full flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between text-white pb-4 border-b border-white/10">
              <div>
                <h3 className="font-serif text-2xl font-light text-[#FBF9F5]">
                  {lightboxItem.title}
                </h3>
                <p className="text-xs text-[#B8AEA3] mt-0.5">
                  {lightboxItem.initiative} · {lightboxItem.location} ({lightboxItem.year})
                </p>
              </div>
              <button
                onClick={() => setLightboxItem(null)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="my-4 relative overflow-hidden rounded-lg bg-black flex items-center justify-center">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            <div className="text-xs text-[#E5DDD0] bg-white/5 p-4 rounded-lg flex flex-col sm:flex-row justify-between gap-2">
              <p className="max-w-xl font-light leading-relaxed">
                {lightboxItem.caption}
              </p>
              <div className="text-right sm:text-right shrink-0">
                <span className="text-[#A85A32] font-semibold">Materials: </span>
                <span className="text-white/80">{lightboxItem.materials}</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 3: INTERACTIVE ENQUIRY DRAWER / MODAL */}
      {isEnquiryOpen && (
        <div className="fixed inset-0 z-50 bg-[#2C2A29]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#FBF9F5] text-[#2C2A29] max-w-xl w-full rounded-xl border border-[#E5DDD0] shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E0D5] mb-6">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C2A29]">
                  Initiate Engagement
                </h3>
                <p className="text-xs text-[#7A6E65] mt-1">
                  Connect with Crystal Kizor's studio and practice directors.
                </p>
              </div>
              <button
                onClick={() => setIsEnquiryOpen(false)}
                className="p-2 text-[#7A6E65] hover:text-[#2C2A29] rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {enquirySuccess ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 bg-[#A85A32]/10 text-[#A85A32] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl font-semibold text-[#2C2A29] mb-2">
                  Inquiry Received
                </h4>
                <p className="text-sm text-[#5C534D] max-w-md mx-auto leading-relaxed mb-6">
                  Thank you for reaching out regarding <span className="font-semibold">{enquiryType}</span>. 
                  Our studio executive will review your parameters and respond within 48 business hours.
                </p>
                <button
                  onClick={() => setIsEnquiryOpen(false)}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FBF9F5] bg-[#3E2723] hover:bg-[#A85A32] rounded-md transition-colors"
                >
                  Return to Ecosystem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitEnquiry} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-semibold text-[#6E6259] uppercase tracking-wider mb-1.5">
                    Select Pathway / Initiative
                  </label>
                  <select
                    value={enquiryType}
                    onChange={(e) => setEnquiryType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F4EFE6] border border-[#DED6C9] rounded-md focus:outline-hidden focus:border-[#A85A32] text-[#2C2A29]"
                  >
                    <option value="Studio COKA — Architecture Project">Studio COKA — Architecture Project</option>
                    <option value="ELEvated — Furniture Collection Acquisition">ELEvated — Furniture Acquisition</option>
                    <option value="Speaking & Keynote Engagement">Speaking & Keynote Engagement</option>
                    <option value="The Effective Architect (TEA) — Mentorship / Academy">The Effective Architect (TEA)</option>
                    <option value="AKO Alliance — Partnership / Philanthropy">AKO Alliance — Philanthropic Partnership</option>
                    <option value="Alive and Free — Youth Movement Dialogue">Alive and Free — Youth Movement</option>
                    <option value="Press, Research & General Inquiry">Press, Research & General Inquiry</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6E6259] uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Dr. Amina Bello"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F4EFE6] border border-[#DED6C9] rounded-md focus:outline-hidden focus:border-[#A85A32] text-[#2C2A29]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6E6259] uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="amina@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F4EFE6] border border-[#DED6C9] rounded-md focus:outline-hidden focus:border-[#A85A32] text-[#2C2A29]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6E6259] uppercase tracking-wider mb-1.5">
                      Organization / Brand
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Urban Habitat Trust"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F4EFE6] border border-[#DED6C9] rounded-md focus:outline-hidden focus:border-[#A85A32] text-[#2C2A29]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6E6259] uppercase tracking-wider mb-1.5">
                      Timeline or Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Q4 2026 / Lagos"
                      value={formData.budgetOrTimeline}
                      onChange={(e) => setFormData({ ...formData, budgetOrTimeline: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F4EFE6] border border-[#DED6C9] rounded-md focus:outline-hidden focus:border-[#A85A32] text-[#2C2A29]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6E6259] uppercase tracking-wider mb-1.5">
                    Brief Project Details or Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Outline your scope, vision, site parameters, or event agenda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F4EFE6] border border-[#DED6C9] rounded-md focus:outline-hidden focus:border-[#A85A32] text-[#2C2A29] resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEnquiryOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-[#7A6E65] hover:text-[#2C2A29]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FBF9F5] bg-[#3E2723] hover:bg-[#A85A32] rounded-md transition-all shadow-sm"
                  >
                    Submit Inquiry
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
