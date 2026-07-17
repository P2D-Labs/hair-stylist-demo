/**
 * ============================================================================
 *  GLOBAL SITE CONTENT — every piece of copy, nav link, service, image and
 *  contact detail lives here. Edit this file to rebrand or re-word the site
 *  without touching any component or page.
 * ============================================================================
 */

export const site = {
  brand: {
    name: "Epoch",
    fullName: "Epoch Hair Studio",
    tagline: "A new chapter, cut for you.",
    mark: "E", // single-letter mark used in the logo badge
  },

  nav: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contact", path: "/contact" },
  ],

  contact: {
    phone: "+94 76 162 2337",
    email: "hello@epochhair.studio",
    address: "42 Horton Place, Colombo 07, Sri Lanka",
    hours: [
      { day: "Tuesday – Friday", time: "9:00 AM – 7:00 PM" },
      { day: "Saturday", time: "9:00 AM – 6:00 PM" },
      { day: "Sunday", time: "10:00 AM – 4:00 PM" },
      { day: "Monday", time: "Closed" },
    ],
    mapEmbed:
      "https://www.google.com/maps?q=42+Horton+Place,+Colombo+00700,+Sri+Lanka&z=17&output=embed",
    social: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Facebook", href: "https://facebook.com" },
      { label: "TikTok", href: "https://tiktok.com" },
    ],
    whatsappMessage:
      "Hi Epoch! I'd like to book an appointment — could you help me find a time that works?",
  },

  hero: {
    eyebrow: "Colombo's atelier for hair",
    headline: "Every era begins\nwith a new cut.",
    sub: "Epoch is a hair studio built around one idea — that a great cut marks time. We study your history, then shape what comes next.",
    ctaPrimary: { label: "Book an appointment", path: "/contact" },
    ctaSecondary: { label: "View our work", path: "/gallery" },
    image:
    "https://images.unsplash.com/photo-1629397685944-7073f5589754?fm=jpg&q=80&w=1920&auto=format&fit=crop"
// "https://images.unsplash.com/photo-1626379501846-0df4067b8bb9?fm=jpg&q=80&w=1920&auto=format&fit=crop"  
// "/images/interior-3d-design-concepts-house-min.jpg"
 },

  stats: [
    { value: "12", label: "Years shaping Colombo's hair" },
    { value: "4,800+", label: "Transformations delivered" },
    { value: "9", label: "Master stylists on the floor" },
    { value: "31", label: "Industry awards" },
  ],

  philosophy: {
    eyebrow: "Our philosophy",
    title: "Hair is a timeline. We help you write the next line.",
    body: "We don't believe in trends for their own sake. Every consultation starts with a conversation about where you've been and where you're headed — then we cut, color, and style toward that person, not toward a photograph on a wall.",
  },

  // Full-bleed parallax showcase on Home, between Featured Services and the gallery teaser
  parallaxFeature: {
    eyebrow: "The atelier",
    title: "Where every appointment starts with a conversation, not a chair.",
    image:
      "https://images.unsplash.com/photo-1512690459411-b9245aed614b?q=80&w=1800&auto=format&fit=crop",
  },

  // Product/brand partners strip on Home — invented placeholder names, not real brands
  partners: [
    "Maison Névé",
    "Verre & Co.",
    "Nordlys Haircare",
    "Atelier Lumen",
    "Hearth & Comb",
    "Silvertone Studio",
  ],

  // Home page — a short curated preview; full list lives on /services
  featuredServices: [
    {
      id: "cut-finish",
      title: "Cut & Finish",
      description:
        "A precision cut shaped to your face, texture, and the way you actually live in your hair.",
      price: "From LKR 6,500",
      image:
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "color",
      title: "Color & Balayage",
      description:
        "Hand-painted color, full transformations, and low-maintenance grow-out built by our colorists.",
      price: "From LKR 14,000",
      image:
        "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "treatment",
      title: "Restorative Treatment",
      description:
        "Bond-rebuilding and scalp therapies that repair what heat, color, and time take out.",
      price: "From LKR 8,000",
      image:
        "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1200&auto=format&fit=crop",
    },
  ],

  // Full-bleed video moment on /services, between the intro and the price list
  servicesFeature: {
    eyebrow: "Behind the chair",
    title: "Every service starts with a conversation, then the work begins.",
    // video: "https://assets.mixkit.co/videos/33257/33257-720.mp4",
    video: "/images/AQMdPPNN_TjC9IkFFz2A6UBe1l6gMIWIdWGypSNmbVvx1ouGxXPVFmX0hYdsiPv3vRuQErf-pCS6iWyU-jaKs8AY_vWnueo264Xi3pE.mp4",
    poster:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1800&auto=format&fit=crop",
  },

  // Full services list — grouped for /services page
  serviceGroups: [
    {
      id: "cutting",
      title: "Cutting & Styling",
      chapter: "I",
      services: [
        { name: "Signature Cut & Finish", price: "LKR 6,500", duration: "60 min" },
        { name: "Restyle Consultation & Cut", price: "LKR 9,000", duration: "90 min" },
        { name: "Blow-dry & Style", price: "LKR 4,000", duration: "45 min" },
        { name: "Special Occasion Styling", price: "LKR 7,500", duration: "60 min" },
        { name: "Men's Cut", price: "LKR 4,500", duration: "40 min" },
      ],
    },
    {
      id: "color",
      title: "Color",
      chapter: "II",
      services: [
        { name: "Full Balayage", price: "LKR 18,500", duration: "3 hr" },
        { name: "Root Touch-Up", price: "LKR 8,500", duration: "90 min" },
        { name: "Global Color", price: "LKR 14,000", duration: "2 hr" },
        { name: "Fashion / Fantasy Color", price: "from LKR 16,000", duration: "3 hr" },
        { name: "Toner & Gloss", price: "LKR 5,500", duration: "45 min" },
      ],
    },
    {
      id: "treatment",
      title: "Treatments",
      chapter: "III",
      services: [
        { name: "Bond Rebuild Treatment", price: "LKR 8,000", duration: "45 min" },
        { name: "Scalp Therapy", price: "LKR 6,000", duration: "40 min" },
        { name: "Keratin Smoothing", price: "LKR 22,000", duration: "3 hr" },
        { name: "Deep Conditioning Ritual", price: "LKR 5,000", duration: "30 min" },
      ],
    },
    {
      id: "texture",
      title: "Texture & Extensions",
      chapter: "IV",
      services: [
        { name: "Perm / Texturizing", price: "from LKR 12,000", duration: "2.5 hr" },
        { name: "Tape-In Extensions", price: "from LKR 28,000", duration: "2 hr" },
        { name: "Braiding & Updo", price: "from LKR 6,000", duration: "60 min" },
      ],
    },
  ],

  // Specialist spotlight on Home — featuring the founder
  specialistSpotlight: {
    eyebrow: "Specialist spotlight",
    quote: "I don't ask what you want cut off. I ask what you're trying to become.",
    name: "Aravinda",
    role: "Founder & Creative Director",
    bio: "Amara trained in London and Colombo before opening Epoch's first single chair in 2013. Her specialty is reading a client's history — old photos, old cuts, old versions of themselves — and shaping what comes next from it.",
    specialties: ["Consultation-led cuts", "Face-framing color", "Bridal & editorial styling"],
    image:
      "/images/452227078_17961131102789161_7448938294489291823_n.jpg"
      // "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
  },

  // Full-bleed video moment on /about, between the Timeline and Team sections
  aboutFeature: {
    eyebrow: "The craft",
    title: "Fifteen minutes with a blow-dryer can change how you carry a whole day.",
    video: "https://assets.mixkit.co/videos/45893/45893-720.mp4",
    poster:
      "https://images.unsplash.com/photo-1701977501667-20c0e38f5a9d?q=80&w=1800&auto=format&fit=crop",
  },

  team: [
    {
      name: "Aravinda",
      role: "Founder & Creative Director",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Dilshan Perera",
      role: "Master Colorist",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Nethmi Fernando",
      role: "Senior Stylist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Ravindu Silva",
      role: "Texture Specialist",
      image:
        "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=800&auto=format&fit=crop",
    },
  ],

  timeline: [
    {
      chapter: "I",
      year: "2013",
      title: "A chair, a mirror, a beginning",
      body: "Amara opens a single-chair studio in Colombo 7 with one promise: no two clients leave looking the same.",
    },
    {
      chapter: "II",
      year: "2017",
      title: "The studio finds its floor",
      body: "Epoch moves into Horton Place, expanding the team to five stylists and Colombo's first dedicated balayage bar.",
    },
    {
      chapter: "III",
      year: "2021",
      title: "Color science joins the team",
      body: "Dilshan joins as Master Colorist, bringing a formulation-first approach that becomes the studio's signature.",
    },
    {
      chapter: "IV",
      year: "2026",
      title: "A new era, still growing",
      body: "Today Epoch is a nine-person atelier, and the same conversation still opens every appointment: where are you headed?",
    },
  ],

  testimonials: [
    {
      quote:
        "I described a mood, not a haircut, and they built the whole thing around it. First salon that's ever listened that closely.",
      name: "Ishara J.",
      role: "Client since 2022",
      rating: 5,
    },
    {
      quote:
        "The color consultation alone was worth the visit. No pressure, no upsell — just a plan that actually suited my hair.",
      name: "Tharindu M.",
      role: "Client since 2020",
      rating: 5,
    },
    {
      quote:
        "Walked in after a bad box-dye job, walked out with hair I didn't know I could have. Booked my next three visits before I left.",
      name: "Naduni K.",
      role: "Client since 2024",
      rating: 5,
    },
  ],
  gallery: {
    filters: ["All", "Cut", "Color", "Bridal", "Editorial"],
    items: [
      { id: 1, category: "Cut", image: "/images/1 (1).jpg", caption: "Precision bob, textured finish" },
      { id: 2, category: "Color", image: "/images/1 (2).jpg", caption: "Sunlit balayage" },
      { id: 3, category: "Editorial", image: "/images/1 (3).jpg", caption: "Editorial waves" },
      { id: 4, category: "Bridal", image: "/images/1 (4).jpg", caption: "Bridal updo, fresh florals" },
      { id: 5, category: "Cut", image: "/images/1 (5).jpg", caption: "Sharp lob, deep side part" },
      { id: 7, category: "Editorial", image: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1000&auto=format&fit=crop", caption: "Studio session, vol. IV" },
      { id: 8, category: "Color", image: "https://images.unsplash.com/photo-1554519515-242161756769?q=80&w=1000&auto=format&fit=crop", caption: "Rainbow melt, textured waves" },
      { id: 9, category: "Bridal", image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1000&auto=format&fit=crop", caption: "Half-up bridal trial" },
    ],
  },
  // gallery: {
  //   filters: ["All", "Cut", "Color", "Bridal", "Editorial"],
  //   items: [
  //     { id: 1, category: "Cut", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop", caption: "Precision bob, textured finish" },
  //     { id: 2, category: "Color", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1000&auto=format&fit=crop", caption: "Sunlit balayage" },
  //     { id: 3, category: "Editorial", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1000&auto=format&fit=crop", caption: "Editorial waves" },
  //     { id: 4, category: "Bridal", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop", caption: "Bridal updo, fresh florals" },
  //     { id: 5, category: "Cut", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop", caption: "Sharp lob, deep side part" },
  //     { id: 6, category: "Color", image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1000&auto=format&fit=crop", caption: "Copper root melt" },
  //     { id: 7, category: "Editorial", image: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1000&auto=format&fit=crop", caption: "Studio session, vol. IV" },
  //     { id: 8, category: "Color", image: "https://images.unsplash.com/photo-1554519515-242161756769?q=80&w=1000&auto=format&fit=crop", caption: "Rainbow melt, textured waves" },
  //     { id: 9, category: "Bridal", image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1000&auto=format&fit=crop", caption: "Half-up bridal trial" },
  //   ],
  // },
} as const;

export type Site = typeof site;
