// KD Hospital — Health Check-up Page  (v3 — sky blue card packages)
// Stack: React + Tailwind CSS
// Google Fonts in index.html:
//   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
// tailwind.config.js extend:
//   fontFamily: { serif:['Playfair Display','Georgia','serif'], sans:['DM Sans','system-ui','sans-serif'] }
//   colors: { blue:'#2E86C1', 'blue-dk':'#1A6FA8', 'blue-lt':'#5BA4D4', navy:'#1B3A52', teal:'#567C8D', beige:'#F5EFEB', 'beige-dk':'#EAE0D8', sky:'#CBD8E6' }

// const PACKAGES = [
//   { name:"KD Basic Wellness",       badge:"Starter",         price:"₹ 1,800",  featured:false, tests:"CBC · Urine R&M · Blood Sugar · Lipid Profile · Liver Function · Kidney Function · X-Ray Chest" },
//   { name:"KD Gold Wellness",        badge:"Most chosen",     price:"₹ 4,500",  featured:true,  tests:"CBC · Urine R&M · Haemogram · Thyroid Profile · Lipid Profile · ECG · Liver & Kidney · HbA1c" },
//   { name:"KD Happy Heart",          badge:"Cardiac focus",   price:"₹ 7,500",  featured:false, tests:"Haemogram · Urine R&M · ESR · RA Factor · Lipid · ECG · 2D Echo · TMT · Cardiology consult" },
//   { name:"KD Platinum Wellness",    badge:"Comprehensive",   price:"₹ 11,000", featured:false, tests:"Haemogram · CBC · ESR · Full thyroid, liver, kidney · Lipid & sugar · ECG · X-Ray · USG Abdomen" },
//   { name:"KD Women's Wellness",     badge:"Women",           price:"₹ 5,000",  featured:false, tests:"CBC · ESR · Urine · Thyroid · Mammography · Pap smear · Bone density · Gynaecology · USG Pelvis" },
//   { name:"KD Women's Wellness Gold",badge:"Women · Premium", price:"₹ 10,000", featured:false, tests:"CBC · ESR · Full hormonal panel · CA-125 · Thyroid · Mammography · Pap smear · Bone density · Specialist consult" },
//   { name:"KD Diamond Wellness",     badge:"Advanced",        price:"₹ 18,000", featured:false, tests:"All organ panels · Cardiac workup · Full radiology (CT/X-Ray/USG) · Ophthalmology · Pulmonology consult" },
//   { name:"KD Holistic Wellness",    badge:"Full body",       price:"₹ 34,000", featured:false, tests:"Comprehensive organ & metabolic · Full cardiac study · Oncology markers · CT scan · Multi-specialist consults" },
// ];
const PACKAGES = [
  { 
    name: "Nexora Basic Wellness",       
    badge: "Starter",         
    price: "₹ 1,800",  
    featured: false,  
    tests: ["CBC", "Urine R&M", "Blood Sugar", "Lipid Profile"] 
  },

  { 
    name: "Nexora Gold Wellness",        
    badge: "Most chosen",     
    price: "₹ 4,500",  
    featured: true,  
    tests: ["CBC", "Thyroid Profile", "ECG", "HbA1c"] 
  },

  { 
    name: "Nexora Happy Heart",          
    badge: "Cardiac focus",   
    price: "₹ 7,500",  
    featured: false,  
    tests: ["ECG", "2D Echo", "TMT", "Lipid Profile"] 
  },

  { 
    name: "Nexora Platinum Wellness",    
    badge: "Comprehensive",   
    price: "₹ 11,000", 
    featured: false,  
    tests: ["CBC", "Thyroid", "Liver Function", "USG Abdomen"] 
  },

  { 
    name: "Nexora Women's Wellness",     
    badge: "Women",           
    price: "₹ 5,000",  
    featured: false,  
    tests: ["CBC", "Thyroid", "Mammography", "Pap Smear"] 
  },

  { 
    name: "Nexora Women's Wellness Gold",
    badge: "Women · Premium", 
    price: "₹ 10,000", 
    featured: false,  
    tests: ["Hormonal Panel", "Thyroid", "Bone Density", "Consultation"] 
  },

  { 
    name: "Nexora Diamond Wellness",     
    badge: "Advanced",        
    price: "₹ 18,000", 
    featured: false,  
    tests: ["Full Body Panel", "Cardiac Check", "CT Scan", "Eye Check"] 
  },

  { 
    name: "Nexora Holistic Wellness",    
    badge: "Full body",       
    price: "₹ 34,000", 
    featured: false,  
    tests: ["Full Body Scan", "Cardiac Study", "Oncology Markers", "Specialist Consult"] 
  },
];

