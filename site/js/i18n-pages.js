/* Per-page copy — merged into NABA_I18N at runtime (keys shared via data-i18n) */
(function(){
  var P = {
    directory: {
      en: { bcDir:'Directory', dirEyebrow:'Directory', dirH1:'Find the right service', dirLead:'Search or filter 70+ businesses and initiatives run by and for the community.', dirSearchPh:'Search categories or businesses…', dirFilter:'Filter by category' },
      fr: { bcDir:'Annuaire', dirEyebrow:'Annuaire', dirH1:'Trouvez le bon service', dirLead:'Recherchez ou filtrez plus de 70 entreprises et initiatives communautaires.', dirSearchPh:'Rechercher catégories ou entreprises…', dirFilter:'Filtrer par catégorie' },
      es: { bcDir:'Directorio', dirEyebrow:'Directorio', dirH1:'Encuentra el servicio adecuado', dirLead:'Busca o filtra más de 70 negocios e iniciativas comunitarias.', dirSearchPh:'Buscar categorías o negocios…', dirFilter:'Filtrar por categoría' },
      ar: { bcDir:'الدليل', dirEyebrow:'الدليل', dirH1:'ابحث عن الخدمة المناسبة', dirLead:'ابحث أو رشّح أكثر من 70 نشاطًا تجاريًا ومبادرة مجتمعية.', dirSearchPh:'ابحث في الفئات أو الأعمال…', dirFilter:'تصفية حسب الفئة' },
      pt: { bcDir:'Diretório', dirEyebrow:'Diretório', dirH1:'Encontre o serviço certo', dirLead:'Pesquise ou filtre mais de 70 negócios e iniciativas comunitárias.', dirSearchPh:'Pesquisar categorias ou negócios…', dirFilter:'Filtrar por categoria' }
    },
    events: {
      en: { bcEv:'Events', evPageEyebrow:'Events All Across Scotland', evPageH1:'On the move', evPageLead:'Flagship journeys and gatherings connecting our diaspora to home. Tap any event to expand it.', evAllEyebrow:'All Events', evAllH1:'Every gathering, in one place' },
      fr: { bcEv:'Événements', evPageEyebrow:'Événements dans toute l\u2019Écosse', evPageH1:'En mouvement', evPageLead:'Voyages et rencontres qui relient la diaspora. Touchez un événement pour les détails.', evAllEyebrow:'Tous les événements', evAllH1:'Tous les rassemblements' },
      es: { bcEv:'Eventos', evPageEyebrow:'Eventos en toda Escocia', evPageH1:'En marcha', evPageLead:'Viajes y encuentros que conectan la diáspora. Toca un evento para ampliar.', evAllEyebrow:'Todos los eventos', evAllH1:'Todos los encuentros' },
      ar: { bcEv:'الفعاليات', evPageEyebrow:'فعاليات في كل اسكتland', evPageH1:'في حركة', evPageLead:'رحلات وتجمعات تربط الشتات بالوطن. اضغط على أي فعالية.', evAllEyebrow:'كل الفعاليات', evAllH1:'كل التجمعات' },
      pt: { bcEv:'Eventos', evPageEyebrow:'Eventos em toda a Escócia', evPageH1:'Em movimento', evPageLead:'Viagens e encontros que ligam a diáspora. Toque num evento.', evAllEyebrow:'Todos os eventos', evAllH1:'Todos os encontros' }
    },
    about: {
      en: { bcAbout:'About', aboutEyebrow:'About NABA', aboutH1:'Our story', aboutLead:'Who we are, what we stand for, and the legacy we carry forward.' },
      fr: { bcAbout:'À propos', aboutEyebrow:'À propos de NABA', aboutH1:'Notre histoire', aboutLead:'Qui nous sommes, nos valeurs et l\u2019héritage que nous portons.' },
      es: { bcAbout:'Nosotros', aboutEyebrow:'Sobre NABA', aboutH1:'Nuestra historia', aboutLead:'Quiénes somos, qué defendemos y el legado que llevamos.' },
      ar: { bcAbout:'من نحن', aboutEyebrow:'عن نابا', aboutH1:'قصتنا', aboutLead:'من نحن وما نؤمن به وإرثنا.' },
      pt: { bcAbout:'Sobre', aboutEyebrow:'Sobre a NABA', aboutH1:'A nossa história', aboutLead:'Quem somos, o que defendemos e o legado que carregamos.' }
    },
    news: {
      en: { bcNews:'News', newsEyebrow:'News & Updates', newsH1:'From the community', newsLead:'Stories, announcements and committee updates from across NABA.' },
      fr: { bcNews:'Actualités', newsEyebrow:'Actualités', newsH1:'Depuis la communauté', newsLead:'Histoires et annonces de NABA.' },
      es: { bcNews:'Noticias', newsEyebrow:'Noticias', newsH1:'Desde la comunidad', newsLead:'Historias y anuncios de NABA.' },
      ar: { bcNews:'الأخبار', newsEyebrow:'الأخبار', newsH1:'من المجتمع', newsLead:'قصص وإعلانات من نابا.' },
      pt: { bcNews:'Notícias', newsEyebrow:'Notícias', newsH1:'Da comunidade', newsLead:'Histórias e anúncios da NABA.' }
    },
    contact: {
      en: { bcContact:'Contact', contactEyebrow:'Contact Us', contactH1:'We\u2019re here to help', contactLead:'Offices in Glasgow and Edinburgh — reach out by phone, email or the form below.' },
      fr: { bcContact:'Contact', contactEyebrow:'Contact', contactH1:'Nous sommes là', contactLead:'Bureaux à Glasgow et Édimbourg — téléphone, e-mail ou formulaire.' },
      es: { bcContact:'Contacto', contactEyebrow:'Contacto', contactH1:'Estamos aquí', contactLead:'Oficinas en Glasgow y Edimburgo.' },
      ar: { bcContact:'تواصل', contactEyebrow:'تواصل معنا', contactH1:'نحن هنا للمساعدة', contactLead:'مكاتب في Glasgow وEdinburgh.' },
      pt: { bcContact:'Contato', contactEyebrow:'Contato', contactH1:'Estamos aqui', contactLead:'Escritórios em Glasgow e Edimburgo.' }
    },
    volunteer: {
      en: { bcVol:'Volunteering', volEyebrow:'Volunteering & Partnerships', volH1:'Volunteers wanted', volLead:'Make a difference — build skills and support the community.' },
      fr: { bcVol:'Bénévolat', volEyebrow:'Bénévolat & partenariats', volH1:'Bénévoles recherchés', volLead:'Faites la différence — développez vos compétences.' },
      es: { bcVol:'Voluntariado', volEyebrow:'Voluntariado', volH1:'Se buscan voluntarios', volLead:'Marca la diferencia y apoya a la comunidad.' },
      ar: { bcVol:'التطوع', volEyebrow:'التطوع والشراكات', volH1:'مطلوب متطوعون', volLead:'اصنع فرقًا وادعم المجتمع.' },
      pt: { bcVol:'Voluntariado', volEyebrow:'Voluntariado e parcerias', volH1:'Voluntários procurados', volLead:'Faça a diferença e apoie a comunidade.' }
    },
    cuisine: {
      en: { bcCuisine:'Cuisine', cuisineEyebrow:'Cuisine', cuisineH1:'Taste the community', cuisineLead:'Food and drink partners across Glasgow and Edinburgh.' },
      fr: { bcCuisine:'Cuisine', cuisineEyebrow:'Cuisine', cuisineH1:'Goûtez la communauté', cuisineLead:'Partenaires food & drink à Glasgow et Édimbourg.' },
      es: { bcCuisine:'Cocina', cuisineEyebrow:'Cocina', cuisineH1:'Sabor comunitario', cuisineLead:'Socios gastronómicos en Glasgow y Edimburgo.' },
      ar: { bcCuisine:'المطبخ', cuisineEyebrow:'المطبخ', cuisineH1:'ذوق المجتمع', cuisineLead:'شركاء طعام في Glasgow وEdinburgh.' },
      pt: { bcCuisine:'Cozinha', cuisineEyebrow:'Cozinha', cuisineH1:'Sabores da comunidade', cuisineLead:'Parceiros em Glasgow e Edimburgo.' }
    },
    youth: {
      en: { bcYouth:'Youth Hub', youthPageEyebrow:'Youth Hub', youthPageH1:'Built for the next generation', youthPageLead:'Mentorship, resources and funding routes for young people.' },
      fr: { bcYouth:'Youth Hub', youthPageEyebrow:'Youth Hub', youthPageH1:'Pour la prochaine génération', youthPageLead:'Mentorat, ressources et financements.' },
      es: { bcYouth:'Youth Hub', youthPageEyebrow:'Youth Hub', youthPageH1:'Para la próxima generación', youthPageLead:'Mentoría, recursos y financiación.' },
      ar: { bcYouth:'مركز الشباب', youthPageEyebrow:'مركز الشباب', youthPageH1:'للجيل القادم', youthPageLead:'إرشاد وموارد وتمويل للشباب.' },
      pt: { bcYouth:'Youth Hub', youthPageEyebrow:'Youth Hub', youthPageH1:'Para a próxima geração', youthPageLead:'Mentoria, recursos e financiamento.' }
    },
    impact: {
      en: { bcImpact:'Impact Tree', impactEyebrow:'Impact Tree', impactH1:'Watch our impact grow', impactLead:'Every member adds a leaf to NABA\u2019s community tree.' },
      fr: { bcImpact:'Arbre d\u2019impact', impactEyebrow:'Arbre d\u2019impact', impactH1:'Voyez l\u2019impact grandir', impactLead:'Chaque membre ajoute une feuille.' },
      es: { bcImpact:'Árbol de impacto', impactEyebrow:'Árbol de impacto', impactH1:'Mira crecer el impacto', impactLead:'Cada miembro añade una hoja.' },
      ar: { bcImpact:'شجرة الأثر', impactEyebrow:'شجرة الأثر', impactH1:'شاهد الأثر ينمو', impactLead:'كل عضو يضيف ورقة.' },
      pt: { bcImpact:'Árvore de impacto', impactEyebrow:'Árvore de impacto', impactH1:'Veja o impacto crescer', impactLead:'Cada membro adiciona uma folha.' }
    },
    gallery: {
      en: { bcGallery:'Gallery', galleryEyebrow:'Photo Gallery', galleryH1:'Community in pictures', galleryLead:'Moments from events, programmes and everyday community life.' },
      fr: { bcGallery:'Galerie', galleryEyebrow:'Galerie photo', galleryH1:'La communauté en images', galleryLead:'Moments d\u2019événements et de programmes.' },
      es: { bcGallery:'Galería', galleryEyebrow:'Galería', galleryH1:'Comunidad en imágenes', galleryLead:'Momentos de eventos y programas.' },
      ar: { bcGallery:'المعرض', galleryEyebrow:'معرض الصور', galleryH1:'المجتمع في صور', galleryLead:'لحظات من الفعاليات والبرامج.' },
      pt: { bcGallery:'Galeria', galleryEyebrow:'Galeria', galleryH1:'Comunidade em fotos', galleryLead:'Momentos de eventos e programas.' }
    },
    legacy: {
      en: { bcLegacy:'Legacy', legacyEyebrow:'Legacy', legacyH1:'Sheku Bayoh', legacyLead:'Remembering a life that changed Scotland\u2019s conversation on justice.' },
      fr: { bcLegacy:'Héritage', legacyEyebrow:'Héritage', legacyH1:'Sheku Bayoh', legacyLead:'Un héritage qui a changé le débat sur la justice.' },
      es: { bcLegacy:'Legado', legacyEyebrow:'Legado', legacyH1:'Sheku Bayoh', legacyLead:'Un legado que cambió el debate sobre justicia.' },
      ar: { bcLegacy:'الإرث', legacyEyebrow:'الإرث', legacyH1:'شيكو بايو', legacyLead:'إرث غيّر حوار العدالة في اسكتland.' },
      pt: { bcLegacy:'Legado', legacyEyebrow:'Legado', legacyH1:'Sheku Bayoh', legacyLead:'Um legado que mudou o debate sobre justiça.' }
    },
    common: {
      en: { bcHome:'Home', faqTitle:'Frequently asked questions', sendMsg:'Send message', readMore:'Read more' },
      fr: { bcHome:'Accueil', faqTitle:'Questions fréquentes', sendMsg:'Envoyer', readMore:'En savoir plus' },
      es: { bcHome:'Inicio', faqTitle:'Preguntas frecuentes', sendMsg:'Enviar', readMore:'Leer más' },
      ar: { bcHome:'الرئيسية', faqTitle:'أسئلة شائعة', sendMsg:'إرسال', readMore:'اقرأ المزيد' },
      pt: { bcHome:'Início', faqTitle:'Perguntas frequentes', sendMsg:'Enviar', readMore:'Ler mais' }
    }
  };
  window.NABA_I18N_PAGE_KEYS = P;
})();
