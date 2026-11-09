
(function(){
 const root=document.documentElement;
 const savedTheme=localStorage.getItem('fm-theme');
 const savedDir=localStorage.getItem('fm-dir');
 root.dataset.theme=savedTheme||'light';
 root.dir=savedDir||'ltr';
 function updateThemeIcon(){document.querySelectorAll('[data-theme-toggle]').forEach(b=>{b.textContent=root.dataset.theme==='dark'?'☀':'☾';b.setAttribute('aria-label',root.dataset.theme==='dark'?'Switch to light theme':'Switch to dark theme');});}
 function updateDirButton(){document.querySelectorAll('[data-rtl-toggle]').forEach(b=>{b.textContent=root.dir==='rtl'?'LTR':'RTL';b.setAttribute('aria-label',root.dir==='rtl'?'Switch to left-to-right layout':'Switch to right-to-left layout');});}
 document.addEventListener('click',e=>{
  const theme=e.target.closest('[data-theme-toggle]');
  if(theme){root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('fm-theme',root.dataset.theme);updateThemeIcon();}
  const rtl=e.target.closest('[data-rtl-toggle]');
  if(rtl){root.dir=root.dir==='rtl'?'ltr':'rtl';localStorage.setItem('fm-dir',root.dir);updateDirButton();}
  const menu=e.target.closest('[data-menu-toggle]');
  if(menu){const nav=document.querySelector('.mobile-nav, .dash-side');nav?.classList.toggle('open');menu.setAttribute('aria-expanded',nav?.classList.contains('open')?'true':'false');}
  const mobileLink=e.target.closest('.mobile-nav a');
  if(mobileLink){const nav=document.querySelector('.mobile-nav');const btn=document.querySelector('[data-menu-toggle]');nav?.classList.remove('open');btn?.setAttribute('aria-expanded','false');}
  const tab=e.target.closest('[data-dash-tab]');
  if(tab){const targetId=tab.dataset.dashTab;document.querySelectorAll('.dash-nav [data-dash-tab]').forEach(x=>x.classList.toggle('active',x.dataset.dashTab===targetId));document.querySelectorAll('.dash-panel').forEach(x=>x.classList.toggle('active',x.id===targetId));const dashSide=document.querySelector('.dash-side');const btn=document.querySelector('[data-menu-toggle]');dashSide?.classList.remove('open');btn?.setAttribute('aria-expanded','false');}
  const pwBtn=e.target.closest('[data-password-toggle]');
  if(pwBtn){const input=document.getElementById(pwBtn.dataset.passwordToggle);if(input){const show=input.type==='password';input.type=show?'text':'password';pwBtn.classList.toggle('visible',show);pwBtn.setAttribute('aria-pressed',show?'true':'false');pwBtn.setAttribute('aria-label',show?'Hide password':'Show password');}}
  const socialBtn=e.target.closest('[data-social-auth]');
  if(socialBtn){showToast(`Continuing with ${socialBtn.dataset.socialAuth}... Connect OAuth provider in production.`);}
 });
 window.addEventListener('resize',()=>{if(window.innerWidth>1100){const nav=document.querySelector('.mobile-nav, .dash-side');const btn=document.querySelector('[data-menu-toggle]');nav?.classList.remove('open');btn?.setAttribute('aria-expanded','false');}},{passive:true});
 updateThemeIcon();updateDirButton();
 document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
 window.showToast=function(msg){const t=document.querySelector('.toast');if(t){t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600);}};
 document.querySelectorAll('form[data-demo-form]').forEach(f=>{
  const pwMain=f.querySelector('[data-password-main]');
  const pwConfirm=f.querySelector('[data-password-confirm]');
  const errBox=f.querySelector('[data-form-error]');
  if(pwMain&&pwConfirm&&errBox){
   [pwMain,pwConfirm].forEach(inp=>inp.addEventListener('input',()=>{errBox.classList.remove('show');errBox.textContent='';}));
  }
  f.addEventListener('submit',e=>{
   e.preventDefault();
   if(pwMain&&pwConfirm&&pwMain.value!==pwConfirm.value){
    if(errBox){errBox.textContent='Passwords do not match. Please enter the exact same password in both fields.';errBox.classList.add('show');}
    showToast('Passwords do not match.');
    pwConfirm.focus();
    return;
   }
   if(errBox){errBox.classList.remove('show');errBox.textContent='';}
   showToast(f.dataset.message||'Thanks! Your information has been received in this demo.');
   f.reset();
   f.querySelectorAll('[data-password-toggle]').forEach(btn=>{
    const inp=document.getElementById(btn.dataset.passwordToggle);
    if(inp)inp.type='password';
    btn.classList.remove('visible');
    btn.setAttribute('aria-pressed','false');
    btn.setAttribute('aria-label','Show password');
   });
  });
 });
 const qty=document.querySelector('[data-qty]');if(qty){let n=1;const out=qty.querySelector('strong');qty.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{n=Math.max(1,n+(b.dataset.step==='up'?1:-1));out.textContent=n;}));}
 document.querySelectorAll('[data-order-button]').forEach(b=>b.addEventListener('click',()=>showToast('Your selection is ready. Sign in to continue with your order.')));

 /* Fresh Chakki Pincode Delivery Slot Checker */
 const pinForm = document.querySelector('[data-pincode-form]');
 if (pinForm) {
  pinForm.addEventListener('submit', e => {
   e.preventDefault();
   const input = pinForm.querySelector('.pincode-input');
   const feedback = document.querySelector('[data-pincode-feedback]');
   const val = input ? input.value.trim() : '';
   if (val && feedback) {
    feedback.textContent = `✅ Fresh Delivery Available for PIN ${val}: Order within 2 hours for today's 5:30 PM doorstep delivery!`;
    feedback.classList.add('show');
    if (window.showToast) showToast(`Live milling slot confirmed for PIN ${val}`);
   }
  });
 }

 /* Home 2: Texture Selector Widget */
 const textureBtns = document.querySelectorAll('[data-texture-btn]');
 const textureDesc = document.querySelector('[data-texture-desc]');
 const textureAbs = document.querySelector('[data-texture-abs]');
 const textureSpecs = {
  fine: { desc: 'Ultra-silk 120-mesh grind. Ideal for feather-soft Phulkas & Puris that puff effortlessly on high flame.', abs: 'Water Absorption: 76%' },
  medium: { desc: 'Homestyle 80-mesh traditional texture. Balanced mouthfeel for stuffed Parathas, Rotis & Theplas.', abs: 'Water Absorption: 72%' },
  coarse: { desc: 'Rustic 40-mesh stone-crushed grain with visible golden bran flakes. Great for Missi Roti & artisanal sourdough flatbreads.', abs: 'Water Absorption: 68%' }
 };
 textureBtns.forEach(btn => {
  btn.addEventListener('click', () => {
   textureBtns.forEach(b => b.classList.remove('active'));
   btn.classList.add('active');
   const key = btn.dataset.textureBtn;
   if (textureSpecs[key] && textureDesc && textureAbs) {
    textureDesc.textContent = textureSpecs[key].desc;
    textureAbs.textContent = textureSpecs[key].abs;
   }
  });
 });

 /* Home 2: Traceability Batch QR Simulator */
 const batchTabs = document.querySelectorAll('[data-batch-tab]');
 const batchFarm = document.getElementById('batch-farm');
 const batchDate = document.getElementById('batch-date');
 const batchTemp = document.getElementById('batch-temp');
 const batchMoist = document.getElementById('batch-moist');
 const batchData = {
  'fc-9021': { farm: 'Narmada Valley, Sehore MP (Farmer Ramphal)', date: 'Today, 06:30 AM', temp: '32°C (Cold-Stone Grinding)', moist: '11.4% (Certified Optimal)' },
  'fc-8411': { farm: 'Kumaon Terrace, Uttarakhand (Himalayan Organic Coop)', date: 'Today, 08:15 AM', temp: '34°C (Slow Granite Cut)', moist: '10.8% (Heritage Low-GI)' },
  'fc-7734': { farm: 'Bhal Organic Cluster, Gujarat (Rain-fed GI Field)', date: 'Today, 10:45 AM', temp: '31°C (Artisan Chakki)', moist: '11.1% (High Protein Sweet Wheat)' }
 };
 batchTabs.forEach(tab => {
  tab.addEventListener('click', () => {
   batchTabs.forEach(t => t.classList.remove('active'));
   tab.classList.add('active');
   const d = batchData[tab.dataset.batchTab];
   if (d) {
    if (batchFarm) batchFarm.textContent = d.farm;
    if (batchDate) batchDate.textContent = d.date;
    if (batchTemp) batchTemp.textContent = d.temp;
    if (batchMoist) batchMoist.textContent = d.moist;
    if (window.showToast) showToast(`Loaded verified lab certificate for Batch #${tab.textContent.trim()}`);
   }
  });
 });

 /* Home 2: Interactive Custom Roti & Flour Configurator */
 const configPanel = document.querySelector('[data-flour-configurator]');
 if (configPanel) {
  let familySize = 4;
  let healthFocus = 'everyday';

  const outKg = document.getElementById('cfg-out-kg');
  const outRotis = document.getElementById('cfg-out-rotis');
  const outGrain1 = document.getElementById('cfg-grain-1');
  const outGrain2 = document.getElementById('cfg-grain-2');
  const outGrain3 = document.getElementById('cfg-grain-3');
  const seg1 = document.getElementById('cfg-seg-1');
  const seg2 = document.getElementById('cfg-seg-2');
  const seg3 = document.getElementById('cfg-seg-3');

  function updateConfig() {
   const monthlyKg = familySize * 2.5;
   const dailyRotis = familySize * 6;
   if (outKg) outKg.textContent = monthlyKg + ' kg';
   if (outRotis) outRotis.textContent = `~${dailyRotis} soft rotis daily`;

   if (healthFocus === 'everyday') {
    if (outGrain1) outGrain1.textContent = '70% Sehore Sharbati';
    if (outGrain2) outGrain2.textContent = '20% Bhalia Wheat';
    if (outGrain3) outGrain3.textContent = '10% Roasted Chana';
    if (seg1) seg1.style.width = '70%';
    if (seg2) seg2.style.width = '20%';
    if (seg3) seg3.style.width = '10%';
   } else if (healthFocus === 'diabetic') {
    if (outGrain1) outGrain1.textContent = '50% Himalayan Khapli (Emmer)';
    if (outGrain2) outGrain2.textContent = '30% Desi Jowar Millet';
    if (outGrain3) outGrain3.textContent = '20% Methi & Kala Chana';
    if (seg1) seg1.style.width = '50%';
    if (seg2) seg2.style.width = '30%';
    if (seg3) seg3.style.width = '20%';
   } else if (healthFocus === 'fitness') {
    if (outGrain1) outGrain1.textContent = '55% High-Protein Sharbati';
    if (outGrain2) outGrain2.textContent = '30% Sattu Roasted Chana';
    if (outGrain3) outGrain3.textContent = '15% Soy & Ragi';
    if (seg1) seg1.style.width = '55%';
    if (seg2) seg2.style.width = '30%';
    if (seg3) seg3.style.width = '15%';
   } else if (healthFocus === 'millet') {
    if (outGrain1) outGrain1.textContent = '40% Jowar';
    if (outGrain2) outGrain2.textContent = '35% Bajra';
    if (outGrain3) outGrain3.textContent = '25% Ragi & Foxtail';
    if (seg1) seg1.style.width = '40%';
    if (seg2) seg2.style.width = '35%';
    if (seg3) seg3.style.width = '25%';
   }
  }

  configPanel.querySelectorAll('[data-cfg-family]').forEach(btn => {
   btn.addEventListener('click', () => {
    configPanel.querySelectorAll('[data-cfg-family]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    familySize = parseInt(btn.dataset.cfgFamily, 10) || 4;
    updateConfig();
   });
  });

  configPanel.querySelectorAll('[data-cfg-focus]').forEach(btn => {
   btn.addEventListener('click', () => {
    configPanel.querySelectorAll('[data-cfg-focus]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    healthFocus = btn.dataset.cfgFocus;
    updateConfig();
   });
  });

  configPanel.querySelectorAll('[data-cfg-freq]').forEach(btn => {
   btn.addEventListener('click', () => {
    configPanel.querySelectorAll('[data-cfg-freq]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
   });
  });

  const lockBtn = document.getElementById('btn-lock-blend');
  if (lockBtn) {
   lockBtn.addEventListener('click', () => {
    if (window.showToast) showToast('Custom artisan blend locked! Sign in to schedule your first fresh grind.');
   });
  }
  updateConfig();
 }

 /* Home 2: FAQ Accordion */
 document.querySelectorAll('[data-faq-btn]').forEach(btn => {
  btn.addEventListener('click', () => {
   const item = btn.closest('.faq-accordion-item');
   const isOpen = item.classList.contains('open');
   document.querySelectorAll('.faq-accordion-item').forEach(i => {
    i.classList.remove('open');
    i.querySelector('[data-faq-btn]')?.setAttribute('aria-expanded', 'false');
   });
   if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
   }
  });
 });

 /* Home 2: Reserve Grain Quick Select */
 document.querySelectorAll('[data-select-grain]').forEach(btn => {
  btn.addEventListener('click', () => {
   const name = btn.dataset.selectGrain;
   if (window.showToast) showToast(`Selected ${name} for custom blend.`);
   const cfg = document.querySelector('[data-flour-configurator]');
   if (cfg) {
    cfg.scrollIntoView({ behavior: 'smooth' });
   }
  });
 });

 /* ==========================================================================
    Home 2 Atelier: Grain Sommelier Flight Switcher
    ========================================================================== */
 const sommBtns = document.querySelectorAll('[data-somm-vial]');
 const sommImg = document.getElementById('somm-img');
 const sommDishImg = document.getElementById('somm-dish-img');
 const sommTitle = document.getElementById('somm-title');
 const sommDesc = document.getElementById('somm-desc');
 const sommTags = document.getElementById('somm-tags');
 const sommPairing = document.getElementById('somm-pairing');
 const sommHydration = document.getElementById('somm-hydration');

 const sommData = {
  sehore: {
   title: 'Sehore Sharbati Royal Estate',
   desc: 'Alluvial black cotton soil grain. Rich natural wheat-germ oils produce phulkas that balloon effortlessly on high flame and stay soft all day.',
   img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=85',
       dishImg: 'assets/images/bpr.jfif',
   tags: ['Warm Brioche', 'Toasted Hazelnut', 'Airy Crumb', 'Natural Sweetness'],
   pairing: 'Hand-churned cultured white butter, Lucknowi Dum Nihari & Dal Makhani.',
   hydration: '78% Water Binding'
  },
  bhalia: {
   title: 'Bhalia Rain-Fed Coastal Amber',
   desc: 'GI-tagged non-irrigated coastal wheat. Extreme gluten elasticity for wafer-thin rotis that stretch and never tear.',
     img: 'assets/images/Bhalia.jfif',
     dishImg: 'assets/images/bpr2.webp',
   tags: ['Wildflower Honey', 'Caramelized Grain', 'Extreme Elasticity', 'Silk Sheen'],
   pairing: 'Wafer-thin Rumali Roti, Kathiyawadi Sev Tameta, Puran Poli & Laccha Parathas.',
   hydration: '75% Water Binding'
  },
  khapli: {
   title: 'Himalayan Ancient Khapli (Emmer)',
   desc: '10,000-year-old mountain heirloom. Fragile gluten matrix digests smoothly with sustained low-glycemic satiety.',
     img: 'assets/images/flour3.jpg',
   dishImg: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85',
   tags: ['Toasted Barley', 'Earthy Hearth', 'Low-GI 42', 'Nutrient Dense'],
   pairing: 'Kumaoni Bhatt ki Churkani, Sarson Ka Saag & Cultured Butter.',
   hydration: '72% Water Binding'
  },
  bajra: {
   title: 'Barmer Desi Pearl Bajra & Jowar',
   desc: 'Stone-crushed mineral desert millet. Naturally gluten-free, dense in iron and magnesium with comforting winter warmth.',
     img: 'assets/images/Barmer.jfif',
     dishImg: 'assets/images/BarmerRoti.jpg',
   tags: ['Campfire Earth', 'Roasted Sesame', 'Gluten Free', 'High Iron & Zinc'],
   pairing: 'Rajasthani Gatte ki Sabzi, Desi Gur (Jaggery) & Lasun Chutney.',
   hydration: '68% Water Binding'
  }
 };

 sommBtns.forEach(btn => {
  btn.addEventListener('click', () => {
   sommBtns.forEach(b => b.classList.remove('active'));
   btn.classList.add('active');
   const key = btn.dataset.sommVial;
   const d = sommData[key];
   if (d) {
    if (sommImg) sommImg.src = d.img;
    if (sommDishImg) sommDishImg.src = d.dishImg;
    if (sommTitle) sommTitle.textContent = d.title;
    if (sommDesc) sommDesc.textContent = d.desc;
    if (sommPairing) sommPairing.textContent = d.pairing;
    if (sommHydration) sommHydration.textContent = d.hydration;
    if (sommTags) {
     sommTags.innerHTML = d.tags.map(t => `<span class="tasting-note-tag">✦ ${t}</span>`).join('');
    }
    if (window.showToast) showToast(`Tasting flight updated: ${d.title}`);
   }
  });
 });

 /* ==========================================================================
    Home 2 Atelier: Bespoke Kraft Bag Monogram Studio
    ========================================================================== */
 const nameInput = document.getElementById('monogram-name-input');
 const sackName = document.getElementById('sack-recipient-name');
 const sackGrainDisplay = document.getElementById('sack-grain-display');
 const sackMeshDisplay = document.getElementById('sack-mesh-display');
 const sackWaxSeal = document.getElementById('sack-wax-seal');

 if (nameInput && sackName) {
  nameInput.addEventListener('input', e => {
   const val = e.target.value.trim();
   sackName.textContent = val || 'The Kapur Kitchen';
   if (sackWaxSeal) {
    const firstLetter = (val || 'K').charAt(0).toUpperCase();
    sackWaxSeal.textContent = firstLetter || 'K';
   }
  });
 }

 document.querySelectorAll('[data-sack-grain]').forEach(btn => {
  btn.addEventListener('click', () => {
   document.querySelectorAll('[data-sack-grain]').forEach(b => b.classList.remove('active'));
   btn.classList.add('active');
   if (sackGrainDisplay) sackGrainDisplay.textContent = btn.dataset.sackGrain;
  });
 });

 document.querySelectorAll('[data-sack-mesh]').forEach(btn => {
  btn.addEventListener('click', () => {
   document.querySelectorAll('[data-sack-mesh]').forEach(b => b.classList.remove('active'));
   btn.classList.add('active');
   if (sackMeshDisplay) sackMeshDisplay.textContent = btn.dataset.sackMesh;
  });
 });

 document.querySelectorAll('[data-sack-seal]').forEach(btn => {
  btn.addEventListener('click', () => {
   document.querySelectorAll('[data-sack-seal]').forEach(b => b.classList.remove('active'));
   btn.classList.add('active');
   if (sackWaxSeal) {
    const color = btn.dataset.sackSeal;
    if (color === 'crimson') {
     sackWaxSeal.style.background = 'radial-gradient(circle at 35% 35%, #EF4444 0%, #B91C1C 60%, #7F1D1D 100%)';
    } else if (color === 'gold') {
     sackWaxSeal.style.background = 'radial-gradient(circle at 35% 35%, #FDE68A 0%, #D97706 60%, #78350F 100%)';
    } else if (color === 'jade') {
     sackWaxSeal.style.background = 'radial-gradient(circle at 35% 35%, #6EE7B7 0%, #059669 60%, #064E3B 100%)';
    }
   }
  });
 });

 const reserveBagBtn = document.getElementById('btn-reserve-bespoke-bag');
 if (reserveBagBtn) {
  reserveBagBtn.addEventListener('click', () => {
   const name = nameInput ? nameInput.value.trim() || 'The Kapur Kitchen' : 'The Kapur Kitchen';
   if (window.showToast) showToast(`Bespoke monogram bag reserved for "${name}"! Your custom milling batch is scheduled.`);
  });
 }

 /* ==========================================================================
    Home 2 Atelier: 12-Hour Roti Tensile & Elasticity Lab
    ========================================================================== */
 const labSlider = document.getElementById('lab-slider');
 const labHourDisplay = document.getElementById('lab-hour-display');
 const labStoreSoftness = document.getElementById('lab-store-softness');
 const labStoreDesc = document.getElementById('lab-store-desc');
 const labStoreMoist = document.getElementById('lab-store-moist');
 const labChakkiSoftness = document.getElementById('lab-chakki-softness');
 const labChakkiDesc = document.getElementById('lab-chakki-desc');
 const labChakkiMoist = document.getElementById('lab-chakki-moist');

 if (labSlider) {
  labSlider.addEventListener('input', e => {
   const h = parseInt(e.target.value, 10);
   if (labHourDisplay) labHourDisplay.textContent = h === 0 ? 'Fresh off the Tawa (0h)' : `${h} Hours After Kneading`;

   if (h <= 2) {
    if (labStoreSoftness) labStoreSoftness.textContent = '88%';
    if (labStoreDesc) labStoreDesc.textContent = 'Decent initial puff, but crumb structure begins releasing moisture quickly.';
    if (labStoreMoist) labStoreMoist.textContent = '38%';

    if (labChakkiSoftness) labChakkiSoftness.textContent = '100%';
    if (labChakkiDesc) labChakkiDesc.textContent = 'Max balloon puff! Velvet tender texture with sweet nutty roasted wheat perfume.';
    if (labChakkiMoist) labChakkiMoist.textContent = '45%';
   } else if (h <= 6) {
    if (labStoreSoftness) labStoreSoftness.textContent = '58%';
    if (labStoreDesc) labStoreDesc.textContent = 'Noticeable leathery chew. Edges begin drying and flaking inside tiffins.';
    if (labStoreMoist) labStoreMoist.textContent = '26%';

    if (labChakkiSoftness) labChakkiSoftness.textContent = '96%';
    if (labChakkiDesc) labChakkiDesc.textContent = 'Still pillowy soft. Intact wheat-germ oils trap moisture inside the gluten web.';
    if (labChakkiMoist) labChakkiMoist.textContent = '42%';
   } else if (h <= 10) {
    if (labStoreSoftness) labStoreSoftness.textContent = '36%';
    if (labStoreDesc) labStoreDesc.textContent = 'Stiff cardboard chew. Tears unevenly and requires heating in oil or microwave.';
    if (labStoreMoist) labStoreMoist.textContent = '18%';

    if (labChakkiSoftness) labChakkiSoftness.textContent = '92%';
    if (labChakkiDesc) labChakkiDesc.textContent = 'Folds in quarters without cracking. Cloud-soft texture remains intact for evening.';
    if (labChakkiMoist) labChakkiMoist.textContent = '39%';
   } else {
    if (labStoreSoftness) labStoreSoftness.textContent = '18%';
    if (labStoreDesc) labStoreDesc.textContent = 'Hard and brittle. Retrograded dry starches crack completely when folded.';
    if (labStoreMoist) labStoreMoist.textContent = '12%';

    if (labChakkiSoftness) labChakkiSoftness.textContent = '88%';
    if (labChakkiDesc) labChakkiDesc.textContent = 'Remarkably bendable and tender. Living whole-grain hydration protects crumb.';
    if (labChakkiMoist) labChakkiMoist.textContent = '37%';
   }
  });
 }

 /* ==========================================================================
    Home 2 Atelier: Kinetic Thermal Friction Scrubber
    ========================================================================== */
 const thermalSlider = document.getElementById('thermal-temp-slider');
 const thermalDisplay = document.getElementById('thermal-temp-display');
 const thermalBarFill = document.getElementById('thermal-bar-fill');
 const thermalEnzymeStatus = document.getElementById('thermal-enzyme-status');
 const thermalVitBStatus = document.getElementById('thermal-vitb-status');

 if (thermalSlider) {
  thermalSlider.addEventListener('input', e => {
   const t = parseInt(e.target.value, 10);
   if (thermalDisplay) thermalDisplay.textContent = `${t}°C`;
   if (thermalBarFill) thermalBarFill.style.width = `${Math.min(100, Math.max(10, ((t - 20) / 80) * 100))}%`;

   if (t < 42) {
    if (thermalEnzymeStatus) thermalEnzymeStatus.innerHTML = '<span style="color:#10B981">✓ 100% Active Natural Amylase</span>';
    if (thermalVitBStatus) thermalVitBStatus.innerHTML = '<span style="color:#10B981">✓ Full Vitamin B-Complex &amp; Living Germ Intact</span>';
   } else if (t < 70) {
    if (thermalEnzymeStatus) thermalEnzymeStatus.innerHTML = '<span style="color:#F59E0B">⚠ 45% Thermal Degradation</span>';
    if (thermalVitBStatus) thermalVitBStatus.innerHTML = '<span style="color:#F59E0B">⚠ Heat-sensitive Vitamin B1 &amp; B6 Partially Oxidized</span>';
   } else {
    if (thermalEnzymeStatus) thermalEnzymeStatus.innerHTML = '<span style="color:#EF4444">✗ 0% Active (Enzymes Completely Denatured)</span>';
    if (thermalVitBStatus) thermalVitBStatus.innerHTML = '<span style="color:#EF4444">✗ Natural Germ Burned &amp; Stripped Out</span>';
   }
  });
 }

 /* ==========================================================================
    Back to Top Button (Excluded on Login, Signup & Dashboard Pages)
    ========================================================================== */
 const backToTopBtn = document.querySelector('[data-back-to-top]');
 const isExcludedPage = document.querySelector('.auth-page, .dashboard-shell');
 if (backToTopBtn && !isExcludedPage) {
  const toggleBackToTop = () => {
   backToTopBtn.classList.toggle('visible', window.scrollY > 300);
  };
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();
  backToTopBtn.addEventListener('click', () => {
   window.scrollTo({ top: 0, behavior: 'smooth' });
  });
 }
})();