const PREP = [
  { n:"01", t:"Book a prior appointment for your Health Check-up. Our Customer Care team will walk you through the entire programme and issue urine and stool containers beforehand." },
  { n:"02", t:"A minimum fast of 8–12 hours is essential before any Health Check-up plan. You may consume water and your regular medications during this period." },
  { n:"03", t:"Confirm fasting requirements and any specific dietary restrictions with our Customer Care Executive at the time of booking." },
  { n:"04", t:"Please spare at least 4–6 hours for your visit, depending on the package you have selected. Plan your day accordingly." },
];
const DAY = [
  { n:"05", t:"Wear loose and comfortable clothing. Avoid wearing jewellery or metal accessories, as some investigations require their removal." },
  { n:"06", t:"Bring all previous medical records and a list of medications you are currently taking. This helps our specialists tailor their review to your health history." },
  { n:"07", t:"Certain reports, such as a Pap smear, will be available the following day. Our team will notify you once they are ready for collection." },
  { n:"08", t:"For ladies: please inform our executive if you are pregnant or menstruating. This helps us reschedule or adjust investigations such as X-ray and Pap smear for your safety." },
];

const HERO_IMGS = [
  { src:"https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&auto=format&fit=crop", alt:"Reception",  clip:"polygon(0 0,100% 0,84% 100%,0 100%)",            ml:"0",    w:"26%" },
  { src:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&auto=format&fit=crop", alt:"Doctor",    clip:"polygon(10% 0,100% 0,86% 100%,-4% 100%)", ml:"-3%", w:"30%" },
  { src:"https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=700&auto=format&fit=crop",    alt:"Surgery",   clip:"polygon(10% 0,100% 0,86% 100%,-4% 100%)", ml:"-3%", w:"28%" },
  { src:"https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=600&auto=format&fit=crop", alt:"Radiology", clip:"polygon(10% 0,100% 0,100% 100%,-4% 100%)",ml:"-3%", w:"26%" },
];

// ── helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children, light = false }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-7 h-px flex-shrink-0" style={{ background: light ? "#CBD8E6" : "#2E86C1" }} />
      <span className="text-xs font-medium tracking-widest uppercase" style={{ color: light ? "#CBD8E6" : "#2E86C1" }}>
        {children}
      </span>
    </div>
  );
}

function PackageCard({ name, badge, price, tests, featured }) {
  return (
    <div
      className="rounded-xl p-6 flex flex-col relative overflow-hidden transition-transform duration-200 hover:-translate-y-1"
      style={featured ? {
        background: "rgba(255,255,255,0.95)",
        border: "1px solid rgba(255,255,255,0.9)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
      } : {
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.18)",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
        style={{ background: featured ? "#2E86C1" : "rgba(255,255,255,0.4)" }} />

      {featured && (
        <span className="absolute top-3.5 right-3.5 text-white text-xs font-medium tracking-wider uppercase px-2.5 py-0.5 rounded-full"
          style={{ background:"#2E86C1", fontSize:"9.5px" }}>
          Popular
        </span>
      )}

      <span className="inline-block text-xs font-medium tracking-wider uppercase px-2.5 py-0.5 rounded-full mb-3"
        style={featured
          ? { background:"rgba(46,134,193,0.12)", color:"#2E86C1", fontSize:"9.5px" }
          : { background:"rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.75)", fontSize:"9.5px" }}>
        {badge}
      </span>

      <p className="font-semibold leading-snug mb-2"
        style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.05rem", color: featured ? "#1B3A52" : "#fff" }}>
        {name}
      </p>

      <p className="font-semibold mb-3"
        style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.55rem", color: featured ? "#2E86C1" : "rgba(255,255,255,0.95)" }}>
        {price}
        <small className="block font-sans text-xs mt-0.5" style={{ color: featured ? "rgba(46,134,193,0.6)" : "rgba(255,255,255,0.45)", fontFamily:"'DM Sans',sans-serif" }}>per person</small>
      </p>

      <hr style={{ border:"none", borderTop: featured ? "1px solid rgba(46,134,193,0.15)" : "1px solid rgba(255,255,255,0.15)", marginBottom:"1rem" }} />

      {/* <p className="text-xs font-light leading-relaxed"
        style={{ color: featured ? "#4a6275" : "rgba(255,255,255,0.6)", lineHeight:"1.7" }}>
        {tests}
      </p> */}
      <ul className="mt-3 space-y-1">
  {tests.map((t, i) => (
    <li
      key={i}
      className="text-xs flex items-center gap-2"
      style={{
        color: featured ? "#4a6275" : "rgba(255,255,255,0.7)"
      }}
    >
      <span>•</span> {t}
    </li>
  ))}
</ul>
    </div>
  );
}

function GuideItem({ n, t }) {
  return (
    <div className="flex gap-4 py-4 border-b text-sm font-light leading-relaxed"
      style={{ borderColor:"#EAE0D8", color:"#3a4e5f" }}>
      <span className="text-xs font-semibold mt-0.5 min-w-[18px]"
        style={{ fontFamily:"'Playfair Display',serif", color:"#2E86C1" }}>{n}</span>
      <span>{t}</span>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function HealthCheckupPage() {
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#F5EFEB" }}>

      {/* ── HERO ── */}
      <section className="relative flex items-center overflow-hidden" style={{ height:"52vh", minHeight:420 }}>
        <div className="absolute inset-0 flex">
          {HERO_IMGS.map((img, i) => (
            
            <div
              key={i}
              className="relative overflow-hidden flex-1 group"
              style={{
                clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)",
              }}
            >
              <img src={img.src} alt={img.alt}  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
            </div>
          ))}
        </div>
        
        <div
  className="absolute inset-0"
  style={{
    background: "linear-gradient(135deg, rgba(46,65,86,0.50), rgba(86,124,141,0.3))"
  }}
/>
       
        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center text-white px-8">
          <div
            className="inline-flex items-center gap-2 text-white text-sm font-medium px-6 py-2 rounded-full mb-5"
            style={{
              background: "linear-gradient(135deg,#0D3660 0%,#14447C 05%,#1B6B8A 80%)",
              letterSpacing: "0.5px",
              animation: "fadeDown 0.7s ease both",
            }}
          >
            <span style={{ opacity: 0.75 }}>Home</span>
            <span>›</span>
            <span>Packages</span>
          </div>
          <h1
            className="font-bold leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(40px, 8vw, 68px)",
              textShadow: "0 2px 24px rgba(0,0,0,0.3)",
              animation: "fadeUp 0.8s 0.2s ease both",
            }}
          >
           Health Check-up Packages
          </h1>
          <p
            className="mt-3 font-light tracking-widest"
            style={{ fontSize: 15, opacity: 0.9, animation: "fadeUp 0.8s 0.35s ease both" }}
          >
            Comprehensive care plans designed to keep you ahead of your health.
          </p>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-24" style={{ background:"#F5EFEB" }}>
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-2 gap-20 items-center">
          <div>
            <SectionLabel>About our packages</SectionLabel>
            <h2 className="font-semibold leading-snug mb-5" style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3vw,2.8rem)", color:"#1B3A52" }}>
              Prevention is the most powerful medicine.
            </h2>
            <p className="text-sm font-light leading-loose mb-4 text-justify" style={{ color:"#567C8D" }}>
              At Nexora Hospital, our vision to promote 'well-being' reflects a deep commitment to enhancing the lives of individuals and communities. We offer affordable health check-up packages in Ahmedabad designed to empower patients with early diagnosis and prevention.
            </p>
            <p className="text-sm font-light leading-loose text-justify" style={{ color:"#567C8D" }}>
              Our packages are part of a larger mission to instil community hope, health, and happiness. By providing accessible and comprehensive health screenings, we help individuals lead healthier, fuller lives.
            </p>
            <div className="flex gap-10 mt-9 pt-8 border-t" style={{ borderColor:"#EAE0D8" }}>
              {[["5+","Packages available"],["₹1,800","Starting from"],["4–6h","Typical duration"]].map(([num,lbl]) => (
                <div key={lbl}>
                  <span className="block font-semibold text-3xl" style={{ fontFamily:"'Playfair Display',serif", color:"#2E86C1" }}>{num}</span>
                  <span className="text-xs tracking-widest uppercase" style={{ color:"#567C8D" }}>{lbl}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -top-5 -right-5 w-14 h-14" style={{ background:"linear-gradient(135deg,#0D3660 10%,#14447C 0%,#1B6B8A 70%)" }}/>
            
            <img
  src="https://i.pinimg.com/1200x/af/c5/53/afc553e12c89eef85f87e9f9a34e02a0.jpg"
  alt="Doctor"
  className="w-full object-cover"
  style={{ aspectRatio: "4/5" ,}}
   
/>
            <img
  src="https://i.pinimg.com/736x/fb/86/60/fb86608f0c57c2f9240ff9bedecd43db.jpg"
  alt="Lab"
  className="absolute -bottom-6 -left-6 w-[55%] object-cover"
  style={{
    aspectRatio: "1",
    border: "5px solid #F5EFEB",
    boxShadow: "0 8px 32px rgba(46,134,193,0.14)"
  }}
/>
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="py-24 relative overflow-hidden" id="packages"
        style={{ background:"linear-gradient(135deg,#0D3660 0%,#14447C 25%,#1B6B8A 80%)" }}>
        {/* decorative circles */}
        <div className="absolute rounded-full pointer-events-none" style={{ top:-120, right:-120, width:420, height:420, background:"rgba(255,255,255,0.05)" }}/>
        <div className="absolute rounded-full pointer-events-none" style={{ bottom:-80, left:-80, width:300, height:300, background:"rgba(255,255,255,0.04)" }}/>

        <div className="max-w-5xl mx-auto px-8 relative z-10">
          <SectionLabel light>Health check-up packages</SectionLabel>
          <h2 className="font-semibold text-white leading-snug mb-2" style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3vw,2.6rem)" }}>
            Choose what's right for you.
          </h2>
          <p className="text-sm font-light mb-12 max-w-xl" style={{ color:"rgba(255,255,255,0.65)" }}>
            All packages include a specialist consultation and a comprehensive report. Pricing inclusive of all listed tests.
          </p>

          <div className="grid gap-5" style={{ gridTemplateColumns:"repeat(4,1fr)" }}>
            {PACKAGES.map((pkg) => <PackageCard key={pkg.name} {...pkg}/>)}
          </div>
        </div>
      </section>

      {/* ── GUIDELINES ── */}
      <section className="py-24" id="guidelines" style={{ background:"#F5EFEB" }}>
        <div className="max-w-5xl mx-auto px-8">
          <SectionLabel>Before you visit</SectionLabel>
          <h2 className="font-semibold leading-snug mb-2" style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3vw,2.6rem)", color:"#1B3A52" }}>
            Important guidelines.
          </h2>
          <p className="text-sm font-light mb-14" style={{ color:"#567C8D" }}>
            Please read these carefully to ensure your visit is smooth and your results are accurate.
          </p>
          <div className="grid grid-cols-2 gap-16">
            <div>
              <div className="flex items-center  gap-3 mb-5 text-xs font-medium tracking-widest uppercase" style={{ color:"#2E86C1" }}>
                Preparation <div className="flex-1 h-px" style={{ background:"#EAE0D8" }}/>
              </div>
              {PREP.map((g) => <GuideItem key={g.n} {...g}/>)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-5 text-xs font-medium tracking-widest uppercase" style={{ color:"#2E86C1" }}>
                On the day <div className="flex-1 h-px" style={{ background:"#EAE0D8" }}/>
              </div>
              {DAY.map((g) => <GuideItem key={g.n} {...g}/>)}
            </div>
          </div>
        </div>
      </section>

      {/* ── APPOINTMENT ── */}
      {/* <section className="py-20" id="appointment" style={{ background:"#1B3A52" }}>
        <div className="max-w-5xl mx-auto px-8 flex flex-wrap items-center justify-between gap-8">
          <div>
            <h2 className="font-semibold text-white leading-snug mb-1" style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.6rem,3vw,2.2rem)" }}>
              Ready to take the first step?
            </h2>
            <p className="font-light text-sm" style={{ color:"rgba(255,255,255,0.65)" }}>
              Book your health check-up today.{" "}
              <strong className="text-white font-medium">+91 79 6677 0005</strong>
            </p>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <a href="tel:+917966770005" className="px-8 py-3.5 text-sm font-medium rounded" style={{ background:"#fff", color:"#2E86C1" }}>
              Call to Book
            </a>
            <div className="flex items-center gap-2.5 text-sm" style={{ color:"rgba(255,255,255,0.8)" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm" style={{ border:"1.5px solid rgba(255,255,255,0.35)" }}>✆</div>
              <span>Mon – Sat · 8 am – 6 pm</span>
            </div>
          </div>
        </div>
      </section> */}

    </div>
  );
}